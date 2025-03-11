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
    <QuestionCard v-if="questionList.length" :questionList="questionList" />
    <div v-else class="empty-text">暂无数据</div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import ListSearch from "@/components/ListSearch.vue";
import { Typography } from "ant-design-vue";
import QuestionCard from "@/components/QuestionCard.vue";

const Title = Typography.Title;
const store = useStore();

// computed 属性
const questionList = computed(() =>
  store.state.questionList.filter((question) => !question.isDeleted)
);

// 方法定义
const add = () => {
  store.commit("addQuestion");
};

const edit = (id) => {
  console.log("编辑问卷 ID:", id);
};

const move = (id) => {
  store.commit("moveQuestion", id);
};
</script>

<style lang="scss" scoped>
@import "./common.module.scss";
</style>
