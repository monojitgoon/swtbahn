import nav from "../nav";

const getDefaultState = () => {
  return {
    navigationItems: nav.items
  };
};

// initial state
const state = getDefaultState();

const actions = {
  loadNavForUser({ commit }, user) {
    commit("loadNavForUserType", user);
  },
  resetStateVuex({ commit }) {
    commit("resetState");
  }
};

const mutations = {
  loadNavForUserType(state, user) {},
  resetState(state) {
    Object.assign(state, getDefaultState());
  }
};

export const system = {
  namespaced: true,
  state,
  actions,
  mutations
};
