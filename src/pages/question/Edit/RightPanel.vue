<template>
  <Tabs>
    <Tabs.TabPane key="property">
      <template #tab>
        <span>
          <FileTextOutlined />
          属性
        </span>
      </template>
      <ComponentProps />
    </Tabs.TabPane>
    <Tabs.TabPane key="page">
      <template #tab>
        <span>
          <SettingOutlined />
          页面设置
        </span>
      </template>
      <PageSetting />
    </Tabs.TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import { Tabs } from "ant-design-vue";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons-vue";
import ComponentProps from "./ComponentProps.vue";
import PageSetting from "./PageSetting.vue";
</script>

<style scoped lang="scss"></style>
