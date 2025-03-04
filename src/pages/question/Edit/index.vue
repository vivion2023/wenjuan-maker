<template>
  <div>
    <h2>Edit:{{ id }}</h2>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const id = route.params.id;
    return {
      id,
    };
  },
};
</script>

<style scoped></style>
