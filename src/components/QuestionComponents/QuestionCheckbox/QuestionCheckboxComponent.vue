<template>
  <Paragraph strong>{{ titleValue }}</Paragraph>
  <CheckboxGroup
    :value="checkboxValue"
    :style="{
      display: 'flex',
      flexDirection: isVerticalValue ? 'column' : 'row',
    }"
  >
    <Checkbox
      v-for="option in listValue"
      :key="option.value"
      :value="option.value"
    >
      {{ option.text }}
    </Checkbox>
  </CheckboxGroup>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { Typography, Checkbox, CheckboxGroup } from "ant-design-vue";
import {
  QuestionCheckboxPropsType,
  QuestionCheckboxDefaultProps,
} from "./interface";
const { Paragraph } = Typography;

const props = defineProps<QuestionCheckboxPropsType>();

// 使用默认值
const titleValue = computed(
  () => props.title || QuestionCheckboxDefaultProps.title
);
const listValue = computed(
  () => props.list || QuestionCheckboxDefaultProps.list
);
const isVerticalValue = computed(
  () => props.isVertical ?? QuestionCheckboxDefaultProps.isVertical
);

// 修正这一行，去掉不存在的 defaultOption
const checkboxValue = computed(() => props.value || []);
</script>

<style scoped>
.title {
  margin: 0;
  margin-bottom: 10px;
}
</style>
