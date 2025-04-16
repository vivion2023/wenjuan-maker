<template>
  <div class="header-wrapper">
    <div class="header">
      <div class="left">
        <Space>
          <Button type="link" @click="() => router.back()">&lt; 返回</Button>
          <Title :level="3" class="title">{{ title }}</Title>
        </Space>
      </div>
      <div class="middle">
        <Space>
          <Input :value="url" style="width: 300px" ref="inputRef" />
          <el-tooltip
            content="复制链接"
            :enterable="false"
            :show-after="100"
            :hide-after="100"
          >
            <Button class="copy-btn" @click="handleCopy">
              <el-icon><CopyDocument /></el-icon>
            </Button>
          </el-tooltip>
        </Space>
      </div>
      <div class="right">
        <Button type="primary" @click="handleEdit">编辑问卷</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Space,
  Input,
  Button,
  Typography,
  Tooltip,
  message,
} from "ant-design-vue";
import { ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useGetPageInfo } from "@/hooks/useGetPageInfo";
import { useClipboard } from "@vueuse/core";
const { Title } = Typography;
const router = useRouter();
const { title } = useGetPageInfo();
const route = useRoute();

const id = route.params.id;
const handleEdit = () => {
  router.push(`/question/edit/${id}`);
};

const url = ref(`https://localhost:3000/question/stat/${id}`);
const inputRef = ref(null);

// 复制链接
const { copy } = useClipboard();

const handleCopy = () => {
  copy(url.value);
  message.success("复制成功");

  nextTick(() => {
    if (inputRef.value && inputRef.value.input) {
      inputRef.value.input.select();
    }
  });
};
</script>

<style scoped lang="scss">
@use "./StatHeader.module.scss" as *;
</style>
