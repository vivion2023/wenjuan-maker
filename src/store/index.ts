import { createStore } from "vuex";
import { ComponentsStateType } from "./componentsStore/store";
import componentsModule from "./componentsStore";

export type StateType = {
  // user
  componentsStore: ComponentsStateType;
};

export const store = createStore({
  modules: {
    componentsStore: componentsModule,
  },
});

export default store;
