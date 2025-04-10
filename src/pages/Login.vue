<template>
  <div class="container">
    <div class="title-container">
      <Typography>
        <Space>
          <TypographyTitle :level="2">
            <UserAddOutlined />
          </TypographyTitle>
          <TypographyTitle :level="2">用户登录</TypographyTitle>
        </Space>
      </Typography>
    </div>

    <div class="form-container">
      <Form
        :model="formState"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        @finish="onFinish"
        ref="formRef"
      >
        <FormItem
          label="用户名"
          name="username"
          :rules="[
            { required: true, message: '请输入用户名' },
            {
              type: 'string',
              min: 5,
              max: 20,
              message: '字符长度在 5-20 之间',
            },
            { pattern: /^\w+$/, message: '只能是字母数字下划线' },
          ]"
        >
          <Input v-model:value="formState.username" />
        </FormItem>

        <FormItem
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <InputPassword v-model:value="formState.password" />
        </FormItem>

        <FormItem name="remember" :wrapper-col="{ offset: 6, span: 16 }">
          <Checkbox v-model:checked="formState.remember">记住我</Checkbox>
        </FormItem>

        <FormItem :wrapper-col="{ offset: 6, span: 16 }">
          <Space>
            <Button type="primary" html-type="submit" :loading="isSubmitting">
              登录
            </Button>
            <router-link :to="REGISTER_PATHNAME">注册新用户</router-link>
          </Space>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { UserAddOutlined } from "@ant-design/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { loginService } from "@/services/user";
import { useRequest } from "@/hooks/useRequest";
import { setToken } from "@/utils/user-token";
import {
  Form,
  FormItem,
  Input,
  InputPassword,
  Checkbox,
  Button,
  Space,
  Typography,
  TypographyTitle,
} from "ant-design-vue";

// 配置项
const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";
const REGISTER_PATHNAME = "/register";
const MANAGE_INDEX_PATHNAME = "/manager";

const router = useRouter();
const isSubmitting = ref(false);
const formRef = ref(null);

const formState = reactive({
  username: "",
  password: "",
  remember: true,
});

// 本地存储相关函数
function rememberUser(username, password) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const { run } = useRequest(async (username, password) => {
  const data = await loginService(username, password);
  return data;
});

// 表单提交
const onFinish = async (values) => {
  const { username, password, remember } = values;

  isSubmitting.value = true;
  try {
    const result = await run(username, password); // 执行 ajax
    // console.log("result", result);

    const token = result?.token || "";

    if (token) {
      setToken(token); // 存储 token

      message.success("登录成功");
      router.push(MANAGE_INDEX_PATHNAME);
    } else {
      message.error("登录失败: 未获取到 token");
    }

    // 处理记住我功能
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  } catch (error) {
    console.error("登录错误:", error);
    message.error("登录失败，请重试");
  } finally {
    isSubmitting.value = false;
  }
};

// 组件挂载时从本地存储加载用户信息
onMounted(() => {
  const { username, password } = getUserInfoFromStorage();
  if (username) formState.username = username;
  if (password) formState.password = password;
});
</script>

<style lang="scss" scoped>
@use "./Login.module.scss" as *;
</style>
