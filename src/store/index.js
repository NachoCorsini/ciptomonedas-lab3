import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null,
  },
  getters: {
    getUserId(state) {
      return state.userId; // Devuelve el ID almacenado
    },
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id;
    },
  },
  actions: {
    saveUserId({ commit }, id) {
      commit('setUserId', id); // Acción para llamar a la mutación
    },
  },
  modules: {
  },
});
