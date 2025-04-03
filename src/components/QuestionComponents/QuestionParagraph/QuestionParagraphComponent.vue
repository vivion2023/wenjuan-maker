<template>
  <div>
    <Paragraph
      :style="{
        margin: 0,
        textAlign: isCenterValue ? 'center' : 'left',
      }"
    >
      {{ contentValue }}
    </Paragraph>
  </div>
</template>

<script setup lang="ts">
import { Typography } from "ant-design-vue";
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps,
} from "./interface";
import { defineProps, withDefaults, computed } from "vue";

const { Paragraph } = Typography;
const props = withDefaults(
  defineProps<QuestionParagraphPropsType>(),
  QuestionParagraphDefaultProps
);

const contentValue = computed(() => props.content);
const isCenterValue = computed(() => props.isCenter);
</script>
