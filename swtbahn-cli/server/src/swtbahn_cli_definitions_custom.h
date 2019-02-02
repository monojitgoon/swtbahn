
#include <stddef.h>
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>

typedef struct swtbahn_cli_route_request {
	 char train_id[50];
	 char start_seg[20];
	 char end_seg[20];
	 char status[20];
} swtbahn_cli_route_request;
