import { Module } from "vuex";
import {
  ComponentPropsType,
  ComponentStatPropsType,
} from "@/components/QuestionComponents";
import { StateType } from "../index";
import { insertNewComponent, getNextSelectedId } from "./utils";
import { cloneDeep, debounce } from "lodash";
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
  stat?: ComponentStatPropsType;
};

/**
 * @description 管理当前 数据列表 数据结构的type
 * */
export type ComponentsStateType = {
  selectedId: string; //记录选中的组件id
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
  history: Array<Array<ComponentInfoType>>; //历史记录
  historyIndex: number; //当前历史记录的索引
};

//默认状态
export const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
  history: [],
  historyIndex: -1,
};

// 在 componentsModule 对象外部创建防抖函数
const debouncedSaveHistory = debounce((commit, state) => {
  if (state.componentList.length > 0) {
    commit("SAVE_HISTORY");
  }
}, 500); // 500ms 的防抖时间，可根据需求调整

const componentsModule: Module<ComponentsStateType, StateType> = {
  namespaced: true,
  state: INIT_STATE,
  getters: {
    currentSelectedComponentId: (state) => state.selectedId,
    currentHistory: (state) => state.history[state.historyIndex],
    canUndo: (state) => state.history && state.historyIndex > 0,
    canRedo: (state) =>
      state.history && state.historyIndex < state.history.length - 1,
  },
  mutations: {
    RESET_COMPONENTS(state, payload: ComponentsStateType) {
      state.selectedId = payload.selectedId;
      state.componentList = payload.componentList;
      state.copiedComponent = payload.copiedComponent;
      state.history = payload.history;
      state.historyIndex = payload.historyIndex;
    },
    ADD_COMPONENT(state, payload: ComponentInfoType) {
      insertNewComponent(state, payload);
    },
    CHANGE_SELECTID(state, payload: { selectedId: string }) {
      state.selectedId = payload.selectedId;
    },

    // 历史记录
    SAVE_HISTORY(state) {
      if (!state.history) {
        state.history = [];
        state.historyIndex = -1;
      }

      // 如果当前历史位置不是最新，则清除当前位置之后的历史
      if (
        state.historyIndex >= 0 &&
        state.historyIndex < state.history.length - 1
      ) {
        state.history = state.history.slice(0, state.historyIndex + 1);
      }

      // 保存当前状态到历史
      state.history.push(cloneDeep(state.componentList));

      // 维护历史长度，避免过长
      if (state.history.length > 20) {
        state.history.shift();
        // 如果移除了最早的历史，索引需要调整
        state.historyIndex = Math.max(0, state.historyIndex - 1);
      } else {
        // 索引指向新增的历史
        state.historyIndex = state.history.length - 1;
      }
    },

    // 撤销
    UNDO(state) {
      if (state.history && state.historyIndex > 0) {
        state.historyIndex--;
        state.componentList = cloneDeep(state.history[state.historyIndex]);
      }
    },

    // 重做
    REDO(state) {
      if (state.history && state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        state.componentList = cloneDeep(state.history[state.historyIndex]);
      }
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
      const { fe_id, isHidden } = payload;
      const index = state.componentList.findIndex((c) => c.fe_id === fe_id);
      if (index !== -1) {
        // 更新组件的隐藏状态
        state.componentList[index].isHidden = !isHidden;

        // 获取下一个要选中的组件ID
        const nextSelectedId = getNextSelectedId(
          state,
          state.componentList,
          !isHidden
        );

        // 更新选中的组件ID
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
    MOVE_COMPONENT(state, payload: { oldIndex: number; newIndex: number }) {
      const { oldIndex, newIndex } = payload;
      const [movedItem] = state.componentList.splice(oldIndex, 1); // 先删除索引2的元素
      state.componentList.splice(newIndex, 0, movedItem); // 再插入到索引0
    },
  },
  actions: {
    resetComponents({ commit }, payload: ComponentsStateType) {
      commit("RESET_COMPONENTS", payload);
    },
    changeSelectedID({ commit }, payload: { selectedId: string }) {
      commit("CHANGE_SELECTID", payload);
    },
    initHistory({ commit, state }) {
      // 初始化数组
      if (!state.history) {
        state.history = [];
        state.historyIndex = -1;
      }
    },
    saveHistory({ commit, state }) {
      if (state.componentList.length > 0) {
        commit("SAVE_HISTORY");
      }
    },
    undo({ commit }) {
      commit("UNDO");
    },

    redo({ commit }) {
      commit("REDO");
    },
    updateComponentProps(
      { commit, state },
      payload: { fe_id: string; newProps: ComponentPropsType }
    ) {
      commit("UPDATE_COMPONENT_PROPS", payload);
      // 使用防抖版本保存历史
      debouncedSaveHistory(commit, state);
    },
    addComponent({ commit, dispatch }, payload: ComponentInfoType) {
      commit("ADD_COMPONENT", payload);
      dispatch("saveHistory");
    },
    deleteComponent({ commit, dispatch }) {
      commit("DELETE_COMPONENT");
      dispatch("saveHistory");
    },
    hideComponent(
      { commit, dispatch },
      payload: { fe_id: string; isHidden: boolean }
    ) {
      commit("HIDE_COMPONENT", payload);
      dispatch("saveHistory");
    },
    lockComponent(
      { commit, dispatch },
      payload: { fe_id: string; isLocked: boolean }
    ) {
      commit("LOCK_COMPONENT", payload);
      dispatch("saveHistory");
    },
    copyComponent({ commit }) {
      commit("COPY_COMPONENT");
    },
    pasteComponent({ commit, dispatch }) {
      commit("PASTE_COMPONENT");
      dispatch("saveHistory");
    },
    selectPreviousComponent({ commit }) {
      commit("SELECT_PREVIOUS_COMPONENT");
    },
    selectNextComponent({ commit }) {
      commit("SELECT_NEXT_COMPONENT");
    },
    moveComponent(
      { commit, dispatch },
      payload: { oldIndex: number; newIndex: number }
    ) {
      commit("MOVE_COMPONENT", payload);
      dispatch("saveHistory");
    },
  },
};

export default componentsModule;
