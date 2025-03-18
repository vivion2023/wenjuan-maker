<template>
  <div>
    <h2>Edit Page</h2>
    <p v-if="loading">loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>{{ JSON.stringify(question) }}</p>
  </div>
</template>

<script setup>
import { useLoadQuestionData } from "@/hooks/useLoadQuestionData";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { question, loading, load, error } = useLoadQuestionData(route.params.id);

onMounted(async () => {
  await load();
});
</script>

<style scoped></style>
