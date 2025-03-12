<template>
  <div>
    <div class="header">
      <div class="left">
        <Title :level="2" style="margin-top: 0">星标问卷</Title>
      </div>
      <div class="right">
        <ListSearch />
      </div>
    </div>
    <div class="content">
      <QuestionCard
        v-if="starQuestionList.length"
        :questionList="starQuestionList"
      />
      <div v-else class="empty-text">暂无数据</div>
    </div>
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
const starQuestionList = computed(() =>
  store.state.questionList.filter(
    (question) => question.isStar && !question.isDeleted
  )
);

const edit = (id) => {
  console.log("编辑问卷 ID:", id);
};
</script>

<style lang="scss" scoped>
@import "./common.module.scss";
</style>
