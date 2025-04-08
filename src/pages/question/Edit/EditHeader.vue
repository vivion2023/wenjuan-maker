<template>
  <div class="edit-header">
    <div class="header-left">
      <ElLink type="primary" class="back-link"> &lt; 返回</ElLink>
      <div class="title-container">
        <div v-if="isEditTitle" class="title-input">
          <ElInput
            v-model="title"
            size="large"
            placeholder="从叫资院取种"
            @blur="isEditTitle = false"
          />
        </div>
        <div v-else class="title-display">
          <span class="title-text">{{ title || "从叫资院取种" }}</span>
          <ElIcon :size="16" class="edit-icon" @click="isEditTitle = true">
            <Edit />
          </ElIcon>
        </div>
      </div>
    </div>
    <div class="header-mid">
      <div
        class="header-mid-item"
        :class="{ disabled: isLocked }"
        @click="handleDelete"
      >
        <el-tooltip
          class="box-item"
          effect="dark"
          content="删除"
          placement="bottom"
        >
          <el-icon><Delete /></el-icon>
        </el-tooltip>
      </div>
      <div
        class="header-mid-item"
        :class="{ disabled: isLocked }"
        @click="handleHide"
      >
        <el-tooltip
          class="box-item"
          effect="dark"
          content="隐藏"
          placement="bottom"
        >
          <el-icon><Hide /></el-icon>
        </el-tooltip>
      </div>
      <div
        class="header-mid-item"
        :class="{ disabled: isLocked }"
        @click="handleLock"
      >
        <el-tooltip
          class="box-item"
          effect="dark"
          content="锁定"
          placement="bottom"
        >
          <el-icon><Lock /></el-icon>
        </el-tooltip>
      </div>
      <div class="header-mid-item">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="复制"
          placement="bottom"
        >
          <el-icon><CopyDocument /></el-icon>
        </el-tooltip>
      </div>
      <div class="header-mid-item">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="粘贴"
          placement="bottom"
        >
          <el-icon><DocumentCopy /></el-icon>
        </el-tooltip>
      </div>
      <div class="header-mid-item">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="上移"
          placement="bottom"
        >
          <el-icon><ArrowUp /></el-icon>
        </el-tooltip>
      </div>
      <div class="header-mid-item">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="下移"
          placement="bottom"
        >
          <el-icon><ArrowDown /></el-icon>
        </el-tooltip>
      </div>
      <div class="header-mid-item">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="撤销"
          placement="bottom"
        >
          <el-icon><RefreshLeft /></el-icon>
        </el-tooltip>
      </div>
      <div class="header-mid-item">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="重做"
          placement="bottom"
        >
          <el-icon><RefreshRight /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="header-right">
      <ElButton class="action-button">保存</ElButton>
      <ElButton type="primary" class="action-button">发布</ElButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useGetComponentInfo } from "@/hooks/useGetComponentInfo";
const store = useStore();

const isEditTitle = ref(false);
const title = ref("");
const { selectedComponent } = useGetComponentInfo();
const isLocked = computed(() => {
  const component = selectedComponent.value;
  return component ? component.isLocked || false : false;
});

const handleDelete = () => {
  if (isLocked.value) return;
  store.dispatch("componentsStore/deleteComponent");
};

const handleHide = () => {
  if (isLocked.value) return;
  store.dispatch("componentsStore/hideComponent");
};

const handleLock = () => {
  store.dispatch("componentsStore/lockComponent");
};
</script>

<style scoped lang="scss">
@use "./EditHeader.module.scss" as *;
</style>
