<template>
  <div>
    <h2>Home</h2>
    <button @click="() => router.push('/login')">登录</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Home",
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>

<style scoped></style>
