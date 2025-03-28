<template>
  <Tabs>
    <Tabs.TabPane tab="组件库" key="component">
      <ComponentLib />
    </Tabs.TabPane>
    <Tabs.TabPane tab="图层" key="layer">图层</Tabs.TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import { Tabs } from "ant-design-vue";
import ComponentLib from "./ComponentLib.vue";
</script>

<style scoped lang="scss"></style>
