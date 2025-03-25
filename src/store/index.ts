import { defineStore } from "pinia";
import componentsStore from "./componentsStore";
import { ComponentsStateType } from "./componentsStore/store";

export type StateType = {
  // user
  componentsStore: ComponentsStateType;
};

export const useStore = defineStore("store", {
  state: () => ({
    componentsStore: componentsStore,
  }),
});
