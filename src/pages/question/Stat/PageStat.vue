<template>
  <div class="page-stat">
    <Title :level="3" class="title"
      >页面统计:{{ loading ? "加载中..." : total }}</Title
    >
    <div v-if="loading">
      <Spin />
    </div>
    <div v-else>
      <div class="list">
        <Table :dataSource="list" :columns="columns" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getQuestionStatListService } from "@/services/stat";
import { useRequest } from "@/hooks/useRequest";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { Typography, Table, Spin } from "ant-design-vue";
import { useGetComponentInfo } from "@/hooks/useGetComponentInfo";
const { Title } = Typography;
const route = useRoute();
const questionId = route.params.id as string;
const page = route.query.page as string;
const pageSize = route.query.pageSize as string;

const props = defineProps<{
  selectedComponentId: string;
}>();

// 定义事件发射
const emit = defineEmits<{
  (e: "update:selectedComponentId", id: string): void;
}>();

// 获取组件统计数据
const { data, loading, error, run } = useRequest(async () => {
  const data = await getQuestionStatListService(questionId, {
    page: page ? parseInt(page) : 1,
    pageSize: pageSize ? parseInt(pageSize) : 10,
  });
  return data;
});

run();

const total = computed(() => data.value?.total || 0);
const list = computed(() => data.value?.list || []);

// 获取组件列表
const { componentList } = useGetComponentInfo();

const columns = computed(() => {
  return componentList.value.map((c: any) => {
    const { title, fe_id, props: componentProps } = c;

    // 判断当前列是否为选中状态
    const isSelected = props.selectedComponentId === fe_id;

    return {
      title: componentProps.title || title,
      dataIndex: fe_id,
      customHeaderCell: () => {
        return {
          onClick: () => {
            handleHeaderClick(fe_id, componentProps.title || title);
          },
          style: {
            cursor: "pointer",
            // 根据是否选中设置不同颜色
            color: isSelected ? "#1890ff" : "inherit",
            // 可以添加其他选中样式
            fontWeight: isSelected ? "bold" : "normal",
          },
        };
      },
    };
  });
});

// 处理表头点击事件
const handleHeaderClick = (feId: string, title: string) => {
  console.log("点击了组件:", feId, title);
  // 发射事件更新父组件的selectedComponentId
  emit("update:selectedComponentId", feId);
};
</script>
