<template>
  <Layout>
    <LayoutHeader class="header">
      <Logo class="left"></Logo>
      <UserInfo class="right"></UserInfo>
    </LayoutHeader>
    <LayoutContent class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </LayoutContent>
    <LayoutFooter class="footer">
      vivion问卷项目&copy;2024.2 - present. Created by vivion
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
import Logo from "@/components/Logo.vue";
import UserInfo from "@/components/UserInfo.vue";

export default {
  components: {
    Layout,
    LayoutHeader,
    LayoutContent,
    LayoutFooter,
    Logo,
    UserInfo,
  },
};
</script>

<style scoped lang="scss">
@import "./MainLayout.module.scss";
</style>
