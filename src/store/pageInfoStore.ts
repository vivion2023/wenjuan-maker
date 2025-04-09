import { Module } from "vuex";
import { StateType } from "./index";

export type PageInfoType = {
  title: string;
  desc?: string;
  css?: string;
  js?: string;
  isPublished?: boolean;
};

export const INIT_STATE: PageInfoType = {
  title: "",
  desc: "",
  css: "",
  js: "",
  isPublished: false,
};

const pageModule: Module<PageInfoType, StateType> = {
  namespaced: true,
  state: INIT_STATE,
  mutations: {
    RESET_PAGE_INFO(state, payload: Partial<PageInfoType>) {
      state.title = payload.title || "";
      state.desc = payload.desc || "";
      state.css = payload.css || "";
      state.js = payload.js || "";
      state.isPublished = payload.isPublished || false;
    },
  },
  actions: {
    resetPageInfo({ commit }, payload: Partial<PageInfoType>) {
      commit("RESET_PAGE_INFO", payload);
    },
  },
};

export default pageModule;
