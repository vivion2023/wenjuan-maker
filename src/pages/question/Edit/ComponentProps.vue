<template>
  <component :is="genComponentByType(type)" v-bind="props" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { getComponentConfByType } from "@/components/QuestionComponents";

const store = useStore();

const currentSelectedId = computed(() => {
  // console.log(store.state.componentsStore.selectedId);
  return store.state.componentsStore.selectedId;
});

const type = computed(() => {
  // console.log(
  //   store.state.componentsStore.componentList.find(
  //     (c: any) => c.fe_id === currentSelectedId.value
  //   )?.type
  // );
  return (
    store.state.componentsStore.componentList.find(
      (c: any) => c.fe_id === currentSelectedId.value
    )?.type || ""
  );
});

const props = computed(() => {
  // console.log(
  //   store.state.componentsStore.componentList.find(
  //     (c: any) => c.fe_id === currentSelectedId.value
  //   )?.props
  // );
  return (
    store.state.componentsStore.componentList.find(
      (c: any) => c.fe_id === currentSelectedId.value
    )?.props || {}
  );
});

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
