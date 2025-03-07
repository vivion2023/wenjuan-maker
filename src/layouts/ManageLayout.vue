<template>
  <div class="container">
    <div class="left">
      <Space direction="vertical">
        <Button type="primary" size="large" :icon="h(PlusOutlined)"
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
import { Button, Space, Divider } from "ant-design-vue";
import { h } from "vue";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style lang="scss" scoped>
@import "./ManageLayout.module.scss";
</style>
