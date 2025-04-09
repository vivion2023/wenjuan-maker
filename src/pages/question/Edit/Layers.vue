<template>
  <div class="layers">
    <div
      class="layers-item"
      v-for="item in componentList"
      :key="item.fe_id"
      :class="{ isActive: activeId === item.fe_id }"
      @click.stop="handleSelect(item.fe_id)"
    >
      <span class="left">
        <template v-if="editingId !== item.fe_id">
          {{ item.title }}
        </template>
        <template v-else>
          <el-input v-model="item.title" />
        </template>
      </span>
      <span class="right">
        <el-icon
          class="icon"
          :class="{ isClick: item.isHidden }"
          @click.stop="handleHide(item.fe_id, item.isHidden)"
        >
          <Hide />
        </el-icon>
        <el-icon
          class="icon"
          :class="{ isClick: item.isLocked }"
          @click.stop="handleLock(item.fe_id, item.isLocked)"
        >
          <Lock />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useGetComponentInfo } from "@/hooks/useGetComponentInfo";
import { ref, onMounted, onUnmounted } from "vue";
const store = useStore();
const { componentList } = useGetComponentInfo();

const editingId = ref("");
const activeId = ref("");
// 处理document点击事件
const handleDocumentClick = () => {
  editingId.value = "";
  activeId.value = "";
};

// 组件挂载时添加事件监听
onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
});

const handleHide = (fe_id: string, isHidden: boolean) => {
  store.dispatch("componentsStore/hideComponent", {
    fe_id,
    isHidden,
  });
};

const handleLock = (fe_id: string, isLocked: boolean) => {
  store.dispatch("componentsStore/lockComponent", {
    fe_id,
    isLocked,
  });
};

const handleSelect = (fe_id: string) => {
  if (activeId.value === fe_id) {
    // 如果已经激活，则进入编辑模式
    editingId.value = fe_id;
  } else {
    // 第一次点击，只激活不编辑
    activeId.value = fe_id;
    editingId.value = "";
  }
  store.dispatch("componentsStore/changeSelectedID", { selectedId: fe_id });
};
</script>

<style lang="scss" scoped>
@use "./Layers.module.scss";
</style>
