<template>
  <Form :model="form" layout="vertical">
    <FormItem label="标题" name="title">
      <Input v-model="form.title" />
    </FormItem>
    <FormItem label="Placeholder" name="placeholder">
      <Input v-model="form.placeholder" />
    </FormItem>
  </Form>
</template>

<script setup>
import { Form, Input, FormItem } from "ant-design-vue";
import { QuestionInputDefaultProps } from "./interface";

const form = ref(QuestionInputDefaultProps);
</script>
