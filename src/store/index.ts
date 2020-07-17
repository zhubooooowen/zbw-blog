import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSignIn: 0,
    token:'',
    userInfo: {},
    isMobile: false
  },
  mutations: {
    changeIsSignIn (state, n) {
      state.isSignIn = n
    },
    setToken(state, val) {
      state.token = val
    },
    setUserInfo (state, val) {
      state.userInfo = val
    },
    setIsMobile (state, val) {
      state.isMobile = val
    },
  },
  actions: {
    changeIsSignIn({commit}, n) {
      commit('changeIsSignIn', n)
    },
    setToken({commit}, val) {
      commit('setToken', val)
    },
    setUserInfo({commit}, val) {
      commit('setUserInfo', val)
    }
  },
  modules: {}
});
