<template class="component-lib">
  <Menu
    class="component-lib-list"
    mode="inline"
    :selectedKeys="[]"
    @click="handleMenuClick"
  >
    <!-- 文本显示 -->
    <Menu.ItemGroup
      v-for="group in componentConfGroup"
      :key="group.groupId"
      :title="group.groupName"
    >
      <Menu.Item v-for="component in group.components" :key="component.type">
        <component :is="component.component" />
      </Menu.Item>
    </Menu.ItemGroup>
  </Menu>
</template>

<script setup>
import { Menu } from "ant-design-vue";
import { useStore } from "vuex";
import { componentConfGroup } from "@/components/QuestionComponents";

const store = useStore();

// 处理组件点击
const handleMenuClick = (item) => {
  // 处理组件的添加逻辑
  console.log("添加组件:", item.key);
};
</script>

<style scoped lang="scss">
@use "./ComponentLib.module.scss" as *;
</style>
