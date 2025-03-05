<template>
  <div class="user-info">
    <a @click="() => router.push('/login')">登录</a>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>

<style scoped lang="scss">
.user-info {
  display: inline-block;
  align-items: center;
}
</style>
