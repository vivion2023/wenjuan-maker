<template>
  <div class="container">
    <div class="header">Header</div>
    <div class="content">
      <div class="left">Left</div>
      <div class="main">
        <div class="canvas-wrapper">
          <QuestionTitle />
          <QuestionInput />
        </div>
      </div>
      <div class="right">Right</div>
    </div>
  </div>
</template>

<script setup>
import QuestionTitle from "@/components/QuestionComponents/QuestionTitle/QuestionTitle.vue";
import QuestionInput from "@/components/QuestionComponents/QuestionInput/QuestionInput.vue";
</script>

<style scoped lang="scss">
@use "./index.module.scss" as *;
</style>
