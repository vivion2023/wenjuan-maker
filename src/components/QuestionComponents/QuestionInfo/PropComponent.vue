<template>
  <div>
    <Form :model="formData" layout="vertical" :disabled="disabled">
      <FormItem label="标题" name="title" required>
        <Input v-model:value="formData.title" @change="handleChange" />
      </FormItem>
      <FormItem label="描述" name="desc">
        <Textarea v-model:value="formData.desc" @change="handleChange" />
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, Input, Textarea } from "ant-design-vue";
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from "./interface";
import { watch, withDefaults, defineProps, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = withDefaults(
  defineProps<QuestionInfoPropsType>(),
  QuestionInfoDefaultProps
);

const formData = reactive<QuestionInfoPropsType>({
  title: props.title,
  desc: props.desc,
  onChange: props.onChange,
  disabled: props.disabled,
});

// 监听props变化，更新表单数据
watch(
  () => props,
  (newProps) => {
    formData.title = newProps.title;
    formData.desc = newProps.desc;
    formData.onChange = newProps.onChange;
    formData.disabled = newProps.disabled;
  },
  { deep: true }
);

const handleChange = () => {
  const fe_id = store.getters["componentsStore/currentSelectedComponentId"];
  const newProps = {
    title: formData.title,
    desc: formData.desc,
  };
  store.dispatch("componentsStore/updateComponentProps", {
    fe_id,
    newProps,
  });
};
</script>
