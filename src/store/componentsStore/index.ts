import { Module } from "vuex";
import { ComponentPropsType } from "@/components/QuestionComponents";
import { StateType } from "../index";
import { insertNewComponent, getNextSelectedId } from "./utils";
import { cloneDeep } from "lodash";
import { nanoid } from "nanoid";

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
  getters: {
    currentSelectedComponentId: (state) => state.selectedId,
  },
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
      const index = state.componentList.findIndex((c) => c.fe_id === fe_id);
      if (index !== -1) {
        // 创建组件的新副本并更新属性，确保Vue能检测到变化
        const component = { ...state.componentList[index] };
        component.props = {
          ...component.props,
          ...newProps,
        };
        // 替换数组中的组件对象，触发响应式更新
        state.componentList.splice(index, 1, component);
      }
    },
    DELETE_COMPONENT(state) {
      const selectedId = state.selectedId;
      const index = state.componentList.findIndex(
        (c) => c.fe_id === selectedId
      );
      if (index !== -1) {
        state.componentList.splice(index, 1);
        state.selectedId = "";
      }
    },
    HIDE_COMPONENT(state, payload: { fe_id: string; isHidden: boolean }) {
      const { fe_id } = payload;
      const index = state.componentList.findIndex((c) => c.fe_id === fe_id);
      if (index !== -1) {
        // 先获取下一个要选中的组件ID
        const nextSelectedId = getNextSelectedId(state, state.componentList);

        // 然后设置组件为隐藏
        state.componentList[index].isHidden = !payload.isHidden;

        // 最后更新选中的组件ID
        state.selectedId = nextSelectedId;
      }
    },
    LOCK_COMPONENT(state, payload: { fe_id: string; isLocked: boolean }) {
      const { fe_id } = payload;
      const index = state.componentList.findIndex((c) => c.fe_id === fe_id);
      if (index !== -1) {
        state.componentList[index].isLocked = !payload.isLocked;
      }
    },
    COPY_COMPONENT(state) {
      const selectedId = state.selectedId;
      const index = state.componentList.findIndex(
        (c) => c.fe_id === selectedId
      );
      if (index !== -1) {
        state.copiedComponent = cloneDeep(state.componentList[index]);
      }
    },
    PASTE_COMPONENT(state) {
      const { copiedComponent } = state;
      if (copiedComponent === null) return;
      // 创建深拷贝并生成新的 fe_id
      const newComponent = cloneDeep(copiedComponent);
      newComponent.fe_id = nanoid();
      insertNewComponent(state, newComponent);
      state.selectedId = newComponent.fe_id;
    },
    SELECT_PREVIOUS_COMPONENT(state) {
      const selectedId = state.selectedId;
      const index = state.componentList.findIndex(
        (c) => c.fe_id === selectedId
      );
      if (index <= 0) return;
      state.selectedId = state.componentList[index - 1].fe_id;
    },
    SELECT_NEXT_COMPONENT(state) {
      const selectedId = state.selectedId;
      const index = state.componentList.findIndex(
        (c) => c.fe_id === selectedId
      );
      if (index >= state.componentList.length - 1) return;
      state.selectedId = state.componentList[index + 1].fe_id;
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
    deleteComponent({ commit }) {
      commit("DELETE_COMPONENT");
    },
    hideComponent({ commit }, payload: { fe_id: string; isHidden: boolean }) {
      commit("HIDE_COMPONENT", payload);
    },
    lockComponent({ commit }, payload: { fe_id: string; isLocked: boolean }) {
      commit("LOCK_COMPONENT", payload);
    },
    copyComponent({ commit }) {
      commit("COPY_COMPONENT");
    },
    pasteComponent({ commit }) {
      commit("PASTE_COMPONENT");
    },
    selectPreviousComponent({ commit }) {
      commit("SELECT_PREVIOUS_COMPONENT");
    },
    selectNextComponent({ commit }) {
      commit("SELECT_NEXT_COMPONENT");
    },
  },
};

export default componentsModule;
