<template>
  <div>
    <Paragraph
      :style="{
        margin: 0,
      }"
    >
      {{ content }}
    </Paragraph>
  </div>
</template>

<script setup lang="ts">
import { Typography } from "ant-design-vue";
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps,
} from "./interface";
import { defineProps, withDefaults } from "vue";

const { Paragraph } = Typography;
const props = withDefaults(
  defineProps<QuestionParagraphPropsType>(),
  QuestionParagraphDefaultProps
);

const { content } = props;
</script>
