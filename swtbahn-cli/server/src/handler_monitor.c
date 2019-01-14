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
#include "server.h"
#include "handler_driver.h"
#include "param_verification.h"
#include <onion/dict.h>
#include <onion/shortcuts.h>

onion_connection_status handler_get_trains(void *_, onion_request *req,
                                           onion_response *res) {
		build_response_header(res);
										   
	if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
		t_bidib_id_list_query query = bidib_get_trains();


		onion_dict *dict = onion_dict_new();

		for (size_t i = 0; i < query.length; i++)
		{
			char *id = malloc(6);
			sprintf(id, "%d", i);
			onion_dict *subd = onion_dict_new();

			onion_dict_add(subd, "trainid", convertme(query.ids[i]), 0);
			onion_dict_add(subd, "grabbed", train_grabbed(query.ids[i]) ? "yes" : "no", 0);
			onion_dict_add(dict, id, subd, OD_DICT | OD_FREE_VALUE);
		}

		bidib_free_id_list_query(query);
		syslog(LOG_NOTICE, "Request: Get available trains");
		return onion_shortcut_response_json(dict, req, res);
	} else {
		syslog(LOG_ERR, "Request: Get available trains - system not running or "
		       "wrong request type");
		return OCS_NOT_IMPLEMENTED;
	}
}

onion_connection_status handler_get_train_state(void *_, onion_request *req,
                                                onion_response *res) {
	build_response_header(res);

	if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
		const char *data_train = onion_request_get_post(req, "train");
		if (data_train == NULL) {
			syslog(LOG_ERR, "Request: Get train train state - invalid parameters");
			return OCS_NOT_IMPLEMENTED;
		} else {
			t_bidib_train_state_query train_state =
				bidib_get_train_state(data_train);
			if (train_state.known) {
				GString *ret_string = g_string_new("");
				g_string_append_printf(ret_string, "on track: %s - direction: %s"
				                       " - speed step: %d",
				                       train_state.data.on_track ? "yes" : "no",
				                       train_state.data.direction ==
				                       BIDIB_TRAIN_DIRECTION_FORWARD ?
				                       "forward" : "backward",
				                       train_state.data.set_speed_step);
				bidib_free_train_state_query(train_state);
				char response[ret_string->len + 1];
				strcpy(response, ret_string->str);
				g_string_free(ret_string, true);
				onion_response_printf(res, response);
				syslog(LOG_NOTICE, "Request: Get train state");
				return OCS_PROCESSED;
			} else {
				syslog(LOG_ERR, "Request: Get train train state - invalid train");
				return OCS_NOT_IMPLEMENTED;
			}
		}
	} else {
		syslog(LOG_ERR, "Request: Get train state - system not running or "
		       "wrong request type");
		return OCS_NOT_IMPLEMENTED;
	}

}

onion_connection_status handler_get_train_peripherals(void *_, onion_request *req,
                                                      onion_response *res) {
	if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
		const char *data_train = onion_request_get_post(req, "train");
		if (data_train == NULL) {
			syslog(LOG_ERR, "Request: Get train peripherals - invalid parameters");
			return OCS_NOT_IMPLEMENTED;
		} else {
			t_bidib_id_list_query query =
				bidib_get_train_peripherals(data_train);
			if (query.length > 0) {
				GString *train_peripherals = g_string_new("");
				for (size_t i = 0; i < query.length; i++) {
					t_bidib_train_peripheral_state_query per_state =
						bidib_get_train_peripheral_state(data_train, query.ids[i]);
					g_string_append_printf(train_peripherals, "%s%s - state: %s",
					                       i != 0 ? "\n" : "", query.ids[i],
					                       per_state.state == 1 ? "on" : "off");
				}
				bidib_free_id_list_query(query);
				char response[train_peripherals->len + 1];
				strcpy(response, train_peripherals->str);
				g_string_free(train_peripherals, true);
				onion_response_printf(res, response);
				syslog(LOG_NOTICE, "Request: Get train peripherals");
				return OCS_PROCESSED;
			} else {
				bidib_free_id_list_query(query);
				syslog(LOG_ERR, "Request: Get train train peripherals - invalid "
				       "train");
				return OCS_NOT_IMPLEMENTED;
			}
		}
	} else {
		syslog(LOG_ERR, "Request: Get train peripherals - system not running or "
		       "wrong request type");
		return OCS_NOT_IMPLEMENTED;
	}
}

onion_connection_status handler_get_track_outputs(void *_, onion_request *req,
                                                  onion_response *res) {
	if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
		GString *track_outputs = g_string_new("");
		t_bidib_id_list_query query = bidib_get_track_outputs();
		for (size_t i = 0; i < query.length; i++) {
			t_bidib_track_output_state_query track_output_state =
				bidib_get_track_output_state(query.ids[i]);
			if (track_output_state.known) {
				char *state_string;
				switch (track_output_state.cs_state) {
					case 0x00:
						state_string = "off";
						break;
					case 0x01:
						state_string = "stop";
						break;
					case 0x02:
						state_string = "soft stop";
						break;
					case 0x03:
						state_string = "go";
						break;
					case 0x04:
						state_string = "go + ignore watchdog";
						break;
					case 0x08:
						state_string = "prog";
						break;
					case 0x09:
						state_string = "prog busy";
						break;
					case 0x0D:
						state_string = "busy";
						break;
					case 0xFF:
						state_string = "query";
						break;
				}
				g_string_append_printf(track_outputs, "%s%s - state: %s",
				                       i != 0 ? "\n" : "", query.ids[i],
				                       state_string);
			}
		}
		bidib_free_id_list_query(query);
		char response[track_outputs->len + 1];
		strcpy(response, track_outputs->str);
		g_string_free(track_outputs, true);
		onion_response_printf(res, response);
		syslog(LOG_NOTICE, "Request: Get track outputs");
		return OCS_PROCESSED;
	} else {
		syslog(LOG_ERR, "Request: Get track outputs - system not running or "
		       "wrong request type");
		return OCS_NOT_IMPLEMENTED;
	}
}

onion_connection_status handler_get_points(void *_, onion_request *req,
                                           onion_response *res) {
	build_response_header(res);

	if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
		t_bidib_id_list_query query = bidib_get_connected_points();
		onion_dict *dict = onion_dict_new();
		for (size_t i = 0; i < query.length; i++) {
			t_bidib_unified_accessory_state_query point_state =
				bidib_get_point_state(query.ids[i]);
			char *id = malloc(6);
			sprintf(id, "%d", i);
			onion_dict *subd = onion_dict_new();

			onion_dict_add(subd, "pointid", convertme(query.ids[i]), 0);
			onion_dict_add(subd, "state", point_state.type == BIDIB_ACCESSORY_BOARD ?
										  convertme(point_state.board_accessory_state.state_id) :
										  convertme(point_state.dcc_accessory_state.state_id), 0);
			onion_dict_add(dict, id, subd, OD_DICT | OD_FREE_VALUE);
			bidib_free_unified_accessory_state_query(point_state);
		}
		bidib_free_id_list_query(query);
		syslog(LOG_NOTICE, "Request: Get points");
		return onion_shortcut_response_json(dict, req, res);
	} else {
		syslog(LOG_ERR, "Request: Get points - system not running or wrong "
			   "request type");
		return OCS_NOT_IMPLEMENTED;
	}
}

onion_connection_status handler_get_signals(void *_, onion_request *req,
                                            onion_response *res) {
	build_response_header(res);

	if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
		t_bidib_id_list_query query = bidib_get_connected_signals();
		onion_dict *dict = onion_dict_new();

		for (size_t i = 0; i < query.length; i++) {
			t_bidib_unified_accessory_state_query signal_state =
				bidib_get_signal_state(query.ids[i]);
			char *id = malloc(6);
			sprintf(id, "%d", i);
			onion_dict *subd = onion_dict_new();

			onion_dict_add(subd, "signalid", convertme(query.ids[i]), 0);
			onion_dict_add(subd, "state", signal_state.type == BIDIB_ACCESSORY_BOARD ?
										  convertme(signal_state.board_accessory_state.state_id) :
										  convertme(signal_state.dcc_accessory_state.state_id) , 0);
			onion_dict_add(dict, id, subd, OD_DICT | OD_FREE_VALUE);
			bidib_free_unified_accessory_state_query(signal_state);
		}
		bidib_free_id_list_query(query);
		syslog(LOG_NOTICE, "Request: Get signals");
		return onion_shortcut_response_json(dict, req, res);
	} else {
		syslog(LOG_ERR, "Request: Get signals - system not running or wrong "
			   "request type");
		return OCS_NOT_IMPLEMENTED;
	}
}

onion_connection_status handler_get_point_aspects(void *_, onion_request *req,
                                                  onion_response *res) {
	if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
		const char *data_point = onion_request_get_post(req, "point");
		if (data_point == NULL) {
			syslog(LOG_ERR, "Request: Get point aspects - invalid parameters");
			return OCS_NOT_IMPLEMENTED;
		} else {
			t_bidib_id_list_query query = bidib_get_point_aspects(data_point);
			if (query.length > 0) {
				GString *aspects = g_string_new("");
				for (size_t i = 0; i < query.length; i++) {
					g_string_append_printf(aspects, "%s%s", i != 0 ? ", " : "",
					                       query.ids[i]);
				}
				bidib_free_id_list_query(query);
				char response[aspects->len + 1];
				strcpy(response, aspects->str);
				g_string_free(aspects, true);
				onion_response_printf(res, response);
				syslog(LOG_NOTICE, "Request: Get point aspects");
				return OCS_PROCESSED;
			} else {
				bidib_free_id_list_query(query);
				syslog(LOG_ERR, "Request: Get point aspects - invalid point");
				return OCS_NOT_IMPLEMENTED;
			}
		}
	} else {
		syslog(LOG_ERR, "Request: Get point aspects - system not running or "
		       "wrong request type");
		return OCS_NOT_IMPLEMENTED;
	}
}

onion_connection_status handler_get_signal_aspects(void *_, onion_request *req,
                                                   onion_response *res) {
	if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
		const char *data_signal = onion_request_get_post(req, "signal");
		if (data_signal == NULL) {
			syslog(LOG_ERR, "Request: Get signal aspects - invalid parameters");
			return OCS_NOT_IMPLEMENTED;
		} else {
			t_bidib_id_list_query query = bidib_get_signal_aspects(data_signal);
			if (query.length > 0) {
				GString *aspects = g_string_new("");
				for (size_t i = 0; i < query.length; i++) {
					g_string_append_printf(aspects, "%s%s", i != 0 ? ", " : "",
					                       query.ids[i]);
				}
				bidib_free_id_list_query(query);
				char response[aspects->len + 1];
				strcpy(response, aspects->str);
				g_string_free(aspects, true);
				onion_response_printf(res, response);
				syslog(LOG_NOTICE, "Request: Get signal aspects");
				return OCS_PROCESSED;
			} else {
				bidib_free_id_list_query(query);
				syslog(LOG_ERR, "Request: Get signal aspects - invalid signal");
				return OCS_NOT_IMPLEMENTED;
			}
		}
	} else {
		syslog(LOG_ERR, "Request: Get signal aspects - system not running or "
		       "wrong request type");
		return OCS_NOT_IMPLEMENTED;
	}
}

onion_connection_status handler_get_segments(void *_, onion_request *req,
                                             onion_response *res) {
	build_response_header(res);

	if (running && ((onion_request_get_flags(req) & OR_METHODS) == OR_POST)) {
		t_bidib_id_list_query seg_query = bidib_get_connected_segments();
		onion_dict *dict = onion_dict_new();
		for (size_t i = 0; i < seg_query.length; i++) {
			t_bidib_segment_state_query seg_state_query =
				bidib_get_segment_state(seg_query.ids[i]);

			char *id = malloc(6);
			sprintf(id, "%d", i);
			onion_dict *subd = onion_dict_new();

			onion_dict_add(subd, "segmentid", convertme(seg_query.ids[i]), 0);
			onion_dict_add(subd, "occupied", seg_state_query.data.occupied ? "yes" : "no", 0);

			if (seg_state_query.data.dcc_address_cnt > 0) {
				t_bidib_id_query id_query;
				for (size_t j = 0; j < seg_state_query.data.dcc_address_cnt; j++) {
					id_query = bidib_get_train_id(seg_state_query.data.dcc_addresses[j]);
					if (id_query.known) {
						onion_dict_add(subd, "trains", convertme(id_query.id), 0);
					} else {
						onion_dict_add(subd, "trains", "unknown", 0);
					}
					bidib_free_id_query(id_query);
				}
			}
			onion_dict_add(dict, id, subd, OD_DICT | OD_FREE_VALUE);
			bidib_free_segment_state_query(seg_state_query);
		}
		bidib_free_id_list_query(seg_query);
		syslog(LOG_NOTICE, "Request: Get segments");
		return onion_shortcut_response_json(dict, req, res);
	} else {
		syslog(LOG_ERR, "Request: Get segments - system not running or "
		       "wrong request type");
		return OCS_NOT_IMPLEMENTED;
	}
}

