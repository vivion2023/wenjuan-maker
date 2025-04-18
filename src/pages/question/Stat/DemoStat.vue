<template>
  <div>
    <div class="chart-container">
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Typography } from "ant-design-vue";
const { Title } = Typography;

import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

const props = defineProps<{
  data: any;
}>();

const pieData = props.data.stat.map((item: any) => ({
  name: item.name,
  value: item.count,
}));

echarts.use([
  PieChart,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);

const chartRef = ref(null);
let chartInstance: any = null;

const option = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "统计",
      type: "pie",
      radius: "50%",
      data: pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(option);
  }
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
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
