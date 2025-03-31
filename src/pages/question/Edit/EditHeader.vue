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
      <div class="header-mid-item">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="删除"
          placement="bottom"
        >
          <el-icon><Delete /></el-icon>
        </el-tooltip>
      </div>
      <div class="header-mid-item">
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
import {
  ElLink,
  ElButton,
  ElInput,
  ElTitle,
  ElIcon,
  ElTooltip,
  ElPopover,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInputNumber,
  ElSelect,
  ElOption,
} from "element-plus";
import {
  Delete,
  Lock,
  CopyDocument,
  DocumentCopy,
  ArrowUp,
  ArrowDown,
  Edit,
} from "@element-plus/icons-vue";
import { ref } from "vue";

const isEditTitle = ref(false);
const title = ref("");
</script>

<style scoped lang="scss">
.edit-header {
  height: 60px;
  width: 100%;
  padding: 0 50px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;

  .header-left {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 40px;

    .back-link {
      font-size: 14px;
      line-height: 1;
    }

    .title-container {
      display: flex;
      align-items: center;
      margin-top: 0;

      .title-display {
        display: flex;
        align-items: center;
        line-height: 1;
        gap: 8px;

        .title-text {
          font-size: 16px;
          font-weight: 500;
          color: #1d2129;
          line-height: 1;
        }

        .edit-icon {
          cursor: pointer;
          color: #909399;
          margin-left: 4px;
          &:hover {
            color: #409eff;
          }
        }
      }

      .title-input {
        width: 300px;
        :deep(.el-input__inner) {
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
  }

  .header-mid {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .header-mid-item {
      cursor: pointer;
      width: 30px;
      height: 30px;
      padding: 6px;
      border-radius: 50%;

      &:hover {
        background-color: #dedede;
      }
    }
  }

  .header-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;

    .action-button {
      min-width: 80px;
    }
  }
}
</style>
