<template>
  <Form :model="props" layout="vertical">
    <FormItem label="标题" name="title" required>
      <Input v-model:value="props.title" />
    </FormItem>
    <FormItem label="Placeholder" name="placeholder">
      <Input v-model:value="props.placeholder" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { Form, Input, FormItem } from "ant-design-vue";
import { QuestionInputPropsType, QuestionInputDefaultProps } from "./interface";
import { ref, watch } from "vue";

// 定义传入的 props 类型
type QuestionInputProps = QuestionInputPropsType;

const props = withDefaults(
  defineProps<QuestionInputProps>(),
  QuestionInputDefaultProps
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
