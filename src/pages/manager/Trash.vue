<template>
  <div>
    <div class="header">
      <div class="left">
        <Title :level="2" style="margin-top: 0">回收站</Title>
      </div>
      <div class="right">
        <ListSearch @search="onSearch" />
      </div>
    </div>
    <div class="content">
      <div>
        <Space style="margin-bottom: 16px">
          <Button
            type="primary"
            :disabled="!selectedRowKeys.length"
            @click="handleRestore"
          >
            恢复
          </Button>
          <Button
            danger
            :disabled="!selectedRowKeys.length"
            @click="handleDelete"
          >
            彻底删除
          </Button>
        </Space>
      </div>
      <div>
        <Table
          :dataSource="List"
          :columns="columns"
          :row-selection="rowSelection"
          rowKey="_id"
        />
      </div>
    </div>
    <div class="footer">
      <ListPage
        :total="total"
        :current="current"
        :page-size="pageSize"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import ListSearch from "@/components/ListSearch.vue";
import { Typography, Button, Space, Table, Tag } from "ant-design-vue";
import { computed, ref, h, onMounted, watch } from "vue";
import QuestionCard from "@/components/QuestionCard.vue";
import { useLoadQuestionListData } from "@/hooks/useLoadQuestionListData";
import { LIST_PAGE_SIZE } from "@/constant";
import { useRoute } from "vue-router";
import ListPage from "@/components/ListPage.vue";

const Title = Typography.Title;

// 获取当前路由
const route = useRoute();
const query = route.query;

// 从路由参数中获取 page 和 pageSize
const currentPage = ref(parseInt(query.page) || 1);
const currentPageSize = ref(parseInt(query.pageSize) || LIST_PAGE_SIZE);
// 获取问卷列表，传递 isDeleted: true 参数
const { data, loading, run, updateSearchParams } = useLoadQuestionListData({
  isDeleted: true,
  page: currentPage.value,
  pageSize: currentPageSize.value,
});

const List = computed(() => data.value?.List || []);
const total = computed(() => data.value?.total || 0);
const current = computed(() => currentPage.value);
const pageSize = computed(() => currentPageSize.value);

onMounted(async () => {
  await run();
});

// 搜索方法 - 使用 updateSearchParams
const onSearch = (keyword) => {
  updateSearchParams(keyword);
};

// 表格列
const columns = ref([
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "是否发布",
    dataIndex: "isPublished",
    key: "isPublished",
    customRender: ({ text }) => {
      return h(
        Tag,
        {
          color: text ? "success" : "default",
        },
        () => (text ? "已发布" : "未发布")
      );
    },
  },
  {
    title: "答卷",
    dataIndex: "answerCount",
    key: "answerCount",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    key: "createdAt",
  },
]);

// 存储选中的行
const selectedRowKeys = ref([]);

// 勾选框选中逻辑
const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys) => {
    selectedRowKeys.value = keys;
  },
}));

// 恢复操作
const handleRestore = () => {
  store.commit("moveQuestion", selectedRowKeys.value);
};

// 彻底删除操作
const handleDelete = () => {
  store.commit("deleteQuestion", selectedRowKeys.value);
};

// 处理分页变化
const handlePageChange = (page, pageSize) => {
  // 修改 ref 的 value 属性
  currentPage.value = page;
  currentPageSize.value = pageSize;

  // 重新加载数据
  updateSearchParams("", {
    isStar: true,
    page,
    pageSize,
  });
};

// 监听路由变化
watch(route, (newRoute) => {
  // 修改 ref 的 value 属性
  currentPage.value = Number(newRoute.query.page) || 1;
  currentPageSize.value = Number(newRoute.query.pageSize) || LIST_PAGE_SIZE;
  run();
});
</script>

<style lang="scss" scoped>
@use "./common.module.scss" as *;
</style>
