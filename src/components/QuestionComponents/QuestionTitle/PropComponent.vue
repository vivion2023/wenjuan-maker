<template>
  <Form :model="formData" layout="vertical">
    <FormItem label="标题内容" name="title" required>
      <Input v-model:value="formData.title" />
    </FormItem>
    <FormItem label="层级" name="level">
      <Select
        v-model:value="formData.level"
        :options="options"
        :default-value="1"
      />
    </FormItem>
    <FormItem name="isCenter" valuePropName="checked">
      <Checkbox v-model:checked="formData.isCenter">居中显示</Checkbox>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Form, Input, FormItem, Checkbox, Select } from "ant-design-vue";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";
import { defineProps, withDefaults } from "vue";

// 定义传入的 props 类型
type QuestionTitleProps = QuestionTitlePropsType;

const props = withDefaults(
  defineProps<QuestionTitleProps>(),
  QuestionTitleDefaultProps
);

const options = ref([
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
]);

const formData = ref<QuestionTitlePropsType>(props);

// 监听props变化，更新表单数据
watch(
  () => props,
  (newProps) => {
    formData.value = { ...newProps };
  },
  { deep: true }
);
</script>
