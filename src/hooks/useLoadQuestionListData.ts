import { ref, computed } from "vue";
import { useRequest } from "./useRequest";
import { getQuestionListService } from "@/services/question";
import { LIST_SEARCH_PARAM_KEY } from "@/constant";

type OptionType = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
};

export function useLoadQuestionListData(options: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = options;
  const searchParams = ref(new URLSearchParams(window.location.search));

  // 使用 useRequest 获取数据
  const { data, loading, error, run } = useRequest(async () => {
    const keyword = searchParams.value.get(LIST_SEARCH_PARAM_KEY) || "";
    return await getQuestionListService({ keyword, isStar, isDeleted });
  });

  // 计算属性用于过滤列表
  const filteredList = computed(() => {
    const keyword = searchParams.value.get(LIST_SEARCH_PARAM_KEY) || "";
    return (
      data.value?.List.filter((item: any) => item.title.includes(keyword)) || []
    );
  });

  // 更新搜索参数的方法
  const updateSearchParams = (keyword: string) => {
    searchParams.value.set(LIST_SEARCH_PARAM_KEY, keyword);
    // 更新 URL
    window.history.pushState({}, "", `?${searchParams.value.toString()}`);
    run(); // 重新加载数据
  };

  return {
    data,
    loading,
    error,
    run,
    updateSearchParams,
    filteredList,
  };
}
