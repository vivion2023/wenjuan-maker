<template>
  <div>
    <Form :model="formData" layout="vertical">
      <FormItem label="标题" name="title" required>
        <Input v-model:value="formData.title" />
      </FormItem>
      <FormItem label="描述" name="desc">
        <Textarea v-model:value="formData.desc" />
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, Input, Textarea } from "ant-design-vue";
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from "./interface";
import { ref, watch, withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<QuestionInfoPropsType>(),
  QuestionInfoDefaultProps
);

const formData = ref({ ...props });
// 监听props变化，更新表单数据
watch(
  () => props,
  (newProps) => {
    formData.value = { ...newProps };
  },
  { deep: true }
);
</script>
