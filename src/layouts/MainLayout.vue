<template>
  <Layout>
    <LayoutHeader class="header">MainLayout header</LayoutHeader>
    <LayoutContent class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </LayoutContent>
    <LayoutFooter class="footer">
      zono问卷项目&copy;2024.2 - present. Created by zono
    </LayoutFooter>
  </Layout>
</template>

<script>
import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
} from "ant-design-vue";

export default {
  components: { Layout, LayoutHeader, LayoutContent, LayoutFooter },
};
</script>

<style scoped lang="scss">
@import "./MainLayout.module.scss";
</style>
