import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null,
    userEmail: null,
    userPassword: null,
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
    getUserEmail(state) {
      return state.userEmail;
    },
    getUserPassword(state) {
      return state.userPassword;
    }
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id;
    },
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setUserPassword(state, password) {
      state.userPassword = password;
    }
  },
  actions: {
    saveUserId({ commit }, id) {
      commit('setUserId', id);
    },
    saveUserEmail({ commit }, email) {
      commit('setUserEmail', email);
    },
    saveUserPassword({ commit }, password) {
      commit('setUserPassword', password);
    }
  },
  modules: {}
});
