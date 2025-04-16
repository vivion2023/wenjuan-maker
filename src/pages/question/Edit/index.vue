<template>
  <div class="container">
    <div class="header">
      <EditHeader />
    </div>
    <div class="content">
      <div class="left">
        <LeftPanel />
      </div>
      <div class="main" @click="clearSelected">
        <div class="canvas-wrapper">
          <EditCanvas />
        </div>
      </div>
      <div class="right">
        <RightPanel />
      </div>
    </div>
  </div>
</template>

<script setup>
import EditCanvas from "./EditCanvas.vue";
import { useStore } from "vuex";
import LeftPanel from "./LeftPanel.vue";
import RightPanel from "./RightPanel.vue";
import EditHeader from "./EditHeader.vue";
import { useGetPageInfo } from "@/hooks/useGetPageInfo";
import { watch, computed } from "vue";
const store = useStore();
const { title } = useGetPageInfo();
const clearSelected = () => {
  store.commit("componentsStore/CHANGE_SELECTID", { selectedId: "" });
};

watch(title, (newVal) => {
  if (newVal) {
    document.title = `问卷编辑 - ${newVal}`;
  }
});
</script>

<style scoped lang="scss">
@use "./index.module.scss" as *;
</style>
