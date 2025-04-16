import { useStore } from "vuex";
import { PageInfoType } from "@/store/pageInfoStore";
import { computed } from "vue";

export function useGetPageInfo() {
  const store = useStore();
  return {
    pageInfo: computed(() => store.state.pageStore),
    isPublished: computed(() => store.state.pageStore.isPublished),
    title: computed(() => store.state.pageStore.title),
  };
}
