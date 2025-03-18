<template>
  <div class="container">
    <div class="title-container">
      <Typography>
        <Space>
          <TypographyTitle :level="2">
            <UserAddOutlined />
          </TypographyTitle>
          <TypographyTitle :level="2">注册新用户</TypographyTitle>
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
          :rules="[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码长度不能小于6位' },
          ]"
        >
          <InputPassword v-model:value="formState.password" />
        </FormItem>

        <FormItem
          label="确认密码"
          name="confirmPassword"
          :rules="[
            { required: true, message: '请确认密码' },
            { validator: validateConfirmPassword },
          ]"
        >
          <InputPassword v-model:value="formState.confirmPassword" />
        </FormItem>

        <FormItem label="昵称" name="nickname">
          <Input v-model:value="formState.nickname" />
        </FormItem>

        <FormItem :wrapper-col="{ offset: 6, span: 16 }">
          <Space>
            <Button type="primary" html-type="submit" :loading="isSubmitting">
              注册
            </Button>
            <router-link :to="LOGIN_PATHNAME">已有账户，登录</router-link>
          </Space>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { UserAddOutlined } from "@ant-design/icons-vue";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import {
  Form,
  FormItem,
  Input,
  InputPassword,
  Button,
  Space,
  Typography,
  TypographyTitle,
} from "ant-design-vue";

// 配置项
const LOGIN_PATHNAME = "/login";
const MANAGE_INDEX_PATHNAME = "/manage";

const router = useRouter();
const isSubmitting = ref(false);
const formRef = ref(null);

const formState = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  nickname: "",
});

// 验证确认密码
const validateConfirmPassword = async (rule, value) => {
  if (!value) {
    return Promise.reject("请确认密码");
  }
  if (value !== formState.password) {
    return Promise.reject("两次输入的密码不一致");
  }
  return Promise.resolve();
};

// 注册服务
const registerService = async (username, password, nickname) => {
  // 这里应调用实际的注册API
  // 示例实现:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: "mock-token-" + Date.now() });
    }, 1000);
  });
};

// 设置token
const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};

// 表单提交
const onFinish = async (values) => {
  try {
    isSubmitting.value = true;

    const { username, password, nickname } = values;
    const result = await registerService(username, password, nickname);

    if (result.token) {
      setToken(result.token);
      message.success("注册成功");
      router.push(MANAGE_INDEX_PATHNAME);
    }
  } catch (error) {
    console.error("注册失败:", error);
    message.error("注册失败，请重试");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 400px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-container {
  margin-bottom: 30px;
  text-align: center;
}

.form-container {
  width: 100%;
}

:deep(
  .ant-form-item-label
    > label.ant-form-item-required:not(
      .ant-form-item-required-mark-optional
    )::before
) {
  color: #ff4d4f;
}

:deep(.ant-btn-primary) {
  background-color: #1890ff;
}

:deep(a) {
  color: #1890ff;
}
</style>
