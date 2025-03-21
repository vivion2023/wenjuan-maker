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
            <Button
              type="primary"
              html-type="submit"
              :loading="isSubmitting"
              @click="onFinish(formState)"
            >
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
import { useRequest } from "@/hooks/useRequest";
import { registerService } from "@/services/user";
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

const { run } = useRequest();

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

// 表单提交
const onFinish = async (values) => {
  const { username, password, nickname, confirmPassword } = values;

  // 检查密码和确认密码是否一致
  if (password !== confirmPassword) {
    message.error("两次输入的密码不一致");
    return; // 直接返回，不进行提交
  }

  try {
    isSubmitting.value = true;
    await registerService(username, password, nickname);

    onSuccess();
  } catch (error) {
    onError();
  } finally {
    isSubmitting.value = false;
  }
};

const onSuccess = () => {
  message.success("注册成功");
  router.push("/login");
};

const onError = () => {
  message.error("注册失败，请重试");
};
</script>

<style lang="scss" scoped>
@use "./Register.module.scss";
</style>
