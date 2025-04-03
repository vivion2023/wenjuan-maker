<template>
  <div>
    <Title
      :level="levelValue"
      :style="{
        textAlign: isCenterValue ? 'center' : 'left',
        margin: 0,
        fontSize: getFontSize,
      }"
    >
      {{ titleValue }}
    </Title>
  </div>
</template>

<script setup lang="ts">
import { Typography } from "ant-design-vue";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";
import { defineProps, withDefaults, computed } from "vue";

const { Title } = Typography;
const props = withDefaults(
  defineProps<QuestionTitlePropsType>(),
  QuestionTitleDefaultProps
);

// 使用computed属性从props中获取值，确保响应式更新
const titleValue = computed(() => props.title);
const levelValue = computed(() => props.level);
const isCenterValue = computed(() => props.isCenter);

const getFontSize = computed(() => {
  return levelValue.value === 1
    ? "24px"
    : levelValue.value === 2
      ? "20px"
      : "16px";
});
</script>

<style scoped lang="scss"></style>
