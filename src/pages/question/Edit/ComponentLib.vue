<template class="component-lib">
  <Menu class="component-lib-list" mode="inline" :selectedKeys="[]">
    <Menu.ItemGroup
      v-for="group in componentConfGroup"
      :key="group.groupId"
      :title="group.groupName"
    >
      <Menu.Item
        v-for="component in group.components"
        :key="component.type"
        @click="handleMenuClick(component)"
      >
        <component :is="component.component" />
      </Menu.Item>
    </Menu.ItemGroup>
  </Menu>
</template>

<script setup>
import { Menu } from "ant-design-vue";
import { useStore } from "vuex";
import { componentConfGroup } from "@/components/QuestionComponents";
import { nanoid } from "nanoid";
const store = useStore();

// 处理组件点击
const handleMenuClick = (component) => {
  // 处理组件的添加逻辑
  const { title, type, props } = component;
  store.dispatch("componentsStore/addComponent", {
    fe_id: nanoid(),
    title,
    type,
    props,
  });
};
</script>

<style scoped lang="scss">
@use "./ComponentLib.module.scss" as *;
</style>
