import Api from "./API";

function initialMonitorState() {
  return {
    /* .. initial state ... */
    trainArray: {},
    trainstateArray: {},
    signalArray: {},
    pointArray: {},
    segmentArray: {},
    monitorRequestInterval: 0
  };
}

const state = initialMonitorState;

const actions = {
  //start server...

  GetTrainsArray({ commit }) {
    var tempState = {
      "0": { grabbed: "no", trainid: "train1" },
      "1": { grabbed: "no", trainid: "train2" }
    };
    commit("updateTrainsArray", tempState);
    /* Api()
      .post("monitor/trains")
      .then(response => {
        if (response.status == 200) {
          commit("updateTrainsArray", response.data);
        }
      })
      .catch(e => {
        console.error(e);
      });*/
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
  GetTrainStateArray({ commit }, trainid) {
    var tempState = {
      "0": { dccspeed: "9", direction: "forward", ontrack: "yes" }
    };
    commit("updateTrainState", tempState);
    /*
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
      });*/
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

  updateTrainsArray(state, trainarray) {
    state.trainArray = trainarray;
  },
  updatePointsArray(state, pointarray) {
    state.pointArray = pointarray;
  },
  updateSegmentsArray(state, segmentarray) {
    state.segmentArray = segmentarray;
  },
  updateSignalsArray(state, signalarray) {
    state.signalArray = signalarray;
  },
  updateTrainState(state, trainstate) {
    state.trainstateArray = trainstate;
  }
};

export const monitor = {
  namespaced: true,
  state,
  actions,
  mutations
};
