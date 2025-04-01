<template>
  <Form :model="props" layout="vertical">
    <FormItem
      label="标题"
      name="title"
      required
      :label-col="{ span: 24 }"
      :wrapper-col="{ span: 24 }"
    >
      <el-input v-model="props.title" />
    </FormItem>
    <FormItem
      label="选项"
      name="options"
      :label-col="{ span: 24 }"
      :wrapper-col="{ span: 24 }"
    >
      <template v-for="(option, index) in options" :key="index">
        <el-input v-model="option.text" />
      </template>
      <el-link link type="primary" @click="addOption" style="margin: 0 auto"
        >+ 添加选项</el-link
      >
    </FormItem>
    <FormItem
      label="默认选中"
      name="defaultOption"
      :label-col="{ span: 24 }"
      :wrapper-col="{ span: 24 }"
    >
      <el-select placeholder="Select" size="large" style="width: 240px">
        <select-option
          v-for="option in options"
          :key="option.value"
          :label="option.value"
          :value="option.text"
        />
      </el-select>
    </FormItem>
    <FormItem label="竖向排列" name="isVertical">
      <Switch v-model="props.isVertical" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import {
  QuestionRadioPropsType,
  QuestionRadioDefaultProps,
  OptionType,
} from "./interface";
import { ref, withDefaults, defineProps } from "vue";
import {
  Form,
  Input,
  FormItem,
  Switch,
  Select,
  SelectOption,
} from "ant-design-vue";

const props = withDefaults(
  defineProps<QuestionRadioPropsType>(),
  QuestionRadioDefaultProps
);

const options = ref<OptionType[]>(props.options || []);

const addOption = () => {
  options.value.push({
    value: "item" + (options.value.length + 1),
    text: "选项" + (options.value.length + 1),
  });
};
</script>

<style scoped>
.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
