<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="left">
        <Space>
          <Button type="link" @click="() => router.back()">&lt; 返回</Button>
          <Title :level="3" class="title">{{ title }}</Title>
        </Space>
      </div>
      <div class="middle">middle</div>
      <div class="right">
        <Button type="primary" @click="handleEdit">编辑问卷</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Space, Button, Typography } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import { useGetPageInfo } from "@/hooks/useGetPageInfo";
const { Title } = Typography;
const router = useRouter();
const { title } = useGetPageInfo();
const route = useRoute();

const id = route.params.id;
const handleEdit = () => {
  router.push(`/question/edit/${id}`);
};
</script>

<style scoped lang="scss">
@use "./StatHeader.module.scss" as *;
</style>
