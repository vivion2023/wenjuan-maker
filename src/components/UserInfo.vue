<template>
  <div class="user-info">
    <a @click="login">登录</a>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const login = () => {
  router.push("/login");
};
</script>

<style scoped lang="scss">
.user-info {
  display: inline-block;
  align-items: center;
}
</style>
