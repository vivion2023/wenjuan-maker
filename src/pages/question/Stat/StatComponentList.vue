<template>
  <div class="canvas">
    <div
      v-for="item in visibleComponentList"
      :key="item.fe_id"
      class="component-wrapper"
      :class="{ selected: selectedComponentId === item.fe_id }"
      @click="handleComponentClick(item)"
    >
      <div class="component-container">
        <component
          v-if="getComponentType(item.type)"
          :is="getComponentType(item.type)"
          v-bind="item.props"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getComponentConfByType } from "@/components/QuestionComponents";
import { useGetComponentInfo } from "@/hooks/useGetComponentInfo";

const props = defineProps<{
  selectedComponentId: string;
  selectedComponentType: string;
}>();

// 定义要发射的事件
const emit = defineEmits<{
  (e: "update:selectedComponentId", id: string): void;
  (e: "update:selectedComponentType", type: string): void;
}>();

const { componentList } = useGetComponentInfo();
const visibleComponentList = computed(() =>
  componentList.value.filter((c: any) => !c.isHidden)
);

// 处理组件点击事件
const handleComponentClick = (item: any) => {
  emit("update:selectedComponentId", item.fe_id);
  emit("update:selectedComponentType", item.type);
  console.log(item.fe_id, item.type);
};

// 这里只返回组件类型，不创建新实例
const getComponentType = (type: string) => {
  const conf = getComponentConfByType(type);
  if (!conf) return null;
  return conf.component;
};
</script>

<style scoped lang="scss">
@use "./StatComponentList.module.scss" as *;
</style>
