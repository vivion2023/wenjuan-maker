<template>
  <component
    :is="genComponentByType(type)"
    v-bind="props"
    :disabled="isLocked"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { getComponentConfByType } from "@/components/QuestionComponents";
import { useGetComponentInfo } from "@/hooks/useGetComponentInfo";

const store = useStore();

const { selectedComponent } = useGetComponentInfo();
const type = computed(() => selectedComponent.value?.type);
const props = computed(() => selectedComponent.value?.props);
const isLocked = computed(() => selectedComponent.value?.isLocked);

const currentSelectedId = computed(
  () => store.state.componentsStore.selectedId
);

// 获取组件配置信息
const componentConf = computed(() => {
  if (!type.value) return null;
  return getComponentConfByType(type.value) || null;
});

// 根据组件类型生成属性组件
const genComponentByType = (type: string) => {
  const conf = getComponentConfByType(type);
  if (!conf) return null;
  return conf.PropComponent || null;
};
</script>
