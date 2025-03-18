<template>
  <div>
    <h2>Edit:{{ id }}</h2>
  </div>
</template>

<script setup>
import { getQuestionService } from "@/services/question";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id || "mock-test-id";

onMounted(async () => {
  try {
    const data = await getQuestionService(id);
    console.log("获取到的随机问卷数据:", data);
  } catch (err) {
    console.error("请求失败:", err);
  }
});
</script>

<style scoped></style>
