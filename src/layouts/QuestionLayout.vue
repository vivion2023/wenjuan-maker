<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import QuestionHeader from "@/pages/question/Edit/EditHeader.vue";
</script>

<style scoped></style>
