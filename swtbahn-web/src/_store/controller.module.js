import Api from "./API";

function initialControllerState() {
  return {
    /* .. initial state ... */
    controllerRouteRequestArray: {},
    controllerRequestInterval: 0
  };
}

const state = initialControllerState;

const actions = {
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
  updateRouteRequest({ dispatch }, { sessionid, grabid, routerequest }) {
    let formData = new FormData();
    formData.append("session-id", sessionid);
    formData.append("grab-id", grabid);
    formData.append("startingsegment", routerequest.startingsegment);
    formData.append("endingsegment", routerequest.endingsegment);
    Api()
      .post("driver/set-route-request", formData)
      .then(response => {
        if (response.status == 200) {
          dispatch("GetControllerRouteRequest");
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
