import { Module } from "vuex";
import { ComponentPropsType } from "@/components/QuestionComponents";
import { ComponentsStateType, INIT_STATE } from "./store";
import { StateType } from "../index";

const componentsModule: Module<ComponentsStateType, StateType> = {
  namespaced: true,
  state: INIT_STATE,
  mutations: {
    RESET_COMPONENTS(state, payload: ComponentsStateType) {
      state.selectedId = payload.selectedId;
      state.componentList = payload.componentList;
      state.copiedComponent = payload.copiedComponent;
    },
    CHANGE_SELECTID(state, payload: { selectedId: string }) {
      state.selectedId = payload.selectedId;
    },
  },
  actions: {
    resetComponents({ commit }, payload: ComponentsStateType) {
      commit("RESET_COMPONENTS", payload);
    },
    changeSelectedID({ commit }, payload: { selectedId: string }) {
      commit("CHANGE_SELECTID", payload);
    },
  },
};

export default componentsModule;
