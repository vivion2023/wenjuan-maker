<template>
  <div class="page-setting">
    <Form layout="vertical">
      <FormItem label="问卷标题" required>
        <Input placeholder="输入问卷标题..." />
      </FormItem>
      <FormItem label="问卷描述">
        <Textarea placeholder="输入问卷描述..." />
      </FormItem>
      <FormItem label="样式代码">
        <Textarea placeholder="输入样式代码..." />
      </FormItem>
      <FormItem label="脚本代码">
        <Textarea placeholder="输入脚本代码..." />
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, Input, Textarea } from "ant-design-vue";
</script>
