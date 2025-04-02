<template>
  <div class="question-textarea-component">
    <Paragraph strong>{{ title }}</Paragraph>
    <textarea class="textarea" :placeholder="placeholder"></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps } from "vue";
import { Typography } from "ant-design-vue";
import {
  QuestionTextareaPropsType,
  QuestionTextareaDefaultProps,
} from "./interface";

const { Paragraph } = Typography;

const props = withDefaults(
  defineProps<QuestionTextareaPropsType>(),
  QuestionTextareaDefaultProps
);

const { title, placeholder } = props;
</script>

<style scoped>
.question-textarea-component {
  padding: 0;
}

.title {
  margin: 0;
  margin-bottom: 10px;
}
.textarea {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 10px;
}
</style>
