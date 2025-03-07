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
    <QuestionCard />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import ListSearch from "@/components/ListSearch.vue";
import { Typography } from "ant-design-vue";
const Title = Typography.Title;
import QuestionCard from "@/components/QuestionCard.vue";
export default {
  components: { ListSearch, Title, QuestionCard },
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
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./common.module.scss";
</style>
