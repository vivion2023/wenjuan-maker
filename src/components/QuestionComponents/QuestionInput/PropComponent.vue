<template>
  <Form :model="formData" layout="vertical" :disabled="disabled">
    <FormItem label="标题" name="title" required>
      <Input v-model:value="formData.title" @change="handleChange" />
    </FormItem>
    <FormItem label="Placeholder" name="placeholder">
      <Input v-model:value="formData.placeholder" @change="handleChange" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { Form, Input, FormItem } from "ant-design-vue";
import { QuestionInputPropsType, QuestionInputDefaultProps } from "./interface";
import { watch, withDefaults, defineProps, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();

// 定义传入的 props 类型
type QuestionInputProps = QuestionInputPropsType;

const props = withDefaults(
  defineProps<QuestionInputProps>(),
  QuestionInputDefaultProps
);

// 使用 reactive 存储内部状态
const formData = reactive<QuestionInputPropsType>({
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
