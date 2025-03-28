<template>
  <div class="container">
    <div class="header">Header</div>
    <div class="content">
      <div class="left">Left</div>
      <div class="main" @click="clearSelected">
        <div class="canvas-wrapper">
          <EditCanvas />
        </div>
      </div>
      <div class="right">Right</div>
    </div>
  </div>
</template>

<script setup>
import EditCanvas from "./EditCanvas.vue";
import { useStore } from "vuex";

const store = useStore();

const clearSelected = () => {
  store.commit("componentsStore/CHANGE_SELECTID", { selectedId: "" });
};
</script>

<style scoped lang="scss">
@use "./index.module.scss" as *;
</style>
