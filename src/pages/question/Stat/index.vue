<template>
  <div>
    <h2>Stat Page</h2>
    <p v-if="loading">loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>{{ JSON.stringify(question) }}</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useLoadQuestionData } from "@/hooks/useLoadQuestionData";
import { onMounted } from "vue";

const route = useRoute();
const { question, loading, load, error } = useLoadQuestionData(route.params.id);

onMounted(async () => {
  await load();
});
</script>

<style scoped></style>
