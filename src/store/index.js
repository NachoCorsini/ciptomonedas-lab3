import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null,
    userEmail: null, // Agregar userEmail al estado
  },
  getters: {
    getUserId(state) {
      return state.userId; // Devuelve el ID almacenado
    },
    getUserEmail(state) {
      return state.userEmail; // Devuelve el email almacenado
    },
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id;
    },
    setUserEmail(state, email) {
      state.userEmail = email; // Agregar mutación para userEmail
    },
  },
  actions: {
    saveUserId({ commit }, id) {
      commit('setUserId', id);
    },
    saveUserEmail({ commit }, email) {
      commit('setUserEmail', email); // Acción para guardar el email
    },
  },
  modules: {},
});
