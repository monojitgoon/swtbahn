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
#include <onion/log.h>
#include <signal.h>
#include <bidib.h>
#include <pthread.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <syslog.h>
#include <glib.h>
#include <time.h>

#include "handler_monitor.h"
#include "handler_admin.h"
#include "handler_driver.h"
#include "handler_controller.h"

#define INPUT_MAX_LEN 256


volatile time_t session_id;
volatile bool starting = false;
volatile bool stopping = false;
volatile bool running = false;
volatile bool safety_layer_starting = false;
volatile bool safety_layer_stopping = false;
volatile bool safety_layer_running = false;
char serial_device[INPUT_MAX_LEN];
char config_directory[INPUT_MAX_LEN];


static onion_connection_status handler_root(void *_, onion_request *req,
                                            onion_response *res) {
	onion_response_printf(res, "SWTbahnTeam2 server");
	return OCS_PROCESSED;
}

static int eval_args(int argc, char **argv) {
	if (argc == 5) {
		if (strnlen(argv[1], INPUT_MAX_LEN + 1) == INPUT_MAX_LEN + 1 ||
		    strnlen(argv[2], INPUT_MAX_LEN + 1) == INPUT_MAX_LEN + 1) {
			printf("Serial device and config directory must not exceed %d signs\n",
			       INPUT_MAX_LEN);
			return 1;
		} else if (strnlen(argv[3], 16) == 16) {
			printf("IP address must not exceed 15 signs\n");
			return 1;
		} else if (strnlen(argv[4], 6) == 6) {
			printf("Port must not exceed 5 signs\n");
			return 1;
		} else {
			strcpy(serial_device, argv[1]);
			strcpy(config_directory, argv[2]);
			return 0;
		}
	} else {
		printf("Four arguments expected: <serial device> <config directory> "
			   "<IP address> <port>\n");
		return 1;
	}
}

int main(int argc, char **argv) {
	if (eval_args(argc, argv)) {
		return 1;
	}

	openlog("bidib", 0, LOG_LOCAL0);
	syslog(LOG_NOTICE, "SWTbahn server started");

	onion *o = onion_new(O_THREADED);
	onion_set_hostname(o, argv[3]);
	onion_set_port(o, argv[4]);
	onion_url *urls = onion_root_url(o);
	onion_url_add(urls, "", handler_root);

	// --- admin functions ---
	onion_url_add(urls, "admin/startup", handler_startup);
    onion_url_add(urls, "admin/get-session-id", handler_get_session_id);
	onion_url_add(urls, "admin/shutdown", handler_shutdown);
	onion_url_add(urls, "admin/set-track-output", handler_set_track_output);
	
	// --- track controller functions ---
	onion_url_add(urls, "controller/set-point", handler_set_point);
	onion_url_add(urls, "controller/set-signal", handler_set_signal);
	
	// --- train driver functions ---
	onion_url_add(urls, "driver/grab-train", handler_grab_train);
	onion_url_add(urls, "driver/release-train", handler_release_train);
	onion_url_add(urls, "driver/set-dcc-train-speed", handler_set_dcc_train_speed);
	onion_url_add(urls, "driver/set-calibrated-train-speed",
	              handler_set_calibrated_train_speed);
	onion_url_add(urls, "driver/set-train-emergency-stop",
	              handler_set_train_emergency_stop);
	onion_url_add(urls, "driver/set-train-peripheral",
	              handler_set_train_peripheral);
	onion_url_add(urls, "driver/set-route-request",
				  handler_set_route_request);
	onion_url_add(urls, "driver/get-route-request",
				  handler_get_route_request);
	onion_url_add(urls, "driver/update-route-request",
				  handler_update_route_request);
	// --- monitor functions ---
	onion_url_add(urls, "monitor/trains", handler_get_trains);
	onion_url_add(urls, "monitor/train-state", handler_get_train_state);
	onion_url_add(urls, "monitor/train-peripherals", handler_get_train_peripherals);
	onion_url_add(urls, "monitor/track-outputs", handler_get_track_outputs);
	onion_url_add(urls, "monitor/points", handler_get_points);
	onion_url_add(urls, "monitor/signals", handler_get_signals);
	onion_url_add(urls, "monitor/point-aspects", handler_get_point_aspects); // TODO
	onion_url_add(urls, "monitor/signal-aspects", handler_get_signal_aspects); // TODO
	onion_url_add(urls, "monitor/segments", handler_get_segments);

	onion_listen(o);
	onion_free(o);
	free_all_grabbed_trains();
	syslog(LOG_NOTICE, "%s", "SWTbahn server stopped");
	closelog();

	return 0;
}

