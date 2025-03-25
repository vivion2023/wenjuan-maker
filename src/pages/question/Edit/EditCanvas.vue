<template>
  <div v-if="loading" style="text-align: center; margin-top: 24px">
    <Spin />
  </div>
  <div v-else class="canvas">
    <div class="component-wrapper">
      <div class="component-container">
        <QuestionTitleComponent />
      </div>
    </div>
    <div class="component-wrapper">
      <div class="component-container">
        <QuestionInputComponent />
        <div>
          <p>{{ JSON.stringify(data) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import QuestionTitleComponent from "@/components/QuestionComponents/QuestionTitle/QuestionTitleComponent.vue";
import QuestionInputComponent from "@/components/QuestionComponents/QuestionInput/QuestionInputComponent.vue";
import { Spin } from "ant-design-vue";
import { useLoadQuestionData } from "@/hooks/useLoadQuestionData";
import { useRoute } from "vue-router";

const route = useRoute();

const { data, loading, error, run } = useLoadQuestionData(route.params.id);
</script>

<style scoped lang="scss">
@use "./EditCanvas.module.scss" as *;
</style>
