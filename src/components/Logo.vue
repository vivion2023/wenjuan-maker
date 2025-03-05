<template>
  <div class="container" @click="handleClick">
    <Space>
      <Title>
        <FormOutlined />
      </Title>
      <Title>vivon 问卷</Title>
    </Space>
  </div>
</template>

<script>
import { FormOutlined } from "@ant-design/icons-vue";
import { Space, Typography } from "ant-design-vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { HOME_PATHNAME } from "@/router";

const Title = Typography.Title;

export default defineComponent({
  components: { FormOutlined, Space, Title },
  setup() {
    const router = useRouter();
    const handleClick = () => {
      router.push(HOME_PATHNAME);
    };
    return { handleClick };
  },
});
</script>

<style lang="scss" scoped>
@import "./Logo.module.scss";
</style>
