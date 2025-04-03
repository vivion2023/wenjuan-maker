<template>
  <div>
    <Paragraph strong>{{ titleValue }}</Paragraph>
    <Input :placeholder="placeholderValue" />
  </div>
</template>

<script setup lang="ts">
import { Input, Typography } from "ant-design-vue";
import { QuestionInputDefaultProps, QuestionInputPropsType } from "./interface";
import { withDefaults, defineProps, computed } from "vue";

const props = withDefaults(
  defineProps<QuestionInputPropsType>(),
  QuestionInputDefaultProps
);

const titleValue = computed(() => props.title);
const placeholderValue = computed(() => props.placeholder);

const { Paragraph } = Typography;
</script>
