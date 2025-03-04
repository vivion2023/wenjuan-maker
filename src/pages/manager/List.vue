<template>
  <div>
    <h1>问卷列表页</h1>
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
// import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  setup() {
    // const route = useRoute();
    // const keyword = route.query.keyword;
    // console.log("keyword", keyword);

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
    };
  },
};
</script>

<style scoped lang="scss">
@import "./List.module.scss";
</style>
