# SWTbahn client-server command line interface

This is a client-server command line interface for the SWTbahn. The server is
connected to the BiDiB interface and provides a REST API. The application 
provides a command line interface which connects to the web service to execute
the commands. The command line interface was developed by
[Monojit Goon and Lucky Sutradhar] as part of their work for the
swtbahn-web project.


## Dependencies

#### Server
* A C compiler
* Libraries: [onion](https://github.com/davidmoreno/onion), libpam, libgnutls,
libgcrypt, libpthread, libglib-2.0, libyaml,
[libbidib](https://github.com/uniba-swt/libbidib)

#### Client
* vuejs

## Build
1. Clone the repository
2. Adjust `server/CMakeLists.txt` according to your installations of the
dependencies
3. Navigate to the directory where the build files should be generated
4. Execute `cmake <path-to-project-root>/server`
5. Execute `make`


## Usage

#### Server
0. Build the executable (see section Build)
1. Create the configuration files for your track (see libbidib documentation)
2. Connect the BiDiB interface to the server
3. Check on which serial device the board is connected: `dmesg | grep tty`
4. Start the server: `./swtbahn-server <serial-device> <config-directory>
<IP> <port>` (IP is the IP-address under which the server can be reached and
port specifies on which port the server listens)  
  For example: `./swtbahn-server /dev/ttyUSB0 ../../configurations/swtbahn-lite/ 141.13.106.27 2048`  
5. Quit the server with Ctrl-C if you're done

#### Client
The client is located under `<project-root>/swtbahn-web/`