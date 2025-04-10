import { useStore } from "vuex";
import { PageInfoType } from "@/store/pageInfoStore";
import { computed } from "vue";

export function useGetPageInfo() {
  const store = useStore();
  const pageInfo = computed(() => store.state.pageStore);
  return pageInfo;
}
