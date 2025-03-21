<template>
  <div>
    <div class="header">
      <div class="left">
        <Title :level="2" style="margin-top: 0">我的问卷</Title>
      </div>
      <div class="right">
        <ListSearch v-model="searchParams.keyword" @search="onSearch" />
      </div>
    </div>
    <div class="content" ref="scrollRef">
      <div style="text-align: center">
        <Spin :spinning="loading"></Spin>
      </div>
      <QuestionCard v-if="total > 0" :questionList="list" />
      <div v-else-if="!loading" class="empty-text">暂无数据</div>
    </div>
    <div class="footer">
      <p v-if="haveMoreData && !loading">上滑加载更多</p>
      <p v-else-if="!loading">没有更多数据了</p>
    </div>
  </div>
</template>

<script setup>
import ListSearch from "@/components/ListSearch.vue";
import { Typography, Spin } from "ant-design-vue";
import QuestionCard from "@/components/QuestionCard.vue";
import { useRequest } from "@/hooks/useRequest";
import { getQuestionListService } from "@/services/question";
import { onMounted, computed, ref, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const Title = Typography.Title;

// 使用计算属性处理数据
const list = ref([]);
const total = computed(() => data.value?.total || 0);
const scrollRef = ref(null);
const currentPage = ref(1);
const currentPageSize = ref(10);
const haveMoreData = computed(() => total.value > list.value.length);
const route = useRoute();
const router = useRouter();
const searchParams = ref({
  keyword: route.query.keyword || "",
});
// 使用 useRequest 获取数据
const { data, loading, error, run } = useRequest(async () => {
  const keyword = searchParams.value.keyword || "";
  const page = currentPage.value;
  const pageSize = currentPageSize.value;
  return await getQuestionListService({
    keyword,
    page,
    pageSize,
  });
});

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const tryLoadMore = async () => {
  if (!haveMoreData.value || loading.value) return;

  // 更新为下一页
  currentPage.value += 1;
  await run();

  if (data.value?.List) {
    list.value = [...list.value, ...data.value.List];
  }
};

// 监听 searchParams 的变化
// 页面加载时，或者url参数（keyword）变化时，重新加载数据
watch(searchParams, async () => {
  if (searchParams.value.keyword) {
    await tryLoadMore();
  }
  currentPage.value = 1;
});

// 滚动事件处理
const onScroll = () => {
  const scrollElement = scrollRef.value;
  if (!scrollElement) return;

  const domRect = scrollElement.getBoundingClientRect();
  if (!domRect) return;

  const { bottom } = domRect;
  if (bottom <= window.innerHeight) {
    tryLoadMore();
  }
};

const debouncedOnScroll = debounce(onScroll, 1000);

onMounted(async () => {
  currentPage.value = 1;
  router.replace({
    query: {
      keyword: searchParams.value.keyword,
    },
  });

  await run();
  list.value = data.value?.List || [];
  // 监听滚动事件
  window.addEventListener("scroll", debouncedOnScroll);
});

onUnmounted(() => {
  //关闭滚动事件
  window.removeEventListener("scroll", debouncedOnScroll);
});

const updateSearchParams = async (keyword, { page, pageSize }) => {
  searchParams.value.keyword = keyword;
  router.replace({
    query: {
      keyword,
    },
  });
  currentPage.value = page;
  currentPageSize.value = pageSize;
};

// 搜索方法 - 使用 updateSearchParams
const onSearch = (keyword) => {
  list.value = [];
  currentPage.value = 1;
  updateSearchParams(keyword, {
    page: currentPage.value,
    pageSize: currentPageSize.value,
  });
  run().then(() => {
    if (data.value?.List) {
      list.value = [...list.value, ...data.value.List];
    }
  });
};

// 方法定义
const add = () => {
  store.commit("addQuestion");
};

const edit = (id) => {
  console.log("编辑问卷 ID:", id);
};
</script>

<style lang="scss" scoped>
@use "./common.module.scss" as *;
</style>
