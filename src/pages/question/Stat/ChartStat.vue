<template>
  <div class="stat-container">
    <Title :level="3" class="title">图表统计</Title>
    <div v-if="loading">
      <Spin />
    </div>
    <div v-else>
      <div class="chart-container" v-if="selectedComponentId">
        <div v-if="!statComponent">
          <p>该组件不支持统计</p>
        </div>
        <div v-else>
          <component
            :is="statComponent"
            :key="selectedComponentId"
            :stat="data?.stat"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Typography, Spin } from "ant-design-vue";
import { useRequest } from "@/hooks/useRequest";
import { getComponentStatService } from "@/services/stat";
import { useRoute } from "vue-router";
import { computed, watch, ref, watchEffect } from "vue";
import { getComponentConfByType } from "@/components/QuestionComponents";

const { Title } = Typography;

const props = defineProps<{
  selectedComponentId: string;
  selectedComponentType: string;
}>();

const questionId = useRoute().params.id as string;

const { data, loading, run } = useRequest(async () => {
  const data = await getComponentStatService(
    questionId,
    props.selectedComponentId
  );

  return data ? data : { stat: [] };
});

if (props.selectedComponentId) {
  run();
}

const statComponent = computed(() => {
  return (
    getComponentConfByType(props.selectedComponentType)?.StatComponent || null
  );
});

watch(
  () => props.selectedComponentId,
  () => {
    if (props.selectedComponentId) {
      run();
    }
  }
);
</script>

<style scoped lang="scss">
.stat-container {
  width: 100%;
  height: 400px;
  background-color: #fff;

  .title {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .chart-container {
    width: 100%;
    height: 100%;
  }
}
</style>
