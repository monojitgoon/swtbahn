
#include <onion/onion.h>
#include <bidib.h>
#include <pthread.h>
#include <unistd.h>
#include <syslog.h>
#include <stdio.h>
#include <yaml.h>
#include <stdbool.h>

#include "server.h"

pthread_mutex_t interlocking_mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_t interlocking_thread;



static bool swtbahn_config_parse_single_route(yaml_parser_t *parser) {
	syslog(LOG_NOTICE, "inside parser ");

	return true;
	
}
static bool swtbahn_config_init_parser(const char *config_dir, const char *config_file,
                              FILE **fh, yaml_parser_t *parser) {
	size_t full_path_length = strlen(config_dir) + strlen(config_file) + 1;
	char full_path[full_path_length];
	snprintf(full_path, full_path_length, "%s%s", config_dir, config_file);
	*fh = fopen(full_path, "r");

	if (*fh == NULL) {
		syslog(LOG_ERR, "%s", "Failed to open board-config");
		return true;
	} else if (!yaml_parser_initialize(parser)) {
		fclose(*fh);
		syslog(LOG_ERR, "%s", "Failed to initialize config parser");
		return true;
	}

	yaml_parser_set_input_file(parser, *fh);
	return false;
}
static bool swtbahn_config_parse_scalar_then_section(yaml_parser_t *parser, char *scalar,
                                            bool (*section_elem_action)(yaml_parser_t *)) {
	yaml_event_t event;
	bool error = false;
	bool boards_read = false;
	bool seq_read = false;

	while (!error) {
		if (!yaml_parser_parse(parser, &event)) {
			error = true;
			break;
		} else if (event.type == YAML_STREAM_END_EVENT) {
			yaml_event_delete(&event);
			break;
		}

		switch (event.type) {
			case YAML_NO_EVENT:
				error = true;
				break;
			case YAML_STREAM_START_EVENT:
				// ignore
				break;
			case YAML_STREAM_END_EVENT:
				// checked before switch case
				break;
			case YAML_DOCUMENT_START_EVENT:
				if (boards_read) {
					error = true;
				}
				break;
			case YAML_DOCUMENT_END_EVENT:
				if (!boards_read || !seq_read) {
					error = true;
				}
				break;
			case YAML_SEQUENCE_START_EVENT:
				if (!boards_read || seq_read) {
					error = true;
				} else {
					seq_read = true;
				}
				break;
			case YAML_SEQUENCE_END_EVENT:
				if (!boards_read || !seq_read) {
					error = true;
				}
				break;
			case YAML_MAPPING_START_EVENT:
				if (boards_read && !seq_read) {
					error = true;
				} else if (boards_read) {
					error = section_elem_action(parser);
				}
				break;
			case YAML_MAPPING_END_EVENT:
				if (!boards_read || !seq_read) {
					error = true;
				}
				break;
			case YAML_ALIAS_EVENT:
				error = true;
				break;
			case YAML_SCALAR_EVENT:
				if (!boards_read && !seq_read &&
				    !strcmp((char *) event.data.scalar.value, scalar)) {
					boards_read = true;
				} else {
					error = true;
				}
				break;
		}
		yaml_event_delete(&event);
	}

	return error;
}

int swtbahn_config_parse_interlocking_config(const char *config_dir){
	FILE *fh;
	yaml_parser_t parser;
	if (swtbahn_config_init_parser(config_dir, "/swtbahn_interlocking_config.yml", &fh,
	                             &parser)) {
		return true;
	}

	bool error = swtbahn_config_parse_scalar_then_section(&parser, "routes",
	                                                    swtbahn_config_parse_single_route);

	if (error) {
		syslog(LOG_ERR, "%s", "Error while parsing routes config");
	}

	yaml_parser_delete(&parser);
	fclose(fh);
	return error;
}

void *start_interlocking(void *_) {
	syslog(LOG_NOTICE, "inside interlocking %s ", config_directory);
	int err = swtbahn_config_parse_interlocking_config(config_directory);
	
	return NULL;
}


