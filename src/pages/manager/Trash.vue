<template>
  <div>
    <div class="header">
      <div class="left">
        <Title :level="2" style="margin-top: 0">回收站</Title>
      </div>
      <div class="right">
        <ListSearch />
      </div>
    </div>
    <div class="content">
      <QuestionCard v-if="questionList.length" :questionList="questionList" />
      <div v-else class="empty-text">暂无数据</div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import ListSearch from "@/components/ListSearch.vue";
import { Typography } from "ant-design-vue";
import { computed } from "vue";
import QuestionCard from "@/components/QuestionCard.vue";

const Title = Typography.Title;
const store = useStore();

const questionList = computed(() =>
  store.state.questionList.filter((question) => question.isDeleted)
);
</script>

<style lang="scss" scoped>
@import "./common.module.scss";
</style>
