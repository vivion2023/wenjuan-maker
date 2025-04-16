<template>
  <InputSearch
    size="large"
    allow-clear
    placeholder="请输入关键字"
    v-model:value="localKeyword"
    style="width: 260px"
    @search="onSearch"
  />
</template>

<script setup>
import { InputSearch } from "ant-design-vue";
import { ref, watch } from "vue";

const localKeyword = ref("");

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "search"]);

localKeyword.value = props.modelValue;

const onSearch = () => {
  emit("search", localKeyword.value);
};
</script>

<style lang="scss" scoped></style>
