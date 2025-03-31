<template>
  <Form :model="formData" layout="vertical">
    <FormItem label="标题内容" name="title" required>
      <Input v-model:value="formData.title" />
    </FormItem>
    <FormItem label="层级" name="level">
      <Select v-model="formData.level" :options="options" :default-value="1" />
    </FormItem>
    <FormItem name="isCenter" valuePropName="checked">
      <Checkbox v-model:checked="formData.isCenter">居中显示</Checkbox>
    </FormItem>
  </Form>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { Form, Input, FormItem, Checkbox, Select } from "ant-design-vue";
import { QuestionTitleDefaultProps } from "./interface";

const props = defineProps({
  title: String,
  level: Number,
  isCenter: Boolean,
});

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

// const emit = defineEmits(["change"]);

// 创建表单数据，初始化为默认值
const formData = ref({ ...QuestionTitleDefaultProps });
console.log(formData.value);

// // 监听props变化，更新表单数据
// watch(
//   () => props,
//   (newProps) => {
//     // 只更新表单中存在的字段
//     const updatedData = {};
//     formData.value = { ...formData.value, ...updatedData };
//   },
//   { immediate: true, deep: true }
// );

// // 监听表单数据变化，触发change事件
// watch(
//   formData,
//   (newVal) => {
//     emit("change", { ...newVal });
//   },
//   { deep: true }
// );

// // 表单值变化时的处理函数
// const handleValuesChange = () => {
//   emit("change", { ...formData.value });
// };
</script>
