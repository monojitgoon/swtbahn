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
    /* var tempState = {
      "0": { grabbed: "no", trainid: "train1" },
      "1": { grabbed: "no", trainid: "train2" }
    };
    commit("updateTrainsArray", tempState);*/
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
  GetTrainStateArray({ commit }, trainid) {
    /* var tempState = {
      "0": { dccspeed: "9", direction: "forward", ontrack: "yes" }
    };
    commit("updateTrainState", tempState);*/

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
  },
  resetMonitor({ commit }) {
    commit("resetMonitorState");
  }
};

const mutations = {
  resetMonitorState(state) {
    // acquire initial state
    const s = initialMonitorState();
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
