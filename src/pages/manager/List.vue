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
    <div v-for="question in questionList" :key="question.id" class="list-item">
      <strong>{{ question.title }}</strong>
      &nbsp;
      <span :style="{ color: question.isPublished ? 'green' : 'black' }">
        {{ question.isPublished ? "已发布" : "未发布" }}
      </span>
      &nbsp;
      <button @click="edit(question.id)">编辑问卷</button>
      <button @click="move(question.id)">删除问卷</button>
    </div>
    <button @click="add">添加问卷</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import ListSearch from "@/components/ListSearch.vue";
import { Typography } from "ant-design-vue";
const Title = Typography.Title;
export default {
  components: { ListSearch, Title },
  setup() {
    const store = useStore();
    const questionList = computed(() => store.state.questionList);
    const add = () => {
      store.commit("addQuestion");
    };
    const edit = (id) => {
      console.log("编辑问卷 ID:", id);
    };
    const move = (id) => {
      store.commit("moveQuestion", id);
    };
    return {
      questionList,
      edit,
      add,
      move,
      Title,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./common.module.scss";
</style>
