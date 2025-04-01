<template>
  <Paragraph strong>{{ title }}</Paragraph>
  <RadioGroup v-model="radio">
    <template v-for="option in options" :key="option.value">
      <Radio :value="option.value">{{ option.text }}</Radio>
    </template>
  </RadioGroup>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps } from "vue";
import { Typography, Radio, RadioGroup } from "ant-design-vue";
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from "./interface";
const { Paragraph } = Typography;

const props = withDefaults(
  defineProps<QuestionRadioPropsType>(),
  QuestionRadioDefaultProps
);

const { title, options } = props;

const radio = ref(props.defaultOption);
</script>

<style scoped>
.title {
  margin: 0;
  margin-bottom: 10px;
}
</style>
