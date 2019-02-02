/*
 *
 * Copyright (C) 2017 University of Bamberg, Software Technologies Research Group
 * <https://www.uni-bamberg.de/>, <http://www.swt-bamberg.de/>
 * 
 * This file is part of the SWTbahn command line interface (swtbahn-cli), which is
 * a client-server application to interactively control a BiDiB model railway.
 *
 * swtbahn-cli is licensed under the GNU GENERAL PUBLIC LICENSE (Version 3), see
 * the LICENSE file at the project's top-level directory for details or consult
 * <http://www.gnu.org/licenses/>.
 *
 * swtbahn-cli is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or any later version.
 *
 * swtbahn-cli is a RESEARCH PROTOTYPE and distributed WITHOUT ANY WARRANTY, without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE. See the GNU General Public License for more details.
 *
 * The following people contributed to the conception and realization of the
 * present swtbahn-cli (in alphabetic order by surname):
 *
 * - Nicolas Gross <https://github.com/nicolasgross>
 *
 */

#include <onion/onion.h>
#include <bidib.h>
#include <pthread.h>
#include <unistd.h>
#include <glib.h>
#include <string.h>
#include <syslog.h>
#include <stdio.h>
#include <onion/dict.h>
#include <onion/shortcuts.h>

#include "server.h"
#include "param_verification.h"
#include "handler_safety.h"
#include "swtbahn_cli_definitions_custom.h"

#define MAX_TRAINS 32

pthread_t start_stop_thread;

pthread_mutex_t grabbed_trains_mutex = PTHREAD_MUTEX_INITIALIZER;

static unsigned int next_grab_id = 0;
static GString *grabbed_trains[MAX_TRAINS] = {NULL};
static swtbahn_cli_route_request route_requests[MAX_TRAINS];


static void increment_next_grab_id(void) {
    if (next_grab_id == MAX_TRAINS - 1) {
        next_grab_id = 0;
    } else {
        next_grab_id++;
    }
}

static void *start_safety_layer(void *_) {
    pthread_mutex_lock(&grabbed_trains_mutex);
    safety_layer_running = true;
    safety_layer_starting = false;

    while (safety_layer_running) {
        for (size_t train_id = 0; train_id < MAX_TRAINS; train_id++) {
            while (grabbed_trains[train_id] != NULL) {
                t_bidib_train_state_query train_state =
                        bidib_get_train_state(grabbed_trains[train_id]->str);
                pthread_mutex_unlock(&grabbed_trains_mutex);

                if (train_state.known && train_state.data.on_track && train_state.data.set_speed_step > 0) {
                    syslog(LOG_NOTICE, "Safety layer is running for train %s ", grabbed_trains[train_id]->str);

                    check_segment_for_collision(grabbed_trains[train_id]->str);
                    bidib_free_train_state_query(train_state);
                }
            }
        }
        usleep(500000);
    }
    return NULL;
}

static void *stop_safety_layer(void *_) {
    usleep(1000000); // wait for running functions
    pthread_mutex_lock(&grabbed_trains_mutex);
    safety_layer_stopping = false;
    pthread_mutex_unlock(&grabbed_trains_mutex);
    return NULL;
}

bool train_grabbed(const char *train) {
    bool grabbed = false;
    pthread_mutex_lock(&grabbed_trains_mutex);
    for (size_t i = 0; i < MAX_TRAINS; i++) {
        if (grabbed_trains[i] != NULL && !strcmp(grabbed_trains[i]->str, train)) {
            grabbed = true;
            break;
        }
    }
    pthread_mutex_unlock(&grabbed_trains_mutex);
    return grabbed;
}

static int grab_train(const char *train) {
    pthread_mutex_lock(&grabbed_trains_mutex);
    for (size_t i = 0; i < MAX_TRAINS; i++) {
        if (grabbed_trains[i] != NULL && !strcmp(grabbed_trains[i]->str, train)) {
            pthread_mutex_unlock(&grabbed_trains_mutex);
            return -1;
        }
    }
    int start = next_grab_id;
    if (grabbed_trains[next_grab_id] != NULL) {
        increment_next_grab_id();
        while (grabbed_trains[next_grab_id] != NULL) {
            if (next_grab_id == start) {
                pthread_mutex_unlock(&grabbed_trains_mutex);
                syslog(LOG_ERR, "All grab ids in use");
                return -1;
            }
            increment_next_grab_id();
        }
    }
    int grab_id = next_grab_id;
    increment_next_grab_id();
    grabbed_trains[grab_id] = g_string_new(train);
    syslog(LOG_NOTICE, "Train %s grabbed", train);
    pthread_mutex_unlock(&grabbed_trains_mutex);
    return grab_id;
}

static bool free_train(int grab_id) {
    bool success = false;
    pthread_mutex_lock(&grabbed_trains_mutex);
    if (grabbed_trains[grab_id] != NULL) {
        syslog(LOG_NOTICE, "Train %s released", grabbed_trains[grab_id]->str);
        g_string_free(grabbed_trains[grab_id], TRUE);
        grabbed_trains[grab_id] = NULL;
        success = true;
    }
    pthread_mutex_unlock(&grabbed_trains_mutex);
    return success;
}

void free_all_grabbed_trains(void) {
    pthread_mutex_lock(&grabbed_trains_mutex);
    for (size_t i = 0; i < MAX_TRAINS; i++) {
        if (grabbed_trains[i] != NULL) {
            g_string_free(grabbed_trains[i], TRUE);
        }
    }
    pthread_mutex_unlock(&grabbed_trains_mutex);
}

onion_connection_status handler_grab_train(void *_, onion_request *req,
                                           onion_response *res) {
    build_response_header(res);
    if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
        const char *data_train = onion_request_get_post(req, "train");
        if (data_train == NULL) {
            syslog(LOG_ERR, "Request: Grab train - invalid parameters");
            return OCS_NOT_IMPLEMENTED;
        } else {
            t_bidib_train_state_query train_state =
                    bidib_get_train_state(data_train);
            if (!train_state.known) {
                bidib_free_train_state_query(train_state);
                syslog(LOG_ERR, "Request: Grab train - train not known");
                return OCS_NOT_IMPLEMENTED;
            } else {
                bidib_free_train_state_query(train_state);
                int grab_id = grab_train(data_train);
                if (grab_id == -1) {
                    syslog(LOG_ERR, "Request: Grab train - train already grabbed");
                    return OCS_NOT_IMPLEMENTED;
                } else {
                    if (!safety_layer_running && !safety_layer_starting && !safety_layer_stopping) {
                        safety_layer_starting = true;
                        pthread_create(&start_stop_thread, NULL, start_safety_layer, NULL);
                    }
                    syslog(LOG_NOTICE, "Request: Grab train - train: %s", data_train);
                    onion_response_printf(res, "%ld,%d", session_id, grab_id);
                    return OCS_PROCESSED;
                }
            }
        }
    } else {
        syslog(LOG_ERR, "Request: Grab train - system not running or wrong request type");
        return OCS_NOT_IMPLEMENTED;
    }
}

onion_connection_status handler_release_train(void *_, onion_request *req,
                                              onion_response *res) {
    build_response_header(res);
    if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
        const char *data_session_id = onion_request_get_post(req, "session-id");
        const char *data_grab_id = onion_request_get_post(req, "grab-id");
        int client_session_id = params_check_session_id(data_session_id);
        int grab_id = params_check_grab_id(data_grab_id, MAX_TRAINS);
        if (client_session_id != session_id) {
            syslog(LOG_NOTICE, "Request: Free train - invalid session id");
            onion_response_printf(res, "invalid session id");
            return OCS_PROCESSED;
        } else if (grab_id == -1 || !free_train(grab_id)) {
            syslog(LOG_ERR, "Request: Free train - invalid grab id");
            onion_response_printf(res, "invalid grab id");
            return OCS_PROCESSED;
        } else {
            if (safety_layer_running && !safety_layer_starting && !safety_layer_stopping) {
                safety_layer_stopping = true;
                safety_layer_running = false;
                pthread_create(&start_stop_thread, NULL, stop_safety_layer, NULL);
            }
            syslog(LOG_NOTICE, "Request: Free train");
            return OCS_PROCESSED;
        }
    } else {
        syslog(LOG_ERR, "Request: Free train - system not running or wrong request type");
        return OCS_NOT_IMPLEMENTED;
    }
}

onion_connection_status handler_set_dcc_train_speed(void *_, onion_request *req,
                                                    onion_response *res) {
    build_response_header(res);
    if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
        const char *data_session_id = onion_request_get_post(req, "session-id");
        const char *data_grab_id = onion_request_get_post(req, "grab-id");
        const char *data_speed = onion_request_get_post(req, "speed");
        const char *data_track_output = onion_request_get_post(req, "track-output");
        int client_session_id = params_check_session_id(data_session_id);
        int grab_id = params_check_grab_id(data_grab_id, MAX_TRAINS);
        int speed = params_check_speed(data_speed);
        if (client_session_id != session_id) {
            syslog(LOG_NOTICE, "Request: Set train speed - invalid session id");
            onion_response_printf(res, "invalid session id");
            return OCS_PROCESSED;
        } else if (grab_id == -1 || grabbed_trains[grab_id] == NULL) {
            syslog(LOG_ERR, "Request: Set train speed - bad grab id");
            onion_response_printf(res, "invalid grab id");
            return OCS_PROCESSED;
        } else if (speed == 999) {
            syslog(LOG_ERR, "Request: Set train speed - bad speed");
            return OCS_NOT_IMPLEMENTED;
        } else if (data_track_output == NULL) {
            syslog(LOG_ERR, "Request: Set train speed - bad track output");
            return OCS_NOT_IMPLEMENTED;
        } else {
            pthread_mutex_lock(&grabbed_trains_mutex);
            if (bidib_set_train_speed(grabbed_trains[grab_id]->str,
                                      speed, data_track_output)) {
                syslog(LOG_ERR, "Request: Set train speed - bad parameter values");
                pthread_mutex_unlock(&grabbed_trains_mutex);
                return OCS_NOT_IMPLEMENTED;
            } else {
                bidib_flush();
                syslog(LOG_NOTICE, "Request: Set train speed - train: %s speed: %d",
                       grabbed_trains[grab_id]->str, speed);
                pthread_mutex_unlock(&grabbed_trains_mutex);
                return OCS_PROCESSED;
            }
        }
    } else {
        syslog(LOG_ERR, "Request: Set train speed - system not running or wrong request type");
        return OCS_NOT_IMPLEMENTED;
    }
}

onion_connection_status handler_set_calibrated_train_speed(void *_,
                                                           onion_request *req,
                                                           onion_response *res) {
    build_response_header(res);
    if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
        const char *data_session_id = onion_request_get_post(req, "session-id");
        const char *data_grab_id = onion_request_get_post(req, "grab-id");
        const char *data_speed = onion_request_get_post(req, "speed");
        const char *data_track_output = onion_request_get_post(req, "track-output");
        int client_session_id = params_check_session_id(data_session_id);
        int grab_id = params_check_grab_id(data_grab_id, MAX_TRAINS);
        int speed = params_check_calibrated_speed(data_speed);
        if (client_session_id != session_id) {
            syslog(LOG_ERR, "Request: Set calibrated train speed - invalid session id");
            onion_response_printf(res, "invalid session id");
            return OCS_PROCESSED;
        } else if (grab_id == -1 || grabbed_trains[grab_id] == NULL) {
            syslog(LOG_ERR, "Request: Set calibrated train speed - bad grab id");
            onion_response_printf(res, "invalid grab id");
            return OCS_PROCESSED;
        } else if (speed == 999) {
            syslog(LOG_ERR, "Request: Set calibrated train speed - bad speed");
            return OCS_NOT_IMPLEMENTED;
        } else if (data_track_output == NULL) {
            syslog(LOG_ERR, "Request: Set calibrated train speed - bad track output");
            return OCS_NOT_IMPLEMENTED;
        } else {
            pthread_mutex_lock(&grabbed_trains_mutex);
            if (bidib_set_calibrated_train_speed(grabbed_trains[grab_id]->str,
                                                 speed, data_track_output)) {
                syslog(LOG_ERR, "Request: Set calibrated train speed - bad "
                                "parameter values");
                pthread_mutex_unlock(&grabbed_trains_mutex);
                return OCS_NOT_IMPLEMENTED;
            } else {
                bidib_flush();
                syslog(LOG_NOTICE, "Request: Set calibrated train speed - "
                                   "train: %s speed: %d",
                       grabbed_trains[grab_id]->str, speed);
                pthread_mutex_unlock(&grabbed_trains_mutex);
                return OCS_PROCESSED;
            }
        }
    } else {
        syslog(LOG_ERR, "Request: Set calibrated train speed - system not running "
                        "or wrong request type");
        return OCS_NOT_IMPLEMENTED;
    }
}

onion_connection_status handler_set_train_emergency_stop(void *_,
                                                         onion_request *req,
                                                         onion_response *res) {
    build_response_header(res);
    if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
        const char *data_session_id = onion_request_get_post(req, "session-id");
        const char *data_grab_id = onion_request_get_post(req, "grab-id");
        const char *data_track_output = onion_request_get_post(req, "track-output");
        int client_session_id = params_check_session_id(data_session_id);
        int grab_id = params_check_grab_id(data_grab_id, MAX_TRAINS);
        if (client_session_id != session_id) {
            syslog(LOG_ERR, "Request: Set train emergency stop - invalid session id");
            onion_response_printf(res, "invalid session id");
            return OCS_PROCESSED;
        } else if (grab_id == -1 || grabbed_trains[grab_id] == NULL) {
            syslog(LOG_ERR, "Request: Set train emergency stop - bad grab id");
            onion_response_printf(res, "invalid grab id");
            return OCS_PROCESSED;
        } else if (data_track_output == NULL) {
            syslog(LOG_ERR, "Request: Set train emergency stop - bad track output");
            return OCS_NOT_IMPLEMENTED;
        } else {
            pthread_mutex_lock(&grabbed_trains_mutex);
            if (bidib_emergency_stop_train(grabbed_trains[grab_id]->str,
                                           data_track_output)) {
                syslog(LOG_ERR, "Request: Set train emergency stop - bad "
                                "parameter values");
                pthread_mutex_unlock(&grabbed_trains_mutex);
                return OCS_NOT_IMPLEMENTED;
            } else {
                bidib_flush();
                syslog(LOG_NOTICE, "Request: Set train emergency stop - train: %s",
                       grabbed_trains[grab_id]->str);
                pthread_mutex_unlock(&grabbed_trains_mutex);
                return OCS_PROCESSED;
            }
        }
    } else {
        syslog(LOG_ERR, "Request: Set train emergency stop - system not running "
                        "or wrong request type");
        return OCS_NOT_IMPLEMENTED;
    }
}

onion_connection_status handler_set_train_peripheral(void *_,
                                                     onion_request *req,
                                                     onion_response *res) {
    build_response_header(res);
    if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
        const char *data_session_id = onion_request_get_post(req, "session-id");
        const char *data_grab_id = onion_request_get_post(req, "grab-id");
        const char *data_peripheral = onion_request_get_post(req, "peripheral");
        const char *data_state = onion_request_get_post(req, "state");
        const char *data_track_output = onion_request_get_post(req, "track-output");
        int client_session_id = params_check_session_id(data_session_id);
        int grab_id = params_check_grab_id(data_grab_id, MAX_TRAINS);
        int state = params_check_state(data_state);
        if (client_session_id != session_id) {
            syslog(LOG_ERR, "Request: Set train peripheral - invalid session id");
            onion_response_printf(res, "invalid session id");
            return OCS_PROCESSED;
        } else if (grab_id == -1 || grabbed_trains[grab_id] == NULL) {
            syslog(LOG_ERR, "Request: Set train peripheral - bad grab id");
            onion_response_printf(res, "invalid grab id");
            return OCS_PROCESSED;
        } else if (state == -1) {
            syslog(LOG_ERR, "Request: Set train peripheral - bad state");
            return OCS_NOT_IMPLEMENTED;
        } else if (data_peripheral == NULL) {
            syslog(LOG_ERR, "Request: Set train peripheral - bad peripheral");
            return OCS_NOT_IMPLEMENTED;
        } else if (data_track_output == NULL) {
            syslog(LOG_ERR, "Request: Set train peripheral - bad track output");
            return OCS_NOT_IMPLEMENTED;
        } else {
            pthread_mutex_lock(&grabbed_trains_mutex);
            if (bidib_set_train_peripheral(grabbed_trains[grab_id]->str,
                                           data_peripheral, state,
                                           data_track_output)) {
                syslog(LOG_ERR, "Request: Set train peripheral - bad "
                                "parameter values");
                pthread_mutex_unlock(&grabbed_trains_mutex);
                return OCS_NOT_IMPLEMENTED;
            } else {
                bidib_flush();
                syslog(LOG_NOTICE, "Request: Set train peripheral - train: %s "
                                   "peripheral: %s state: 0x%02x",
                       grabbed_trains[grab_id]->str,
                       data_peripheral, state);
                pthread_mutex_unlock(&grabbed_trains_mutex);
                return OCS_PROCESSED;
            }
        }
    } else {
        syslog(LOG_ERR, "Request: Set train peripheral - system not running or "
                        "wrong request type");
        return OCS_NOT_IMPLEMENTED;
    }
}

static bool grab_request(const char *train, const char *startseg, const char *endseg) {
    pthread_mutex_lock(&grabbed_trains_mutex);
    for (size_t i = 0; i < MAX_TRAINS; i++) {
        if (grabbed_trains[i] != NULL && !strcmp(grabbed_trains[i]->str, train)) {

            strcpy(route_requests[i].train_id, train);
            strcpy(route_requests[i].start_seg, startseg);
            strcpy(route_requests[i].end_seg, endseg);
            strcpy(route_requests[i].status, "Pending");
            pthread_mutex_unlock(&grabbed_trains_mutex);
            return true;
        }
    }
    pthread_mutex_unlock(&grabbed_trains_mutex);
    return false;;
}

onion_connection_status handler_set_route_request(void *_, onion_request *req,
                                                  onion_response *res) {
    build_response_header(res);

    if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {

        const char *data_session_id = onion_request_get_post(req, "session-id");
        const char *data_grab_id = onion_request_get_post(req, "grab-id");
        const char *data_startseg = onion_request_get_post(req, "startingsegment");
        const char *data_endseg = onion_request_get_post(req, "endingsegment");



        int client_session_id = params_check_session_id(data_session_id);
        int grab_id = params_check_grab_id(data_grab_id, MAX_TRAINS);


        if (client_session_id != session_id) {
            syslog(LOG_NOTICE, "Request: Set train speed - invalid session id");
            onion_response_printf(res, "invalid session id");
            return OCS_PROCESSED;
        } else if (grab_id == -1 || grabbed_trains[grab_id] == NULL) {
            syslog(LOG_ERR, "Request: Set train speed - bad grab id");
            onion_response_printf(res, "invalid grab id");
            return OCS_PROCESSED;
        } else {
            pthread_mutex_lock(&grabbed_trains_mutex);
            if (grab_request(grabbed_trains[grab_id]->str, data_startseg, data_endseg))
                syslog(LOG_NOTICE, "Request: Set train route request - train: %s ,seg1 : %s,seg2: %s",
                       route_requests[grab_id].train_id, route_requests[grab_id].start_seg,
                       route_requests[grab_id].end_seg);
            pthread_mutex_unlock(&grabbed_trains_mutex);
            return OCS_PROCESSED;
        }


    } else {
        syslog(LOG_ERR, "Request: Set train route request - system not running or wrong request type");
        return OCS_NOT_IMPLEMENTED;
    }
}


onion_connection_status handler_get_route_request(void *_, onion_request *req,
                                                  onion_response *res) {
    build_response_header(res);

    if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
        const char *data_grab_id = onion_request_get_post(req, "grab-id");

        onion_dict *dict = onion_dict_new();

        if (data_grab_id != NULL) {
            int grab_id = params_check_grab_id(data_grab_id, MAX_TRAINS);

            if (grab_id == -1 || grabbed_trains[grab_id] == NULL) {
                syslog(LOG_ERR, "Request: Get available Route Requests - bad grab id");
                onion_response_printf(res, "invalid grab id");
                return OCS_PROCESSED;
            } else {

                onion_dict *subd = onion_dict_new();

                onion_dict_add(subd, "trainid", convertme(route_requests[grab_id].train_id), 0);
                onion_dict_add(subd, "startingsegment", convertme(route_requests[grab_id].start_seg), 0);
                onion_dict_add(subd, "endingsegment", convertme(route_requests[grab_id].end_seg), 0);
                onion_dict_add(subd, "status", convertme(route_requests[grab_id].status), 0);
                onion_dict_add(dict, "0", subd, OD_DICT | OD_FREE_VALUE);
                syslog(LOG_NOTICE, "Request: Get available Route Requests");

                return onion_shortcut_response_json(dict, req, res);
            }

        } else {

            for (size_t i = 0; i < next_grab_id; i++) {
                char *id = malloc(6);
                sprintf(id, "%d", i);
                onion_dict *subd = onion_dict_new();

                onion_dict_add(subd, "trainid", convertme(route_requests[i].train_id), 0);
                onion_dict_add(subd, "startingsegment", convertme(route_requests[i].start_seg), 0);
                onion_dict_add(subd, "endingsegment", convertme(route_requests[i].end_seg), 0);
                onion_dict_add(subd, "status", convertme(route_requests[i].status), 0);
                onion_dict_add(dict, id, subd, OD_DICT | OD_FREE_VALUE);

            }
            syslog(LOG_NOTICE, "Request: Get available Route Requests");

            return onion_shortcut_response_json(dict, req, res);
        }

    } else {
        syslog(LOG_ERR, "Request: Get available Route Requests - system not running or "
                        "wrong request type");
        return OCS_NOT_IMPLEMENTED;
    }
}