<template>
  <div>MainLayout header</div>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <div>MainLayout footer</div>
</template>

<script>
export default {};
</script>

<style scoped></style>
