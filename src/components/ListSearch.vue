1
<template>
  <InputSearch
    size="large"
    allow-clear
    placeholder="请输入关键字"
    :value="value"
    style="width: 260px"
    @search="onSearch"
  />
</template>

<script>
import { InputSearch } from "ant-design-vue";
import { ref } from "vue";
export default {
  components: { InputSearch },
  setup() {
    const value = ref("");
    const onSearch = () => {
      console.log(value.value);
    };
    return { value, onSearch };
  },
};
</script>

<style lang="scss" scoped></style>
