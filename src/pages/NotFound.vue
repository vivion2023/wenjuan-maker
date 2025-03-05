<template>
  <div class="container">
    <Result
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <Button type="primary" @click="() => router.push(HOME_PATHNAME)">
          Back Home
        </Button>
      </template>
    </Result>
  </div>
</template>

<script>
import { Button, Result } from "ant-design-vue";
import { useRouter } from "vue-router";
import { HOME_PATHNAME } from "@/router";
export default {
  components: { Result, Button },
  setup() {
    const router = useRouter();
    return { router, HOME_PATHNAME };
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px - 66px);
}
</style>
