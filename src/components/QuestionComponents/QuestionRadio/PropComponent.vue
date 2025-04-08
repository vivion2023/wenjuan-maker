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
        <div v-for="(option, index) in formData.options" :key="index">
          <FormItem :name="['options', index, 'text']" :key="index">
            <div class="option-item">
              <Input v-model:value="option.text" @change="handleChange" />
              <div
                v-if="formData.options && formData.options.length > 1"
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
    <FormItem label="默认选中" name="defaultOption">
      <Select
        v-model:value="formData.defaultOption"
        style="width: 100%"
        @change="handleChange"
      >
        <SelectOption
          v-for="option in formData.options"
          :key="option.value"
          :value="option.value"
          :label="option.text"
        >
          {{ option.text }}
        </SelectOption>
      </Select>
    </FormItem>
    <FormItem label="竖向排列" name="isVertical">
      <Switch v-model:checked="formData.isVertical" @change="handleChange" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import {
  QuestionRadioPropsType,
  QuestionRadioDefaultProps,
  OptionType,
} from "./interface";
import { withDefaults, defineProps, reactive, watch } from "vue";
import {
  Form,
  FormItem,
  Input,
  Switch,
  Select,
  SelectOption,
  Button,
} from "ant-design-vue";
import { MinusOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { nanoid } from "nanoid";
const store = useStore();

const props = withDefaults(
  defineProps<QuestionRadioPropsType>(),
  QuestionRadioDefaultProps
);

const formData = reactive<QuestionRadioPropsType>({
  title: props.title,
  options: props.options,
  isVertical: props.isVertical,
  defaultOption: props.defaultOption,
  value: props.value,
  onChange: props.onChange,
  disabled: props.disabled,
});
console.log(formData.defaultOption);

// 监听props变化，更新表单数据
watch(
  props,
  (newProps) => {
    formData.title = newProps.title;
    formData.options = newProps.options ? [...newProps.options] : [];
    formData.isVertical = newProps.isVertical;
    formData.defaultOption = newProps.defaultOption;
    formData.value = newProps.value;
    formData.onChange = newProps.onChange;
    formData.disabled = newProps.disabled;
  },
  { deep: true }
);

const addOption = () => {
  if (!formData.options) formData.options = [];
  formData.options.push({
    value: nanoid(),
    text: "选项",
  });
  handleChange();
};

const removeOption = (index: number) => {
  if (formData.options && formData.options.length > 1) {
    formData.options.splice(index, 1);
    handleChange();
  }
};

const handleChange = () => {
  const fe_id = store.getters["componentsStore/currentSelectedComponentId"];

  // 创建一个新的对象，确保Vuex能检测到变化
  const newProps = {
    title: formData.title,
    options: formData.options ? [...formData.options] : [],
    isVertical: formData.isVertical,
    defaultOption: formData.defaultOption,
  };

  store.dispatch("componentsStore/updateComponentProps", {
    fe_id,
    newProps,
  });
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
}
</style>
