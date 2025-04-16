<template>
  <div v-if="isPublished">
    <p v-if="loading" style="text-align: center; margin-top: 24px">
      <Spin />
    </p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>Stat Page</p>
  </div>
  <div v-else>
    <Result status="warning" title="该页面未发布">
      <template #extra>
        <Button type="primary" @click="() => router.back()"> 返回 </Button>
      </template>
    </Result>
  </div>
</template>

<script setup>
import { useLoadQuestionData } from "@/hooks/useLoadQuestionData";
import { useRoute, useRouter } from "vue-router";
import { Spin, Button, Result } from "ant-design-vue";
import { useGetPageInfo } from "@/hooks/useGetPageInfo";
import { useStore } from "vuex";
import { watch } from "vue";
const route = useRoute();
const router = useRouter();
const store = useStore();
const { loading } = useLoadQuestionData(route.params.id);
const { isPublished, title } = useGetPageInfo();
console.log(isPublished, title);

watch(title, (newVal) => {
  if (newVal) {
    document.title = `问卷统计 - ${newVal}`;
  }
});
</script>

<style scoped></style>
