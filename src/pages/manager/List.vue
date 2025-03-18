<template>
  <div>
    <div class="header">
      <div class="left">
        <Title :level="2" style="margin-top: 0">我的问卷</Title>
      </div>
      <div class="right">
        <ListSearch />
      </div>
    </div>
    <div class="content">
      <div style="text-align: center">
        <Spin :spinning="loading"></Spin>
      </div>
      <QuestionCard v-if="total > 0" :questionList="list" />
      <div v-else-if="!loading" class="empty-text">暂无数据</div>
    </div>
  </div>
</template>

<script setup>
import ListSearch from "@/components/ListSearch.vue";
import { Typography, Spin } from "ant-design-vue";
import QuestionCard from "@/components/QuestionCard.vue";
import { getQuestionListService } from "@/services/question";
import { useRequest } from "@/hooks/useRequest";
import { onMounted, computed } from "vue";
const Title = Typography.Title;

// 获取问卷列表
const { data, loading, error, run } = useRequest(getQuestionListService);
// 使用计算属性处理数据
const list = computed(() => data.value?.List || []);
const total = computed(() => data.value?.total || 0);

onMounted(async () => {
  await run();
});

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
