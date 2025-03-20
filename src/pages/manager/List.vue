<template>
  <div>
    <div class="header">
      <div class="left">
        <Title :level="2" style="margin-top: 0">我的问卷</Title>
      </div>
      <div class="right">
        <ListSearch @search="onSearch" />
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
import { useLoadQuestionListData } from "@/hooks/useLoadQuestionListData";
import { onMounted, computed, ref, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const Title = Typography.Title;

// 获取问卷列表
const { data, loading, error, run } = useLoadQuestionListData();
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

  // 从路由中获取当前的 page 和 pageSize
  const routePage = parseInt(route.query.page) || 1;
  const routePageSize = parseInt(route.query.pageSize) || 10;

  // 计算下一页
  const nextPage = routePage + 1;

  // 更新为下一页
  await updateSearchParams(searchParams.value.keyword, {
    page: nextPage,
    pageSize: routePageSize,
  });

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
  currentPage.value = route.query.page || 1;
  currentPageSize.value = route.query.pageSize || 10;
});

// 监听 haveMoreData 的变化
// 页面滚动时，如果还有更多数据，则添加滚动事件
// watch(haveMoreData, async () => {
//   if (haveMoreData.value) {
//     window.addEventListener("scroll", tryLoadMore);
//   } else {
//     window.removeEventListener("scroll", tryLoadMore);
//   }
// });

const onScroll = () => {
  const scrollElement = scrollRef.value;
  if (!scrollElement) return;

  // 可滚动容器的高度
  const scrollHeight = document.documentElement.scrollHeight;
  // 屏幕尺寸高度
  const clientHeight = window.innerHeight;
  // 可滚动容器超出当前窗口显示范围的高度
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop === 0) return;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    tryLoadMore();
  }
};

const debouncedOnScroll = debounce(onScroll, 200);

onMounted(async () => {
  router.replace({
    query: {
      keyword: searchParams.value.keyword,
      page: 1,
      pageSize: 10,
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
      page,
      pageSize,
    },
  });
  await run();
};

// 搜索方法 - 使用 updateSearchParams
const onSearch = (keyword) => {
  list.value = [];
  updateSearchParams(keyword, {
    page: 1,
    pageSize: currentPageSize.value,
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
