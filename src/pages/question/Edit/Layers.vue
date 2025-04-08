<template>
  <div class="layers">
    <div class="layers-item" v-for="item in componentList" :key="item.fe_id">
      <span class="left">
        {{ item.title }}
      </span>
      <span class="right">
        <el-icon
          class="icon"
          :class="{ isClick: item.isHidden }"
          @click="handleHide(item.fe_id, item.isHidden)"
        >
          <Hide />
        </el-icon>
        <el-icon
          class="icon"
          :class="{ isClick: item.isLocked }"
          @click="handleLock(item.fe_id, item.isLocked)"
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

const store = useStore();
const { componentList } = useGetComponentInfo();

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
</script>

<style lang="scss" scoped>
@import "./Layers.module.scss";
</style>
