<template>
  <div class="container">
    <div class="info">
      <Title class="title">问卷调查 | 在线投票</Title>
      <Paragraph class="auto-typing">
        已累计创建问卷100份，发布问卷90份，收到答卷900份
      </Paragraph>
    </div>
    <div>
      <Button type="primary" size="large" @click="handleLogin">
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

// 判断是否登录
function handleLogin() {
  try {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      // 已登录，跳转到问卷管理页面
      router.push("/manager/List");
    } else {
      // 未登录，跳转到登录页面
      router.push("/login");
    }
  } catch (error) {
    console.error("登录跳转异常:", error);
    // 发生错误时默认跳转到登录页
    router.push("/login");
  }
}
</script>

<style lang="scss" scoped>
@use "./Home.module.scss" as *;
</style>
