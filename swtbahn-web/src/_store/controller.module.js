/*
 *
 * Copyright (C) 2019 University of Bamberg, Software Technologies Research Group
 * <https://www.uni-bamberg.de/>, <http://www.swt-bamberg.de/>
 *
 * This file is part of the SWTbahn Web interface (swtbahn-web), which is
 * a client-side application to interactively control a server side CLI application through a BiDiB model railway.
 *
 * swtbahn-web is licensed under the GNU GENERAL PUBLIC LICENSE (Version 3), see
 * the LICENSE file at the project's top-level directory for details or consult
 * <http://www.gnu.org/licenses/>.
 *
 * swtbahn-web is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or any later version.
 *
 * swtbahn-web is a RESEARCH PROTOTYPE and distributed WITHOUT ANY WARRANTY, without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE. See the GNU General Public License for more details.
 *
 * The following people contributed to the conception and realization of the
 * present swtbahn-web (in alphabetic order by surname):
 *
 * - Monojit Goon
 * - Lucky Sutradhar
 */
import Api from "./API";
import routingConfig from "../../config/routingConfig";

function initialControllerState() {
  return {
    /* .. initial state ... */
    routingTable: {},
    controllerRouteRequestArray: {},
    controllerRequestInterval: 0
  };
}

const state = initialControllerState;

const actions = {
  GetRoutingTable({ commit }) {
    commit("updateRoutingTable", routingConfig);
  },
  SetPointState({ dispatch }, { pointid, state }) {
    let formData = new FormData();
    formData.append("point", pointid);
    formData.append("state", state);

    Api()
      .post("controller/set-point", formData)
      .then(response => {
        if (response.status == 200) {
          dispatch("monitor/GetPointsArray", "", { root: true });
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  SetSignalState({ dispatch }, { signalid, state }) {
    let formData = new FormData();
    formData.append("signal", signalid);
    formData.append("state", state);
    Api()
      .post("controller/set-signal", formData)
      .then(response => {
        if (response.status == 200) {
          dispatch("monitor/GetSignalsArray", "", { root: true });
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  GetControllerRouteRequest({ commit }) {
    /* var tempRoute = {
      "0": {
        controller: "true",
        endingsegment: "seg29",
        grabid: "0",
        path: "",
        startingsegment: "seg29",
        status: "Pending",
        trainid: "train1"
      }
    };
    commit("updateControllerRouteRequestArray", tempRoute);*/
    Api()
      .post("driver/get-route-request")
      .then(response => {
        if (response.status == 200) {
          commit("updateControllerRouteRequestArray", response.data);
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  updateRouteRequest({ dispatch }, { routerequest }) {
    let formData = new FormData();
    formData.append("grab-id", routerequest.grabid);
    formData.append("path", routerequest.path);
    formData.append("status", routerequest.status);
    Api()
      .post("driver/update-route-request", formData)
      .then(response => {
        if (response.status == 200) {
          dispatch("GetControllerRouteRequest");
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  resetController({ commit }) {
    commit("resetControllerState");
  }
};

const mutations = {
  resetControllerState(state) {
    // acquire initial state
    const s = initialControllerState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  },
  updateDriver(state, { trainid, grabid }) {
    state.driverProperties.trainID = trainid;
    state.driverProperties.grabID = grabid;
  },
  updateRoutingTable(state, routingtable) {
    state.routingTable = routingtable;
  },
  updateControllerRouteRequestArray(state, routeRequestArray) {
    state.controllerRouteRequestArray = routeRequestArray;
  }
};

export const controller = {
  namespaced: true,
  state,
  actions,
  mutations
};
