<template>
  <div class="container">
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

const Title = Typography.Title;

export default defineComponent({
  components: { FormOutlined, Space, Title },
});
</script>

<style lang="scss" scoped>
@import "./Logo.module.scss";
</style>
