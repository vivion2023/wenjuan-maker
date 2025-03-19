<template>
  <Pagination
    :total="total"
    :page-size="pageSize"
    :current="current"
    @change="onPageChange"
    @showSizeChange="onShowSizeChange"
  />
</template>

<script setup>
import { Pagination } from "ant-design-vue";
import { LIST_PAGE_SIZE } from "@/constant";
import { ref } from "vue";
import { defineEmits, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const route = useRoute();
const query = route.query;
const router = useRouter();

const emit = defineEmits(["pageChange", "showSizeChange"]);

const current = ref(parseInt(query.page) || 1);
const pageSize = ref(parseInt(query.pageSize) || LIST_PAGE_SIZE);

defineProps({
  total: {
    type: Number,
    required: true,
  },
});

const onPageChange = (page, pageSize) => {
  current.value = page;
  emit("pageChange", page, pageSize);
  updateRouteParams({ page, pageSize });
};

const onShowSizeChange = (page, size) => {
  pageSize.value = size;
  current.value = 1;
  emit("pageChange", 1, size);
  updateRouteParams({ page: 1, pageSize: size });
};

const updateRouteParams = (params) => {
  router.push({ query: { ...route.query, ...params } });
};

watch(route, (newRoute) => {
  current.value = Number(newRoute.query.page) || 1;
  pageSize.value = Number(newRoute.query.pageSize) || LIST_PAGE_SIZE;
});
</script>
