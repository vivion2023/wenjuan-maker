<template>
  <div class="container">
    <div class="info">
      <Title class="title">问卷调查 | 在线投票</Title>
      <Paragraph class="auto-typing">
        已累计创建问卷100份，发布问卷90份，收到答卷900份
      </Paragraph>
    </div>
    <div>
      <Button
        type="primary"
        size="large"
        @click="() => router.push(MANAGER_INDEX_PATHNAME)"
      >
        开始使用
      </Button>
    </div>
  </div>
</template>

<script setup>
import { Button, Typography } from "ant-design-vue";
import { useRouter } from "vue-router";
import { MANAGER_INDEX_PATHNAME } from "@/router";
const { Title, Paragraph } = Typography;
const router = useRouter();
</script>

<style lang="scss" scoped>
@import "./Home.module.scss";
</style>
