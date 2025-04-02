<template>
  <Form :model="formData" layout="vertical">
    <FormItem label="标题" name="title">
      <Input v-model:value="formData.title" />
    </FormItem>
    <FormItem label="Placeholder" name="placeholder">
      <Textarea v-model:value="formData.placeholder" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, watch } from "vue";
import { Form, FormItem, Input, Textarea } from "ant-design-vue";
import {
  QuestionTextareaPropsType,
  QuestionTextareaDefaultProps,
} from "./interface";

// 定义传入的 props 类型
type QuestionTextareaProps = QuestionTextareaPropsType;

const props = withDefaults(
  defineProps<QuestionTextareaProps>(),
  QuestionTextareaDefaultProps
);
// 使用 ref 存储内部状态
const formData = ref({ ...props });
// console.log(formData.value);

// 监听 props 的变化
watch(
  () => props,
  (newProps) => {
    formData.value = { ...newProps }; // 更新内部状态
  },
  { deep: true } // 深度监听
);
</script>

<style scoped></style>
