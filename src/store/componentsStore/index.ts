import { defineStore } from "pinia";
import { ComponentPropsType } from "@/components/QuestionComponents";
import { ActionTree, Module, MutationTree } from "vuex";
import { ComponentsStateType, INIT_STATE } from "./store";
import { StateType } from "../index";

const mutations: MutationTree<ComponentsStateType> = {
  RESET_COMPONENTS(state, payload: ComponentsStateType) {
    state.selectedId = payload.selectedId;
    state.componentList = payload.componentList;
    state.copiedComponent = payload.copiedComponent;
  },

  // 更多mutations...
};
// 类型化的actions
const actions: ActionTree<ComponentsStateType, StateType> = {
  resetComponents({ commit }, payload: ComponentsStateType) {
    commit("RESET_COMPONENTS", payload);
  },

  // 更多actions...
};

// 类型化的getters
// const getters: GetterTree<ComponentsStateType, RootState> = {
//   getSelectedComponent: (state) => {
//     return state.componentList.find(c => c.fe_id === state.selectedId) || null;
//   },

//   // 更多getters...
// };

// 导出类型化的模块
const componentsModule: Module<ComponentsStateType, StateType> = {
  namespaced: true,
  state: INIT_STATE,
  mutations,
  actions,
  // getters
};

export default {
  componentsModule,
};
