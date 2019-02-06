
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
