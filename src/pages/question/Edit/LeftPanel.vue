<template>
  <Tabs>
    <Tabs.TabPane key="component">
      <template #tab>
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      </template>
      <ComponentLib />
    </Tabs.TabPane>

    <Tabs.TabPane key="layer">
      <template #tab>
        <span>
          <BarsOutlined />
          图层
        </span>
      </template>
      图层
    </Tabs.TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons-vue";
import { Tabs } from "ant-design-vue";
import ComponentLib from "./ComponentLib.vue";
</script>

<style scoped>
:deep(.anticon) {
  margin-right: 4px;
}
</style>
