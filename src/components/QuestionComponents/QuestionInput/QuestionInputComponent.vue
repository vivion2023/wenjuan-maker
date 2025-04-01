<template>
  <div>
    <Paragraph strong>{{ title }}</Paragraph>
    <el-input :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { Input, Typography } from "ant-design-vue";
import { QuestionInputDefaultProps, QuestionInputPropsType } from "./interface";
import { withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<QuestionInputPropsType>(),
  QuestionInputDefaultProps
);

const { title, placeholder } = props;

const { Paragraph } = Typography;
</script>
