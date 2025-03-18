<template>
  <div class="container">
    <div class="left">
      <Space direction="vertical">
        <Button
          type="primary"
          size="large"
          :icon="h(PlusOutlined)"
          :disabled="loading"
          @click="handleCreateClick"
          >创建问卷</Button
        >
        <Divider dashed />
        <Button
          :type="$route.path.startsWith('/manager/list') ? 'default' : 'text'"
          size="large"
          :icon="h(BarsOutlined)"
          @click="() => router.push('/manager/list')"
        >
          我的问卷
        </Button>
        <Button
          :type="$route.path.startsWith('/manager/star') ? 'default' : 'text'"
          size="large"
          :icon="h(StarOutlined)"
          @click="() => router.push('/manager/star')"
          >星标问卷</Button
        >
        <Button
          :type="$route.path.startsWith('/manager/trash') ? 'default' : 'text'"
          size="large"
          :icon="h(DeleteOutlined)"
          @click="() => router.push('/manager/trash')"
          >回收站</Button
        >
      </Space>
    </div>
    <div class="right">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { Button, Space, Divider, message } from "ant-design-vue";
import { h, ref } from "vue";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { createQuestionService } from "@/services/question";

const router = useRouter();

// 使用 ref 定义响应式变量
const loading = ref(false);

const handleCreateClick = async () => {
  loading.value = true;
  try {
    const data = await createQuestionService();
    const { id } = data || {};
    if (id) {
      router.push(`/question/edit/${id}`);
      message.success("创建成功");
    }
  } catch (error) {
    console.error("创建问卷失败", error);
    message.error("创建失败");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
@use "./ManageLayout.module.scss" as *;
</style>
