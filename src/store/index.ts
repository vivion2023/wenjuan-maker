import { createStore } from "vuex";
import { ComponentsStateType } from "./componentsStore/index";
import componentsModule from "./componentsStore";
import pageModule, { PageInfoType } from "./pageInfoStore";

export type StateType = {
  // user
  componentsStore: ComponentsStateType;
  pageStore: PageInfoType;
};

export const store = createStore({
  modules: {
    componentsStore: componentsModule,
    pageStore: pageModule,
  },
});

export default store;
