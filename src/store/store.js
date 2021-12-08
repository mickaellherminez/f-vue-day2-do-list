import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colorToolbar:'red',
    colorToolbarText: '',
    nameToolbar: '',
  },
  mutations: {
    updateColorToolbar(state, colorToolbar) {
      state.colorToolbar = colorToolbar
    },
    updateColorToolbarText(state, colorToolbarText) {
      state.colorToolbarText = colorToolbarText
    },
    updateNameToolbar(state, nameToolbar) {
      state.nameToolbar = nameToolbar
    },
  },
  modules: {

  },
});
