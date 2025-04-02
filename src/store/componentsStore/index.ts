import { Module } from "vuex";
import { ComponentPropsType } from "@/components/QuestionComponents";
import { StateType } from "../index";
import { insertNewComponent } from "./utils";

/**
 * @description 每个组件都有的组件type
 * */
export type ComponentInfoType = {
  fe_id: string; //前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

/**
 * @description 管理当前 数据列表 数据结构的type
 * */
export type ComponentsStateType = {
  selectedId: string; //记录选中的组件id
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

//默认状态
export const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
};

const componentsModule: Module<ComponentsStateType, StateType> = {
  namespaced: true,
  state: INIT_STATE,
  mutations: {
    RESET_COMPONENTS(state, payload: ComponentsStateType) {
      state.selectedId = payload.selectedId;
      state.componentList = payload.componentList;
      state.copiedComponent = payload.copiedComponent;
    },
    ADD_COMPONENT(state, payload: ComponentInfoType) {
      insertNewComponent(state, payload);
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
    addComponent({ commit }, payload: ComponentInfoType) {
      commit("ADD_COMPONENT", payload);
    },
  },
};

export default componentsModule;
