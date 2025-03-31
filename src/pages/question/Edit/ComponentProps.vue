<template>
  <component :is="genComponentByType(type)" />
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { getComponentConfByType } from "@/components/QuestionComponents";

const store = useStore();

const currentSelectedId = computed(() => {
  console.log(store.state.componentsStore.selectedId);
  return store.state.componentsStore.selectedId;
});

const type = computed(() => {
  console.log(
    store.state.componentsStore.componentList.find(
      (c: any) => c.fe_id === currentSelectedId.value
    )?.type
  );
  return (
    store.state.componentsStore.componentList.find(
      (c: any) => c.fe_id === currentSelectedId.value
    )?.type || ""
  );
});

const props = computed(() => {
  console.log(
    store.state.componentsStore.componentList.find(
      (c: any) => c.fe_id === currentSelectedId.value
    )?.props
  );
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

const genComponentByType = (type: string) => {
  const conf = getComponentConfByType(type);
  if (!conf) return null;
  return conf.PropComponent || null;
};

// const handlePropsChange = (newProps: any) => {
//   if (!currentSelectedId.value) return;

//   // 分发action到store
//   store.dispatch("componentsStore/changeComponentProps", {
//     fe_id: currentSelectedId.value,
//     newProps,
//   });
// };
</script>
