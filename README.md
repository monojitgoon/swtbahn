# SWTbahn
As a safety critical system design, this project is implemented to control over a model railway track layout system. For that purpose, the project contains a client module interface to control and view whole digital train and track control systems, especially a track monitor client to visualize the activity of objects belongs to the model railway track, with necessary information available, a train driver client who can control over train activity and a stellwerk client to decide over route requests from train drivers and to accept and reject their requests from deciding over a interlocking table and an administrator client who can access roles of all other client module along with the management of other users' list. And a server module that communicate with the client model through response and ensure the safety and security of the low-level digital train and track control system against catastrophic situations, e.g., train collisions and analyse the low-level log messages from the digital train and track control systems to diagnose, notify, and predict operational issues with the model railway.

# Contributors

Copyright (C) 2019 University of Bamberg, Software Technologies Research Group
<https://www.uni-bamberg.de/>, <http://www.swt-bamberg.de/>

SWTbahn is
a client-side application to interactively control a server side CLI application through a BiDiB model railway.

SWTbahn is licensed under the GNU GENERAL PUBLIC LICENSE (Version 3), see
the LICENSE file at the project's top-level directory for details or consult
<http://www.gnu.org/licenses/>.

SWTbahn is free software: you can redistribute it and/or modify it under the
terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or any later version.

SWTbahn is a RESEARCH PROTOTYPE and distributed WITHOUT ANY WARRANTY, without
even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
PURPOSE. See the GNU General Public License for more details.

The following people contributed to the conception and realization of the
present SWTbahn:

- [Monojit Goon](https://github.com/monojitgoon)
- [Lucky Sutradhar](https://www.linkedin.com/in/lucky-sutradhar-19284561/)
