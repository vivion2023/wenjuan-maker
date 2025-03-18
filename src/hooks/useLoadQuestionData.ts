// useLoadQuestionData 获取问卷数据
import { ResDataType } from "@/services/ajax";
import { getQuestionService } from "@/services/question";
import { ref } from "vue";
import { useRequest } from "./useRequest";

// 获取问卷数据
export function useLoadQuestionData(id: string) {
  const { data, loading, error, run } = useRequest(getQuestionService);

  // 加载问卷数据
  const load = async () => {
    await run(id);
  };

  return {
    question: data,
    loading,
    error,
    load,
  };
}
