/**
 * @Description 从vuex中获取组件信息的hook
 * */

import { ComponentsStateType } from "@/store/componentsStore/store";
import { useStore } from "vuex";

function useGetComponentInfo() {
  const store = useStore();
  const {
    componentList = [],
    selectedId,
    copiedComponent,
  } = store.state.componentsStore as ComponentsStateType;

  // 根据selectedId获取选中的组件信息
  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);

  return { componentList, selectedId, selectedComponent, copiedComponent };
}

export default useGetComponentInfo;
