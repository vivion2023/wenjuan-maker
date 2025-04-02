<template>
  <div class="question-info">
    <Title class="title" :level="3" :style="{ textAlign: 'center' }">{{
      title
    }}</Title>
    <Paragraph :style="{ textAlign: 'center' }">{{ desc }}</Paragraph>
  </div>
</template>

<script setup lang="ts">
import { Typography } from "ant-design-vue";
import { QuestionInfoDefaultProps, QuestionInfoPropsType } from "./interface";
import { withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<QuestionInfoPropsType>(),
  QuestionInfoDefaultProps
);

const { title, desc } = props;
const { Title, Paragraph } = Typography;
</script>

<style scoped lang="scss">
.question-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  padding: 0;
  margin: 0;
}
</style>
