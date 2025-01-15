import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null,
    userEmail: null,
   
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
    getUserEmail(state) {
      return state.userEmail;
    },
  
    
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id;
    },
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    
  },
  actions: {
    saveUserId({ commit }, id) {
      commit('setUserId', id);
    },
    saveUserEmail({ commit }, email) {
      commit('setUserEmail', email);
    },
    
    
  },
  modules: {},
});
