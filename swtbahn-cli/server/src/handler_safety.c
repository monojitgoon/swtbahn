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

#include "server.h"
#include "param_verification.h"


pthread_mutex_t safety_layer_mutex = PTHREAD_MUTEX_INITIALIZER;


void check_segment_for_collision(const char *train)
{
			pthread_mutex_lock(&safety_layer_mutex);
			t_bidib_id_list_query seg_query = bidib_get_connected_segments();

                        for (size_t i = 0; i < seg_query.length; i++) {
							
                            t_bidib_segment_state_query seg_state_query =
                                    bidib_get_segment_state(seg_query.ids[i]);
                                    
							syslog(LOG_NOTICE, "inside seg_query %s : %s :%s:%d",seg_query.ids[i], seg_state_query.known  ? "true" : "false",seg_state_query.data.occupied  ? "true" : "false" ,seg_state_query.data.dcc_address_cnt);
      

                            if (seg_state_query.known && seg_state_query.data.occupied && seg_state_query.data.dcc_address_cnt > 1) {
                             
								pthread_mutex_unlock(&safety_layer_mutex);
								 syslog(LOG_NOTICE, "inside dcc_address_cnt > 1");
                                t_bidib_id_query id_query;
                                for (size_t j = 0; j < seg_state_query.data.dcc_address_cnt; j++) {
									
									syslog(LOG_NOTICE, "inside dcc_address_for loop");

                                    id_query = bidib_get_train_id(seg_state_query.data.dcc_addresses[j]);
                                    if (id_query.known && strcmp(train, id_query.id)) {
										syslog(LOG_NOTICE, "inside id_query.known loop");
									     
									     pthread_mutex_lock(&safety_layer_mutex);
                                        if (bidib_emergency_stop_train(id_query.id,
                                                                       "master")) {
                                            syslog(LOG_ERR, "Request: Set train emergency stop - bad "
                                                            "parameter values");
											pthread_mutex_unlock(&safety_layer_mutex);

                                        } else {
                                            bidib_flush();
                                            syslog(LOG_NOTICE, "Request: Set train emergency stop - train: %s",
                                                   id_query.id);
                                           pthread_mutex_unlock(&safety_layer_mutex);

                                        }
                                        bidib_free_id_query(id_query);
                                    }

                                    bidib_free_id_query(id_query);
                                }
                                
                                bidib_free_segment_state_query(seg_state_query);
                            }
                            else
                            {
								pthread_mutex_unlock(&safety_layer_mutex);
							}
                            bidib_free_id_list_query(seg_query);
                        }
}