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
    /* var tempRoute = {
      "0": {
        grabid: "0",
        endingsegment: "seg11",
        startingsegment: "seg11",
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
  updateControllerRouteRequestArray(state, routeRequestArray) {
    state.controllerRouteRequestArray = routeRequestArray.filter(
      route => route.controller !== "false"
    );
  }
};

export const controller = {
  namespaced: true,
  state,
  actions,
  mutations
};
