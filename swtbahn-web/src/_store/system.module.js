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
import appConfig from "../../config/appConfig";

function initialSystemState() {
  return {
    /* .. initial state ... */
    sessionID: 0,
    currentServerSessionID: 0,
    driverProperties: { grabID: -1, trainID: null },
    trainProperties: { train_IsPlaying: false, train_Speed: 0 },
    trainPeripheralArray: {},
    trainRouteRequestArray: {},
    driverboardRequestInterval: 0,
    systemStatisticsRequestInterval: 0,
    systemTrackPanelRequestInterval: 0
  };
}

const state = initialSystemState;

const actions = {
  //start server...
  async StartServer({ dispatch, commit }) {
    Api()
      .post("admin/startup")
      .then(response => {
        commit("updateSession", response.data);
        if (response.status == 200) {
          commit("updateDriver", { trainid: null, grabid: -1 });
          /*  commit("resetSystemState");
          dispatch("monitor/resetMonitor", "", {
            root: true
          });
          dispatch("controller/resetController", "", { root: true });*/
          dispatch("alert/success", "Server Started", {
            root: true
          });
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  StopServer({ dispatch, commit }) {
    Api()
      .post("admin/shutdown")
      .then(response => {
        if (response.status == 200) {
          commit("resetSystemState");
          dispatch("monitor/resetMonitor", "", { root: true });
          dispatch("controller/resetController", "", { root: true });
          dispatch("alert/success", "Server Stopped", { root: true });
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  async GetCurrentServerSessionId({ dispatch, commit }, sessionid) {
    Api()
      .post("admin/get-session-id")
      .then(response => {
        if (response.status == 200) {
          var newSessionId = response.data;
          if (newSessionId == 0) {
            dispatch("StartServer");
          } else if (newSessionId != sessionid) {
            commit("updateSession", newSessionId);
            commit("updateDriver", { trainid: null, grabid: -1 });
          }
        }
        // commit("updateCurrentServerSession", response.data);
      })
      .catch(e => {
        console.error(e);
      });
  },
  updateDriverProps({ dispatch, commit }, trainid) {
    let formData = new FormData();
    formData.append("train", trainid);
    Api()
      .post("driver/grab-train", formData)
      .then(response => {
        if (response.status == 200) {
          var sessionid = response.data.split(",")[0];
          commit("updateSession", sessionid);
          var grabid = response.data.split(",")[1];
          if (grabid == -1) {
            commit("updateDriver", { trainid: null, grabid: -1 });
            dispatch("alert/error", "Train already Grabbed", {
              root: true
            });
          } else {
            commit("updateDriver", { trainid, grabid });
            dispatch("GetPeripheralsArray", trainid);
            dispatch("GetTrainStateArray", trainid);
            dispatch("alert/success", "Successfully Grabbed : " + trainid, {
              root: true
            });
          }
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  GetPeripheralsArray({ commit }, trainid) {
    let formData = new FormData();
    formData.append("train", trainid);
    Api()
      .post("monitor/train-peripherals", formData)
      .then(response => {
        if (response.status == 200) {
          commit("updatePeripheralsArray", response.data);
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  updateDriverPropsPostRelease({ dispatch, commit }, { sessionid, grabid }) {
    let formData = new FormData();
    formData.append("session-id", sessionid);
    formData.append("grab-id", grabid);
    Api()
      .post("driver/release-train", formData)
      .then(response => {
        if (response.status == 200) {
          commit("updateDriver", { trainid: null, grabid: -1 });
          dispatch("ResponseDataFeedback", {
            response_data: response.data,
            success_msg: "Released grabbed train"
          });
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  updateTrainProps({ commit }, { sessionid, grabid, speed }) {
    let formData = new FormData();
    formData.append("session-id", sessionid);
    formData.append("grab-id", grabid);
    formData.append("speed", speed);
    formData.append("track-output", appConfig.trackOutput);
    Api()
      .post("driver/set-dcc-train-speed", formData)
      .then(response => {
        if (response.status === 200) {
          if (speed > 0) {
            commit("updateTrain", {
              isplaying: true,
              trainspeed: speed
            });
            dispatch("ResponseDataFeedback", {
              response_data: response.data,
              success_msg: "DCC train speed set to " + speed
            });
          } else {
            commit("updateTrain", {
              isplaying: false,
              trainspeed: 0
            });
            dispatch("ResponseDataFeedback", {
              response_data: response.data,
              success_msg: "DCC train speed set to " + speed
            });
          }
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  updatePeripheralState(
    { dispatch },
    { sessionid, grabid, peripheralid, peripheralstate, trainid }
  ) {
    let formData = new FormData();
    formData.append("session-id", sessionid);
    formData.append("grab-id", grabid);
    formData.append("peripheral", peripheralid);
    formData.append("state", peripheralstate);
    formData.append("track-output", appConfig.trackOutput);

    Api()
      .post("driver/set-train-peripheral", formData)
      .then(response => {
        if (response.status == 200) {
          dispatch("ResponseDataFeedback", {
            response_data: response.data,
            success_msg: "Train peripheral " + peripheralid + " state changed"
          });
          dispatch("GetPeripheralsArray", trainid);
        }
      })
      .catch(e => {
        console.error(e);
      });
  },

  getSingleRouteRequest({ commit }, grabid) {
    let formData = new FormData();
    formData.append("grab-id", grabid);
    Api()
      .post("driver/get-route-request", formData)
      .then(response => {
        if (response.status == 200) {
          commit("updateSingleRouteRequestArray", response.data);
        }
      })
      .catch(e => {
        console.error(e);
      });
  },

  registerRouteRequest({ dispatch }, { sessionid, grabid, routerequest }) {
    let formData = new FormData();
    formData.append("session-id", sessionid);
    formData.append("grab-id", grabid);
    formData.append("startingsegment", routerequest.startingsegment);
    formData.append("endingsegment", routerequest.endingsegment);
    formData.append("controller", routerequest.controller);
    Api()
      .post("driver/set-route-request", formData)
      .then(response => {
        if (response.status == 200) {
          dispatch("getSingleRouteRequest", grabid);
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  ResponseDataFeedback({ dispatch, commit }, { response_data, success_msg }) {
    if (response_data == "invalid session id") {
      commit("updateSession", 0);
      commit("updateDriver", { trainid: null, grabid: -1 });
      dispatch("alert/error", "Session id was not valid anymore", {
        root: true
      });
    } else if (response_data == "invalid grab id") {
      commit("updateSession", 0);
      commit("updateDriver", { trainid: null, grabid: -1 });
      dispatch("alert/error", "Grab id was not valid", { root: true });
    } else {
      dispatch("alert/success", success_msg, {
        root: true
      });
    }
  }
};

const mutations = {
  resetSystemState(state) {
    // acquire initial state
    const s = initialSystemState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  },
  updateDriver(state, { trainid, grabid }) {
    state.driverProperties.trainID = trainid;
    state.driverProperties.grabID = grabid;
  },
  updateTrain(state, { isplaying, trainspeed }) {
    state.trainProperties.train_IsPlaying = isplaying;
    state.trainProperties.train_Speed = trainspeed;
  },
  updateSession(state, sessionid) {
    state.sessionID = sessionid;
  },
  updateCurrentServerSession(state, sessionid) {
    state.currentServerSessionID = sessionid;
  },
  updatePeripheralsArray(state, peripheralarray) {
    state.trainPeripheralArray = peripheralarray;
  },
  updateSingleRouteRequestArray(state, routeRequestArray) {
    state.trainRouteRequestArray = routeRequestArray;
  }
};

export const system = {
  namespaced: true,
  state,
  actions,
  mutations
};
