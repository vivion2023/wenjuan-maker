<template>
  <div class="logo">
    <FormOutlined />
    <span>vivon 问卷</span>
  </div>
</template>

<script>
import { FormOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { FormOutlined },
});
</script>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  gap: 10px;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}
</style>
