<template>
  <div v-if="loading" style="text-align: center; margin-top: 24px">
    <Spin />
  </div>
  <div v-else class="canvas">
    <div
      v-draggable="[
        visibleComponentList,
        {
          animation: 150,
          ghostClass: 'ghost',
          dragClass: 'sortable-drag',
          onUpdate,
          onStart,
        },
      ]"
    >
      <div
        v-for="item in visibleComponentList"
        :key="item.fe_id"
        class="component-wrapper"
        :class="{
          selected: item.fe_id === selectedId,
          locked: item.isLocked,
        }"
        @click.stop="handleClick(item)"
        draggable="true"
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
  </div>
</template>

<script setup lang="ts">
import { Spin } from "ant-design-vue";
import { computed, watch, onUnmounted } from "vue";
import { useLoadQuestionData } from "@/hooks/useLoadQuestionData";
import { useRoute } from "vue-router";
import { getComponentConfByType } from "@/components/QuestionComponents";
import { useStore } from "vuex";
import { useGetComponentInfo } from "@/hooks/useGetComponentInfo";
import useBindCanvasKeyPress from "@/hooks/useBindCanvasKeyPress";
import { vDraggable } from "vue-draggable-plus";

const route = useRoute();
const store = useStore(); // 获取 store 实例

// 保存清理函数
const unbindKeyPress = useBindCanvasKeyPress();

const { data, loading, error } = useLoadQuestionData(route.params.id as string);

const { selectedId, componentList } = useGetComponentInfo();
const visibleComponentList = computed(() =>
  componentList.value.filter((c: any) => !c.isHidden)
);

// 监听 componentList 的变化，设置默认选中项
watch(
  visibleComponentList,
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

// 这里只返回组件类型，不创建新实例
const getComponentType = (type: string) => {
  const conf = getComponentConfByType(type);
  if (!conf) return null;
  return conf.component;
};

const handleClick = (item: any) => {
  store.dispatch("componentsStore/changeSelectedID", {
    selectedId: item.fe_id,
  });
};

// 组件卸载时清理
onUnmounted(() => {
  unbindKeyPress();
});

function onStart() {
  console.log("start");
}

function onUpdate(evt: any) {
  store.dispatch("componentsStore/moveComponent", {
    oldIndex: evt.oldIndex,
    newIndex: evt.newIndex,
  });
}

function onEnd() {
  console.log("end");
}
</script>

<style scoped lang="scss">
@use "./EditCanvas.module.scss" as *;
</style>
