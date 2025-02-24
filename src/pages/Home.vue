<template>
  <div>
    <h2>Home</h2>
    <button @click="login">登录</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const login = () => {
      router.push("/login");
    };
    return {
      login,
    };
  },
};
</script>

<style scoped></style>
