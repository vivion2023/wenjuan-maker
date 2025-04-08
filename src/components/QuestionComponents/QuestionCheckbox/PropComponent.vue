<template>
  <Form :model="formData" layout="vertical" :disabled="disabled">
    <FormItem label="标题" name="title" required>
      <Input
        id="title"
        name="title"
        v-model:value="formData.title"
        @change="handleChange"
      />
    </FormItem>
    <div class="form-group">
      <div class="form-label">选项</div>
      <div class="options-container">
        <div v-for="(option, index) in formData.list" :key="index">
          <FormItem :name="['list', index, 'text']" :key="index">
            <div class="option-item">
              <Input v-model:value="option.text" @change="handleChange" />
              <div
                v-if="formData.list && formData.list.length > 1"
                @click="removeOption(index)"
              >
                <MinusOutlined />
              </div>
            </div>
          </FormItem>
        </div>
        <Button type="link" @click="addOption">+ 添加选项</Button>
      </div>
    </div>
    <FormItem label="默认选中" name="value">
      <Checkbox.Group
        v-model:value="formData.value"
        style="width: 100%"
        @change="handleChange"
      >
        <Checkbox
          v-for="option in formData.list"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </Checkbox>
      </Checkbox.Group>
    </FormItem>
    <FormItem label="竖向排列" name="isVertical">
      <Switch v-model:checked="formData.isVertical" @change="handleChange" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import {
  QuestionCheckboxPropsType,
  QuestionCheckboxDefaultProps,
  OptionType,
} from "./interface";
import { defineProps, reactive, watch } from "vue";
import {
  Form,
  Input,
  FormItem,
  Switch,
  Checkbox,
  Button,
} from "ant-design-vue";
import { MinusOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { nanoid } from "nanoid";
const store = useStore();

// 直接使用defineProps而不是withDefaults以避免类型错误
const props = defineProps<QuestionCheckboxPropsType>();

const formData = reactive<QuestionCheckboxPropsType>({
  title: props.title || QuestionCheckboxDefaultProps.title,
  list: props.list
    ? [...props.list]
    : [...(QuestionCheckboxDefaultProps.list || [])],
  isVertical: props.isVertical ?? QuestionCheckboxDefaultProps.isVertical,
  value: props.value || [],
  onChange: props.onChange,
  disabled: props.disabled,
});

// 监听props变化，更新表单数据
watch(
  props,
  (newProps) => {
    formData.title = newProps.title || QuestionCheckboxDefaultProps.title;
    formData.list = newProps.list
      ? [...newProps.list]
      : [...(QuestionCheckboxDefaultProps.list || [])];
    formData.isVertical =
      newProps.isVertical ?? QuestionCheckboxDefaultProps.isVertical;
    formData.value = newProps.value || [];
    formData.disabled = newProps.disabled;
  },
  { deep: true }
);

const addOption = () => {
  if (!formData.list) formData.list = [];
  formData.list.push({
    value: nanoid(),
    text: "选项",
    checked: false,
  });
  handleChange();
};

const removeOption = (index: number) => {
  if (formData.list && formData.list.length > 1) {
    formData.list.splice(index, 1);
    handleChange();
  }
};

const handleChange = () => {
  const fe_id = store.getters["componentsStore/currentSelectedComponentId"];
  if (!fe_id) return;

  // 创建一个新的对象，确保Vuex能检测到变化
  const newProps = {
    title: formData.title,
    list: formData.list ? [...formData.list] : [],
    isVertical: formData.isVertical,
    value: formData.value,
  };

  // 延迟dispatch以减少状态更新频率
  setTimeout(() => {
    store.dispatch("componentsStore/updateComponentProps", {
      fe_id,
      newProps,
    });
  }, 0);
};
</script>

<style scoped>
:deep(.ant-form-item) {
  margin-bottom: 12px;
}

.options-container {
  display: flex;
  flex-direction: column;
}

.option-item {
  display: flex;
  align-items: center;
}

.form-label {
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  margin-bottom: 8px;
}

.form-group {
  margin-bottom: 24px;
}
</style>
