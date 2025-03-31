<template>
  <div v-if="loading" style="text-align: center; margin-top: 24px">
    <Spin />
  </div>
  <div v-else class="canvas">
    <div
      v-for="item in componentList"
      :key="item.fe_id"
      class="component-wrapper"
      :class="{
        selected: item.fe_id === currentSelectedId,
      }"
      @click.stop="handleClick(item)"
    >
      <div class="component-container">
        <component
          v-if="genComponentByType(item.type)"
          :is="genComponentByType(item.type)"
          v-bind="item.props"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Spin } from "ant-design-vue";
import { computed, onMounted, watch, ref } from "vue";
import { useLoadQuestionData } from "@/hooks/useLoadQuestionData";
import { useRoute } from "vue-router";
import { getComponentConfByType } from "@/components/QuestionComponents";
import { useStore } from "vuex";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";

const route = useRoute();
const store = useStore(); // 获取 store 实例
const { selectedId } = useGetComponentInfo(); // 获取选中组件的 id

const { data, loading, error } = useLoadQuestionData(route.params.id as string);

const componentList = computed(() => {
  if (!data.value) return [];
  return data.value.componentList || [];
});

// 监听 componentList 的变化，设置默认选中项
watch(
  componentList,
  (list) => {
    if (list.length > 0 && !store.state.componentsStore.selectedId) {
      // 当列表不为空且没有选中项时，选中第一个组件
      store.dispatch("componentsStore/changeSelectedID", {
        selectedId: list[0].fe_id,
      });
    }
  },
  { immediate: true }
);

const currentSelectedId = computed(() => {
  return store.state.componentsStore.selectedId;
});

const genComponentByType = (type: string) => {
  const conf = getComponentConfByType(type);
  if (!conf) return null;
  return conf.component;
};
const handleClick = (item: any) => {
  store.dispatch("componentsStore/changeSelectedID", {
    selectedId: item.fe_id,
  });
};
</script>

<style scoped lang="scss">
@use "./EditCanvas.module.scss" as *;
</style>
