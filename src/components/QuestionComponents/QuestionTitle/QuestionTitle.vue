<template>
  <div>
    <Title
      :level="level"
      :style="{
        textAlign: isCenter ? 'center' : 'left',
        marginBottom: 0,
        fontSize: getFontSize,
      }"
    >
      {{ text }}
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

const { text, level, isCenter } = props;

const getFontSize = computed(() => {
  return level === 1 ? "24px" : level === 2 ? "20px" : "16px";
});
</script>

<style scoped lang="scss"></style>
