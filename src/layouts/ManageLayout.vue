<template>
  <div class="container">
    <div class="left">
      <h2>ManageLayout left</h2>
      <button>创建问卷</button>
      <br />
      <a href="/manager/list">我的问卷</a>
      <br />
      <a href="/manager/star">星标问卷</a>
      <br />
      <a href="/manager/trash">回收站</a>
    </div>
    <div class="right">
      <h2>插槽</h2>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./ManageLayout.module.scss";
</style>
