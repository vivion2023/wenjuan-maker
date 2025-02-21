<template>
  <div>
    <h2>问卷</h2>
    <router-link to="/list">列表</router-link>
    <router-link to="/star">星标</router-link>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <lunbo />
</template>

<script>
import { useRouter } from "vue-router";
import lunbo from "./components/lunbo.vue";
export default {
  name: "App",
  components: {
    lunbo,
  },
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>

<style></style>
