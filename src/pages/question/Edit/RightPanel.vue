<template>
  <Tabs v-model:activeKey="activeKey">
    <Tabs.TabPane :key="TAB_KEY.property">
      <template #tab>
        <span>
          <FileTextOutlined />
          属性
        </span>
      </template>
      <ComponentProps />
    </Tabs.TabPane>
    <Tabs.TabPane :key="TAB_KEY.page">
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
import { useGetComponentInfo } from "@/hooks/useGetComponentInfo";
import { ref, watch } from "vue";
const { selectedId } = useGetComponentInfo();

enum TAB_KEY {
  property = "property",
  page = "page",
}
// 根据selectedId判断切换哪个tab
const activeKey = ref(TAB_KEY.page);

watch(selectedId, (newVal) => {
  if (newVal) {
    activeKey.value = TAB_KEY.property;
  } else {
    activeKey.value = TAB_KEY.page;
  }
});
</script>

<style scoped lang="scss"></style>
