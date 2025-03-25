<template>
  <Form :model="form" layout="vertical">
    <FormItem label="标题内容" name="title">
      <Input v-model="form.title" />
    </FormItem>
    <FormItem label="层级" name="level">
      <Select
        v-model="form.level"
        :options="[
          { label: 1, value: 1 },
          { label: 2, value: 2 },
          { label: 3, value: 3 },
        ]"
      />
    </FormItem>
    <FormItem name="isCenter" valuePropName="checked">
      <Checkbox>居中显示</Checkbox>
    </FormItem>
  </Form>
</template>

<script setup>
import { Form, Input, FormItem, Checkbox } from "ant-design-vue";
import { QuestionTitleDefaultProps } from "./interface";

const form = ref(QuestionTitleDefaultProps);
</script>
