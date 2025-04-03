<template>
  <Form :model="formData" layout="vertical" :disabled="disabled">
    <FormItem label="标题" name="title">
      <Input v-model:value="formData.title" @change="handleChange" />
    </FormItem>
    <FormItem label="Placeholder" name="placeholder">
      <Textarea v-model:value="formData.placeholder" @change="handleChange" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive, withDefaults, defineProps, watch } from "vue";
import { Form, FormItem, Input, Textarea } from "ant-design-vue";
import {
  QuestionTextareaPropsType,
  QuestionTextareaDefaultProps,
} from "./interface";
import { useStore } from "vuex";

const store = useStore();

// 定义传入的 props 类型
type QuestionTextareaProps = QuestionTextareaPropsType;

const props = withDefaults(
  defineProps<QuestionTextareaProps>(),
  QuestionTextareaDefaultProps
);

// 使用 reactive 存储内部状态
const formData = reactive<QuestionTextareaPropsType>({
  title: props.title,
  placeholder: props.placeholder,
  onChange: props.onChange,
  disabled: props.disabled,
});

// 监听 props 的变化
watch(
  () => props,
  (newProps) => {
    formData.title = newProps.title;
    formData.placeholder = newProps.placeholder;
    formData.onChange = newProps.onChange;
    formData.disabled = newProps.disabled;
  },
  { deep: true } // 深度监听
);

const handleChange = () => {
  const fe_id = store.getters["componentsStore/currentSelectedComponentId"];
  const newProps = {
    title: formData.title,
    placeholder: formData.placeholder,
  };
  store.dispatch("componentsStore/updateComponentProps", {
    fe_id,
    newProps,
  });
};
</script>

<style scoped></style>
