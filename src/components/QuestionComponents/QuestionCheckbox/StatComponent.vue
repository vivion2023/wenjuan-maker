<template>
  <div>
    <div class="chart-container">
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
  nextTick,
} from "vue";
import { Typography } from "ant-design-vue";
const { Title } = Typography;

import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { QuestionCheckboxStatPropsType } from "./interface";
import { useResizeObserver } from "@vueuse/core";

const props = defineProps<{
  stat?: QuestionCheckboxStatPropsType;
}>();

const categoryData = computed(() => {
  return props.stat?.map((item) => item.name) || [];
});

const valueData = computed(() => {
  return props.stat?.map((item) => item.value) || [];
});

echarts.use([
  BarChart,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: any = null;

const renderChart = () => {
  if (
    chartRef.value &&
    chartRef.value.clientWidth &&
    chartRef.value.clientHeight
  ) {
    if (!chartInstance) {
      chartInstance = echarts.init(chartRef.value);
    }
    chartInstance.setOption(getOption());
  }
};

useResizeObserver(chartRef, () => {
  renderChart();
});

const getOption = () => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    xAxis: {
      type: "category",
      data: categoryData.value,
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "统计",
        type: "bar",
        radius: "40%",
        data: valueData.value,
        // emphasis: {
        //   itemStyle: {
        //     shadowBlur: 10,
        //     shadowOffsetX: 0,
        //     shadowColor: "rgba(0, 0, 0, 0.5)",
        //   },
        // },
      },
    ],
  };
};

onMounted(() => {
  // 等待 DOM 渲染完成
  nextTick(() => {
    renderChart();
  });
});

// 监听 stat 变化（如果父组件切换了组件类型/数据）
watch(
  () => props.stat,
  () => {
    nextTick(() => {
      renderChart();
    });
  }
);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style scoped>
.title {
  margin-top: 0;
  margin-bottom: 10px;
}

.chart-container {
  width: 100%;
  height: 400px;
}
.chart {
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
</style>
