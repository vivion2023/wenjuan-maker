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
import { withDefaults, defineProps, computed } from "vue";
import { Typography, Checkbox, CheckboxGroup } from "ant-design-vue";
import {
  QuestionCheckboxPropsType,
  QuestionCheckboxDefaultProps,
} from "./interface";
const { Paragraph } = Typography;

const props = withDefaults(
  defineProps<QuestionCheckboxPropsType>(),
  QuestionCheckboxDefaultProps
);

const titleValue = computed(() => props.title);
const listValue = computed(() => props.list || []);
const isVerticalValue = computed(() => props.isVertical);

// 优先使用value作为选中值，如果没有则使用defaultOption
const checkboxValue = computed(() => props.value || props.defaultOption);
</script>

<style scoped>
.title {
  margin: 0;
  margin-bottom: 10px;
}
</style>
