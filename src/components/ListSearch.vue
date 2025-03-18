<template>
  <InputSearch
    size="large"
    allow-clear
    placeholder="请输入关键字"
    v-model:value="value"
    style="width: 260px"
    @search="onSearch"
  />
</template>

<script setup>
import { InputSearch } from "ant-design-vue";
import { ref } from "vue";

const value = ref("");
const emit = defineEmits(["search"]);

const onSearch = () => {
  emit("search", value.value);
};
</script>

<style lang="scss" scoped></style>
