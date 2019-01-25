const state = {
  sessionID: 0,
  driverProperties: [
    {
      grabID: -1,
      trainID: null,
      train_PeripheralArray: [],
      train_RouteRequestArray: []
    }
  ],
  trainProperties: [
    {
      train_IsPlaying: false,
      train_Speed: 0
    }
  ]
};

const actions = {
  updateDriverProps({ commit }, driverProperties) {
    commit("updateDriver", driverProperties);
  },
  updateSessionID({ commit }, sessionID) {
    commit("updateSession", sessionID);
  },
  updateTrainState({ commit }, trainProperties) {
    commit("updateTrain", trainProperties);
  }
};

const mutations = {
  updateDriver(state, driverProperties) {
    state.driverProperties = driverProperties;
  },
  updateSession(state, sessionID) {
    state.sessionID = sessionID;
  },
  updateTrain(state, trainProperties) {
    state.trainProperties = trainProperties;
  }
};

export const system = {
  namespaced: true,
  state,
  actions,
  mutations
};
