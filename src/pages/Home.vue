<template>
  <div class="container">
    <div class="info">
      <Title>问卷调查</Title>
      <Paragraph>已累计创建问卷100份，发布问卷90份，收到答卷900份</Paragraph>

      <div>
        <Button
          type="primary"
          @click="() => router.push(MANAGER_INDEX_PATHNAME)"
        >
          开始使用
        </Button>
      </div>
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
