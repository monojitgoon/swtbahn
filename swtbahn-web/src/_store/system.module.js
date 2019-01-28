import Api from "./API";
import appConfig from "../../config/appConfig";

function initialState() {
  return {
    /* .. initial state ... */
    sessionID: 0,
    driverProperties: {
      grabID: -1,
      trainID: null
    },
    trainProperties: {
      train_IsPlaying: false,
      train_Speed: 0
    },
    trainCurrentState: null,
    train_Array: {},
    signal_Array: {},
    point_Array: {},
    segment_Array: {},
    train_PeripheralArray: {},
    train_RouteRequestArray: {},
    status: {}
  };
}

const state = initialState;

const actions = {
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
  GetTrainsArray({ commit }) {
    Api()
      .post("monitor/trains")
      .then(response => {
        if (response.status == 200) {
          commit("updateTrainsArray", response.data);
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  GetPointsArray({ commit }) {
    Api()
      .post("monitor/points")
      .then(response => {
        if (response.status == 200) {
          commit("updatePointsArray", response.data);
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  GetSegmentsArray({ commit }) {
    Api()
      .post("monitor/segments")
      .then(response => {
        if (response.status == 200) {
          commit("updateSegmentsArray", response.data);
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  GetSignalsArray({ commit }) {
    Api()
      .post("monitor/signals")
      .then(response => {
        if (response.status == 200) {
          commit("updateSignalsArray", response.data);
        }
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
          commit("grabFailure", e);
          dispatch("alert/error", e, {
            root: true
          });
          setTimeout(
            function() {
              dispatch("alert/clear", e, { root: true });
            }.bind(this),
            2000
          );
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
  updateTrainState({ commit }, trainid) {
    let formData = new FormData();
    formData.append("train", trainid);
    Api()
      .post("monitor/train-state", formData)
      .then(response => {
        if (response.status == 200) {
          commit("updateTrainState", response.data);
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
  updateTrainState(state, trainstate) {
    state.trainCurrentState = trainstate;
  },
  updateSession(state, sessionid) {
    state.sessionID = sessionid;
  },
  updateTrainsArray(state, trainarray) {
    state.train_Array = trainarray;
  },
  updatePointsArray(state, pointarray) {
    state.point_Array = pointarray;
  },
  updateSegmentsArray(state, segmentarray) {
    state.segment_Array = segmentarray;
  },
  updateSignalsArray(state, signalarray) {
    state.signal_Array = signalarray;
  },
  updatePeripheralsArray(state, peripheralarray) {
    state.train_PeripheralArray = peripheralarray;
  },
  grabFailure(state, error) {
    state.status = {};
  }
};

export const system = {
  namespaced: true,
  state,
  actions,
  mutations
};
