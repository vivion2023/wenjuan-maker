import { useStore } from "vuex";
import { PageInfoType } from "@/store/pageInfoStore";
import { computed } from "vue";

export function useGetPageInfo() {
  const store = useStore();
  return {
    pageInfo: computed(() => store.state.pageStore),
    title: computed(() => store.state.pageStore.title),
    isPublished: computed(() => store.state.pageStore.isPublished),
    desc: computed(() => store.state.pageStore.desc),
    css: computed(() => store.state.pageStore.css),
    js: computed(() => store.state.pageStore.js),
  };
}
