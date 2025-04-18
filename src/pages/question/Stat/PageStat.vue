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
        <Table :dataSource="list" :columns="columns" :pagination="false" />
        <Pagination
          :total="total"
          :page-size="pageSize"
          :current="page"
          @change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getQuestionStatListService } from "@/services/stat";
import { useRequest } from "@/hooks/useRequest";
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import { Typography, Table, Spin, Pagination } from "ant-design-vue";
import { useGetComponentInfo } from "@/hooks/useGetComponentInfo";
import { STAT_PAGE_SIZE } from "@/constant";
const { Title } = Typography;
const route = useRoute();
const questionId = ref(route.params.id as string);
const page = ref(1);
const pageSize = ref(STAT_PAGE_SIZE);

const props = defineProps<{
  selectedComponentId: string;
  selectedComponentType: string;
}>();

// 定义事件发射
const emit = defineEmits<{
  (e: "update:selectedComponentId", id: string): void;
  (e: "update:selectedComponentType", type: string): void;
}>();

// 获取组件统计数据
const { data, loading, run } = useRequest(async () => {
  const data = await getQuestionStatListService(questionId.value, {
    page: page.value,
    pageSize: pageSize.value,
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
    const { title, fe_id, props: componentProps, type } = c;

    // 判断当前列是否为选中状态
    const isSelected = props.selectedComponentId === fe_id;

    return {
      title: componentProps.title || title,
      dataIndex: fe_id,
      type: type,
      customHeaderCell: () => {
        return {
          onClick: () => {
            handleHeaderClick(fe_id, type);
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

// 合并所有watch
watch(
  [questionId, page, pageSize],
  () => {
    run();
  },
  { immediate: true } // 添加immediate使组件挂载时就执行一次
);

// 处理表头点击事件
const handleHeaderClick = (feId: string, type: string) => {
  // 发射事件更新父组件的selectedComponentId
  emit("update:selectedComponentId", feId);
  emit("update:selectedComponentType", type);
};

// 修正分页处理函数
const handlePageChange = (newPage: number, newPageSize: number) => {
  page.value = newPage;
  pageSize.value = newPageSize;
};
</script>

<style scoped>
.title {
  margin-top: 0;
  margin-bottom: 10px;
}
</style>
