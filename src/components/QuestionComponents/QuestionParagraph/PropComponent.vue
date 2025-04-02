<template>
  <Form :model="formData" layout="vertical">
    <FormItem label="段落内容" name="content">
      <Input v-model:value="formData.content" />
    </FormItem>
    <FormItem name="isCenter" valuePropName="checked">
      <Checkbox v-model:checked="formData.isCenter">居中显示</Checkbox>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { Form, Input, FormItem, Checkbox } from "ant-design-vue";
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps,
} from "./interface";
import { defineProps, withDefaults, ref, watch } from "vue";

const props = withDefaults(
  defineProps<QuestionParagraphPropsType>(),
  QuestionParagraphDefaultProps
);

const formData = ref<QuestionParagraphPropsType>(props);

// 监听props变化，更新表单数据
watch(
  () => props,
  (newProps) => {
    formData.value = { ...newProps };
  },
  { deep: true }
);
</script>
