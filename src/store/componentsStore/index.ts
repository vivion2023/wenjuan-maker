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
    UPDATE_COMPONENT_PROPS(
      state,
      payload: { fe_id: string; newProps: ComponentPropsType }
    ) {
      const { fe_id, newProps } = payload;
      const component = state.componentList.find((c) => c.fe_id === fe_id);
      if (component) {
        // 更新组件的属性
        component.props = {
          ...component.props,
          ...newProps,
        };
      }
    },
  },
  actions: {
    resetComponents({ commit }, payload: ComponentsStateType) {
      commit("RESET_COMPONENTS", payload);
    },
    changeSelectedID({ commit }, payload: { selectedId: string }) {
      commit("CHANGE_SELECTID", payload);
    },
    updateComponentProps(
      { commit },
      payload: { fe_id: string; newProps: ComponentPropsType }
    ) {
      commit("UPDATE_COMPONENT_PROPS", payload);
    },
  },
};

export default componentsModule;
