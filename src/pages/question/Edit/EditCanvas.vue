<template>
  <div class="canvas">
    <div class="component-wrapper">
      <div class="component-container">
        <QuestionTitle />
      </div>
    </div>
    <div class="component-wrapper">
      <div class="component-container">
        <QuestionInput />
      </div>
    </div>
  </div>
</template>

<script setup>
import QuestionTitle from "@/components/QuestionComponents/QuestionTitle/QuestionTitle.vue";
import QuestionInput from "@/components/QuestionComponents/QuestionInput/QuestionInput.vue";
</script>

<style scoped lang="scss">
@use "./EditCanvas.module.scss" as *;
</style>
