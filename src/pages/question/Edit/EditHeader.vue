<template>
  <div class="edit-header">
    <div class="header-left">
      <el-link type="primary" class="back-link"> &lt; 返回</el-link>
      <div class="title-container">
        <div v-if="isEditTitle" class="title-input">
          <Input
            v-model:value="pageInfo.title"
            size="large"
            @blur="isEditTitle = false"
          />
        </div>
        <div v-else class="title-display">
          <span class="title-text">{{ pageInfo.title }}</span>
          <el-icon :size="16" class="edit-icon" @click="isEditTitle = true">
            <Edit />
          </el-icon>
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
        :class="{ isLocked: isLocked }"
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
      <div class="header-mid-item" @click="handleCopy">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="复制"
          placement="bottom"
        >
          <el-icon><CopyDocument /></el-icon>
        </el-tooltip>
      </div>
      <div
        class="header-mid-item"
        @click="handlePaste"
        :class="{ disabled: !copiedComponent }"
      >
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
      <el-button :disabled="loading" class="action-button" @click="handleSave">
        <el-icon v-if="loading" :size="16" class="loading-icon"
          ><Loading
        /></el-icon>
        保存
      </el-button>
      <el-button type="primary" class="action-button">发布</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useGetComponentInfo } from "@/hooks/useGetComponentInfo";
import { useGetPageInfo } from "@/hooks/useGetPageInfo";
import { Input } from "ant-design-vue";
import { useRoute } from "vue-router";
import { useRequest } from "@/hooks/useRequest";
import { updateQuestionService } from "@/services/question";

const store = useStore();
const route = useRoute();
const pageInfo = useGetPageInfo();
const isEditTitle = ref(false);
const { selectedId, selectedComponent, copiedComponent } =
  useGetComponentInfo();
const { componentList } = useGetComponentInfo();
const isLocked = computed(() => {
  const component = selectedComponent.value;
  return component ? component.isLocked || false : false;
});

const isHidden = computed(() => {
  const component = selectedComponent.value;
  return component ? component.isHidden || false : false;
});

const handleDelete = () => {
  if (isLocked.value) return;
  store.dispatch("componentsStore/deleteComponent");
};

const handleHide = () => {
  if (isLocked.value) return;
  store.dispatch("componentsStore/hideComponent", {
    fe_id: selectedId.value,
    isHidden: isHidden.value,
  });
};

const handleLock = () => {
  store.dispatch("componentsStore/lockComponent", {
    fe_id: selectedId.value,
    isLocked: isLocked.value,
  });
};

const handleCopy = () => {
  if (isLocked.value) return;
  store.dispatch("componentsStore/copyComponent");
};

const handlePaste = () => {
  if (!copiedComponent.value) return;
  store.dispatch("componentsStore/pasteComponent");
};

// 保存
const { loading, run: save } = useRequest(
  async () => {
    const id = route.params.id;
    if (!id) return;
    await updateQuestionService(id, {
      ...pageInfo.value,
      componentList: componentList.value,
    });
  },
  {
    manual: true,
  },
  {
    onSuccess: () => {
      ElMessage.success("保存成功");
    },
    onError: () => {
      ElMessage.error("保存失败");
    },
  }
);

const handleSave = () => {
  save();
};
</script>

<style scoped lang="scss">
@use "./EditHeader.module.scss" as *;
</style>
