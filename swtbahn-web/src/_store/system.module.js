import nav from "../nav";

const state = {
  navigationItems: nav.items
};

const actions = {
  loadNavForUser({ commit }, user) {
    alert(true);
    commit("loadNavForUserType", user);
  }
};

const mutations = {
  loadNavForUserType(state, user) {
    alert(true);
    if (user.userType == "Driver") {
      state.navigationItems.splice(2, 1);
    } else if (user.userType == "Monitor") {
      state.navigationItems.splice(3, 5);
    } else if (user.userType == "Stellwerk") {
      state.navigationItems.splice(2, 4);
    }
  }
};

export const system = {
  namespaced: true,
  state,
  actions,
  mutations
};
