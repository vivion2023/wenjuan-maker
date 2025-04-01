<template>
  <div>
    <Title :level="3" :style="{ textAlign: 'center' }">{{ title }}</Title>
    <Paragraph :style="{ textAlign: 'center' }">{{ description }}</Paragraph>
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

const { title, description } = props;

const { Title, Paragraph } = Typography;
</script>
