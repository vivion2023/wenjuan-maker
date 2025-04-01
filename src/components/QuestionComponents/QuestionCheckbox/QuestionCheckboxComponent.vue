<template>
  <Paragraph strong>{{ title }}</Paragraph>
  <CheckboxGroup v-model="checkbox">
    <template v-for="option in list" :key="option.value">
      <Checkbox :value="option.value">{{ option.text }}</Checkbox>
    </template>
  </CheckboxGroup>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps } from "vue";
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

const { title, list } = props;

const checkbox = ref(list);
</script>

<style scoped>
.title {
  margin: 0;
  margin-bottom: 10px;
}
</style>
