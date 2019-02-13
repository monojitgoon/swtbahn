/*
 *
 * Copyright (C) 2019 University of Bamberg, Software Technologies Research Group
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
 * - Monojit Goon
 * - Lucky Sutradhar
 */
#include <stddef.h>
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>


#define MAX_PATHSIZE 4096

typedef struct swtbahn_cli_route_request {
	int grab_id;
	char train_id[70];
	char start_seg[20];
	char end_seg[20];
	char controller[20];
	char pathValue[MAX_PATHSIZE];
	char status[20];
} swtbahn_cli_route_request;


typedef struct swtbahn_cli_route {
	GString *id;
	unsigned char start_seg;
	unsigned char end_seg;
	GArray *path;
	GArray *points;
	GArray *signal;
	GArray *conflicts;
} swtbahn_cli_route;
