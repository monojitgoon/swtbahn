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
import { userService } from "../_services";

const state = {
  all: {}
};

const actions = {
  getAll({ commit }) {
    commit("getAllRequest");

    userService
      .getAll()
      .then(
        users => commit("getAllSuccess", users),
        error => commit("getAllFailure", error)
      );
  },

  delete({ commit }, id) {
    commit("deleteRequest", id);

    userService
      .delete(id)
      .then(
        user => commit("deleteSuccess", id),
        error => commit("deleteSuccess", { id, error: error.toString() })
      );
  }
};

const mutations = {
  getAllRequest(state) {
    state.all = { loading: true };
  },
  getAllSuccess(state, users) {
    state.all = { items: users };
  },
  getAllFailure(state, error) {
    state.all = { error };
  },
  deleteRequest(state, id) {
    // add 'deleting:true' property to user being deleted
    state.all.items = state.all.items.map(user =>
      user.id === id ? { ...user, deleting: true } : user
    );
  },
  deleteSuccess(state, id) {
    // remove deleted user from state
    state.all.items = state.all.items.filter(user => user.id !== id);
  },
  deleteFailure(state, { id, error }) {
    // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    state.all.items = state.items.map(user => {
      if (user.id === id) {
        // make copy of user without 'deleting:true' property
        const { deleting, ...userCopy } = user;
        // return copy of user with 'deleteError:[error]' property
        return { ...userCopy, deleteError: error };
      }

      return user;
    });
  }
};

export const users = {
  namespaced: true,
  state,
  actions,
  mutations
};
