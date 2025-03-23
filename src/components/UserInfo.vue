<template>
  <div class="user-info">
    <div v-if="token">
      <Space>
        <UserOutlined />
        <span>{{ username }}</span>
        <a @click="handleLogout">退出</a>
      </Space>
    </div>
    <div v-else>
      <a @click="() => router.push('/login')">登录</a>
    </div>
  </div>
</template>

<script setup>
import { Space } from "ant-design-vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { removeToken } from "@/utils/user-token";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getToken } from "@/utils/user-token";

const router = useRouter();
const token = ref("");
const username = ref("");

const updateUsername = () => {
  username.value = localStorage.getItem("USERNAME");
};

onMounted(() => {
  updateUsername();
  token.value = getToken();
});

const handleLogout = () => {
  removeToken();
  router.push("/login");
  token.value = "";
};
</script>

<style scoped lang="scss">
.user-info {
  display: inline-block;
  align-items: center;
  padding: 0 24px;
}
</style>
