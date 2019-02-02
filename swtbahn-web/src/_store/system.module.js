import Api from "./API";
import appConfig from "../../config/appConfig";

function initialState() {
  return {
    /* .. initial state ... */
    sessionID: 0,
    driverProperties: { grabID: -1, trainID: null },
    trainProperties: { train_IsPlaying: false, train_Speed: 0 },
    trainPeripheralArray: {},
    trainRouteRequestArray: {},
    systemRequestInterval: 0
  };
}

const state = initialState;

const actions = {
  //start server...
  StartServer({ dispatch, commit }) {
    Api()
      .post("admin/startup")
      .then(response => {
        commit("updateSession", response.data);
        if (response.status == 200) {
          dispatch("alert/success", "Started", {
            root: true
          });
          setTimeout(
            function() {
              dispatch("alert/clear", "", { root: true });
            }.bind(this),
            2000
          );
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
          commit("resetState");
          dispatch("alert/success", "Stopped", {
            root: true
          });
        }
        setTimeout(
          function() {
            dispatch("alert/clear", "", { root: true });
          }.bind(this),
          2000
        );
      })
      .catch(e => {
        console.error(e);
      });
  },

  updateDriverProps({ dispatch, commit }, trainid) {
    if (trainid != null) {
      let formData = new FormData();
      formData.append("train", trainid);
      Api()
        .post("driver/grab-train", formData)
        .then(response => {
          if (response.status == 200) {
            var sessionid = response.data.split(",")[0];
            commit("updateSession", sessionid);
            var grabid = response.data.split(",")[1];
            commit("updateDriver", { trainid, grabid });
            dispatch("alert/success", "Successfully Grabbed : " + trainid, {
              root: true
            });
          }
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      dispatch("alert/error", "No train has been selected", {
        root: true
      });
      setTimeout(
        function() {
          dispatch("alert/clear", e, { root: true });
        }.bind(this),
        2000
      );
    }
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
          dispatch("alert/success", "Succesfully released train", {
            root: true
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
          } else {
            commit("updateTrain", {
              isplaying: false,
              trainspeed: 0
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
  }
};

const mutations = {
  resetState(state) {
    // acquire initial state
    const s = initialState();
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
