<template>
  <div class="container">
    <Title :level="3" class="title">图表统计</Title>
    <div v-if="loading">
      <Spin />
    </div>
    <div v-else>
      <DemoStat v-model:data="statData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Typography, Spin } from "ant-design-vue";
import { useRequest } from "@/hooks/useRequest";
import { getComponentStatService } from "@/services/stat";
import { useRoute } from "vue-router";
import { watch, ref } from "vue";
import DemoStat from "./DemoStat.vue";
const { Title } = Typography;

const props = defineProps<{
  selectedComponentId: string;
}>();

const questionId = useRoute().params.id as string;

const {
  data: statData,
  loading,
  run,
} = useRequest(async () => {
  const res = await getComponentStatService(
    questionId,
    props.selectedComponentId
  );
  return res;
});

run();
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 400px;
  background-color: #fff;

  .title {
    margin-top: 0;
    margin-bottom: 10px;
  }
}
</style>
