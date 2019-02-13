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

const state = {
  type: null,
  message: null
};

const actions = {
  success({ commit }, message) {
    commit("success", message);
  },
  error({ commit }, message) {
    commit("error", message);
  },
  clear({ commit }, message) {
    commit("clear", message);
  }
};

const mutations = {
  success(state, message) {
    state.type = "alert-success";
    state.message = message;
  },
  error(state, message) {
    state.type = "alert-danger";
    state.message = message;
  },
  clear(state) {
    state.type = null;
    state.message = null;
  }
};

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations
};
