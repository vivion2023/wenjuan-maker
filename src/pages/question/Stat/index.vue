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
const route = useRoute();
</script>

<style scoped></style>
