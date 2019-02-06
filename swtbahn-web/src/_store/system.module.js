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
  GetCurrentServerSessionId({ commit }) {
    Api()
      .post("admin/get-session-id")
      .then(response => {
        if (response.status == 200)
          commit("updateCurrentServerSession", response.data);
      })
      .catch(e => {
        console.error(e);
      });
  },
  //start server...
  StartServer({ dispatch, commit }) {
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
  ResetDriverProps({ commit }, { trainid, grabid }) {
    commit("updateDriver", { trainid, grabid });
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
            dispatch("alert/error", "Train already Grabbed", {
              root: true
            });
          } else {
            commit("updateDriver", { trainid, grabid });
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
