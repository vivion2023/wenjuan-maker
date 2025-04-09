/*
 * @description: 获取问卷数据
 */
import { ResDataType } from "@/services/ajax";
import { getQuestionService } from "@/services/question";
import { ref, onMounted, watch } from "vue";
import { useRequest } from "./useRequest";
import { useStore } from "vuex";

// 获取问卷数据
export function useLoadQuestionData(id: string) {
  const store = useStore();
  const { data, loading, error, run } = useRequest(async () => {
    const data = await getQuestionService(id);
    return data;
  });

  // 加载数据并更新 store
  const loadData = async () => {
    await run();

    if (!data.value) return;

    const { title, desc, js, css, componentList = [] } = data.value;

    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; // 默认选中第一个组件
    }

    // 在 Vuex 中 dispatch action
    store.dispatch("componentsStore/resetComponents", {
      selectedId,
      componentList,
      copiedComponent: null,
    });

    store.dispatch("pageStore/resetPageInfo", {
      title,
      desc,
      js,
      css,
    });
  };

  onMounted(() => {
    loadData();
  });

  // 当 id 变化时重新加载数据
  watch(
    () => id,
    () => {
      loadData();
    },
    { immediate: false }
  );

  return {
    data,
    loading,
    error,
    reload: loadData, // 提供重新加载数据的方法
  };
}
