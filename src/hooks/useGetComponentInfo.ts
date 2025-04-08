/**
 * @Description 从vuex中获取组件信息的hook
 * */

import {
  ComponentsStateType,
  ComponentInfoType,
} from "@/store/componentsStore/index";
import { computed } from "vue";
import { useStore } from "vuex";

export function useGetComponentInfo() {
  const store = useStore();

  // 使用 computed 包装所有从 store 获取的数据
  const componentList = computed(
    () => store.state.componentsStore.componentList
  );
  const selectedId = computed(() => store.state.componentsStore.selectedId);
  const copiedComponent = computed(
    () => store.state.componentsStore.copiedComponent
  );

  // 使用 computed 获取选中的组件
  const selectedComponent = computed(() => {
    const list = componentList.value;
    const id = selectedId.value;
    if (!list || !id) return null;
    return list.find((c: any) => c.fe_id === id) || null;
  });

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
}
