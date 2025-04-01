<template>
  <div>
    <Form :model="form" layout="vertical">
      <FormItem label="标题" name="title" required>
        <Input v-model="form.title" />
      </FormItem>
      <FormItem label="描述" name="description">
        <Input v-model="form.description" />
      </FormItem>
    </Form>
  </div>
</template>

<script setup>
import { Form, Input, FormItem } from "ant-design-vue";
import { QuestionInfoDefaultProps } from "./interface";
import { ref } from "vue";
const form = ref(QuestionInfoDefaultProps);
</script>
