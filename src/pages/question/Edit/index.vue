<template>
  <div class="container">
    <div class="header">Header</div>
    <div class="content">
      <div class="left">Left</div>
      <div class="main">
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
</script>

<style scoped lang="scss">
@use "./index.module.scss" as *;
</style>
