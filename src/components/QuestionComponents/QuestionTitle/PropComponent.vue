<template>
  <Form :model="formData" layout="vertical" :disabled="disabled">
    <FormItem label="标题内容" name="title" required>
      <Input v-model:value="formData.title" @change="handleChange" />
    </FormItem>
    <FormItem label="层级" name="level">
      <Select
        v-model:value="formData.level"
        @change="handleChange"
        :options="options"
      />
    </FormItem>
    <FormItem name="isCenter" valuePropName="checked">
      <Checkbox v-model:checked="formData.isCenter" @change="handleChange"
        >居中显示</Checkbox
      >
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Form, Input, FormItem, Checkbox, Select } from "ant-design-vue";
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";
import { defineProps, withDefaults } from "vue";
import { useStore } from "vuex";
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

const formData = reactive<QuestionTitlePropsType>({
  title: props.title,
  level: props.level,
  isCenter: props.isCenter,
  onChange: props.onChange,
  disabled: props.disabled,
});

// 监听props变化，更新表单数据
watch(
  () => props,
  (newProps) => {
    formData.title = newProps.title;
    formData.level = newProps.level;
    formData.isCenter = newProps.isCenter;
    formData.onChange = newProps.onChange;
    formData.disabled = newProps.disabled;
  },
  { deep: true }
);

const store = useStore();

const handleChange = () => {
  const fe_id = store.getters["componentsStore/currentSelectedComponentId"];
  // 使用解构创建一个新对象，确保Vuex能检测到变化
  const newProps = {
    title: formData.title,
    level: formData.level,
    isCenter: formData.isCenter,
  };

  store.dispatch("componentsStore/updateComponentProps", {
    fe_id,
    newProps,
  });
};
</script>
