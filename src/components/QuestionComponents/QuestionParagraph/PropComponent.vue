<template>
  <Form :model="formData" layout="vertical" :disabled="disabled">
    <FormItem label="段落内容" name="content">
      <Input v-model:value="formData.content" @change="handleChange" />
    </FormItem>
    <FormItem name="isCenter" valuePropName="checked">
      <Checkbox v-model:checked="formData.isCenter" @change="handleChange"
        >居中显示</Checkbox
      >
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { Form, Input, FormItem, Checkbox } from "ant-design-vue";
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps,
} from "./interface";
import { defineProps, withDefaults, reactive, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = withDefaults(
  defineProps<QuestionParagraphPropsType>(),
  QuestionParagraphDefaultProps
);

const formData = reactive<QuestionParagraphPropsType>({
  ...props,
  disabled: props.disabled,
});

// 监听props变化，更新表单数据
watch(
  () => props,
  (newProps) => {
    formData.content = newProps.content;
    formData.isCenter = newProps.isCenter;
    formData.onChange = newProps.onChange;
    formData.disabled = newProps.disabled;
  },
  { deep: true }
);

const handleChange = () => {
  const fe_id = store.getters["componentsStore/currentSelectedComponentId"];
  const newProps = {
    content: formData.content,
    isCenter: formData.isCenter,
  };
  store.dispatch("componentsStore/updateComponentProps", {
    fe_id,
    newProps,
  });
};
</script>
