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
          :dataSource="questionList"
          :columns="columns"
          :row-selection="rowSelection"
          rowKey="_id"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ListSearch from "@/components/ListSearch.vue";
import { Typography, Button, Space, Table, Tag } from "ant-design-vue";
import { computed, ref, h, onMounted } from "vue";
import QuestionCard from "@/components/QuestionCard.vue";
import { useLoadQuestionListData } from "@/hooks/useLoadQuestionListData";

const Title = Typography.Title;

const { data, loading, run, updateSearchParams } = useLoadQuestionListData({
  isDeleted: true,
});
const questionList = computed(() => data.value?.List || []);
const total = computed(() => data.value?.total || 0);

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
</script>

<style lang="scss" scoped>
@use "./common.module.scss" as *;
</style>
