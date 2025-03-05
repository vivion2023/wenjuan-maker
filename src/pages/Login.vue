<template>
  <div>
    <div>
      <UserAddOutlined />
      <span>用户登录</span>
    </div>
    <div>
      <form>
        <div>
          <label>用户名</label>
          <input type="username" />
        </div>
        <div>
          <label>密码</label>
          <input type="password" />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import { UserAddOutlined } from "@ant-design/icons-vue";
export default {
  components: { UserAddOutlined },
};
</script>

<style scoped></style>
