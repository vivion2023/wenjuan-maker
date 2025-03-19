<template>
  <div>
    <div class="header">
      <div class="left">
        <Title :level="2" style="margin-top: 0">星标问卷</Title>
      </div>
      <div class="right">
        <ListSearch @search="onSearch" />
      </div>
    </div>
    <div class="content">
      <div style="text-align: center">
        <Spin :spinning="loading"></Spin>
      </div>
      <QuestionCard v-if="total > 0" :questionList="list" />
      <div v-else-if="!loading" class="empty-text">暂无数据</div>
    </div>
    <div class="footer">
      <ListPage
        :total="total"
        :current="current"
        :page-size="pageSize"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import ListSearch from "@/components/ListSearch.vue";
import { Typography, Spin } from "ant-design-vue";
import QuestionCard from "@/components/QuestionCard.vue";
import { useLoadQuestionListData } from "@/hooks/useLoadQuestionListData";
import ListPage from "@/components/ListPage.vue";
import { onMounted, computed, watch, ref } from "vue";
import { LIST_PAGE_SIZE } from "@/constant";
import { useRoute } from "vue-router";

const Title = Typography.Title;

// 获取当前路由
const route = useRoute();
const query = route.query;

// 从路由参数中获取 page 和 pageSize
const currentPage = ref(parseInt(query.page) || 1);
const currentPageSize = ref(parseInt(query.pageSize) || LIST_PAGE_SIZE);

// 获取问卷列表，传递 isStar: true 参数
const { data, loading, run, updateSearchParams } = useLoadQuestionListData({
  isStar: true,
  page: currentPage.value,
  pageSize: currentPageSize.value,
});

// 使用计算属性处理数据
const list = computed(() => data.value?.List || []);
const total = computed(() => data.value?.total || 0);
const current = computed(() => currentPage.value);
const pageSize = computed(() => currentPageSize.value);

onMounted(async () => {
  await run();
});

// 搜索方法 - 使用 updateSearchParams
const onSearch = (keyword) => {
  updateSearchParams(keyword, {
    isStar: true,
    page: 1,
    pageSize: currentPageSize.value,
  });
  currentPage.value = 1;
};

const edit = (id) => {
  console.log("编辑问卷 ID:", id);
};

// 处理分页变化
const handlePageChange = (page, pageSize) => {
  // 修改 ref 的 value 属性
  currentPage.value = page;
  currentPageSize.value = pageSize;

  // 重新加载数据
  updateSearchParams("", {
    isStar: true,
    page,
    pageSize,
  });
};

// 监听路由变化
watch(route, (newRoute) => {
  // 修改 ref 的 value 属性
  currentPage.value = Number(newRoute.query.page) || 1;
  currentPageSize.value = Number(newRoute.query.pageSize) || LIST_PAGE_SIZE;
  run();
});
</script>

<style lang="scss" scoped>
@use "./common.module.scss";
</style>
