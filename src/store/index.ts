import Vue from 'vue';
import Vuex, { StoreOptions, ActionContext, MutationPayload } from 'vuex';
import { Tool } from '@/model/types';
import Konva from 'konva';

Vue.use(Vuex);

interface State {
  selectedTool: Tool | undefined;
  stage: Konva.Stage | undefined;
  layer: Konva.Layer | undefined;
}
export default new Vuex.Store({
  state: {
    stage: undefined,
    layer: undefined,
    selectedTool: undefined,
    selectedItems: [],
    color: '#df4b26',
    size: 5,
  },
  mutations: {
    setStage: (state, payload) => {
      state.stage = payload;
    },
    setLayer: (state, payload) => {
      state.layer = payload;
    },
    setSelectedTool: (state, payload) => {
      state.selectedTool = payload;
    },
    setColor: (state, payload) => {
      state.color = payload;
    },
    setSize: (state, payload) => {
      state.size = payload;
    },
  },
  actions: {
    setStage({ commit, state }: ActionContext<State, State>, payload) {
      commit('setStage', payload);
    },
    setLayer({ commit }: ActionContext<State, State>, payload) {
      commit('setLayer', payload);
    },
    setSelectedTool({ commit, state }: ActionContext<State, State>, payload: Tool) {
      if (!state.stage) return;
      // Init stage events
      state.stage.off('mousedown touchstart mousemove touchmove mouseup touchend');
      const { action } = payload;
      action(state.stage, state.layer);
      commit('setSelectedTool', payload);
    },
    setColor({ commit }, payload) {
      commit('setColor', payload);
    },
    setSize({ commit }, payload) {
      commit('setSize', payload);
    },
  },
  getters: {
    isSelector(state) {
      return state.selectedTool;
    },
  },
  modules: {},
});
