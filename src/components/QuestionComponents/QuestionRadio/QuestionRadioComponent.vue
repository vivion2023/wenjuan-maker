<template>
  <div>
    <Paragraph strong>{{ titleValue }}</Paragraph>
    <RadioGroup
      :value="selectedValue"
      :style="{
        display: 'flex',
        flexDirection: isVerticalValue ? 'column' : 'row',
      }"
    >
      <Radio
        v-for="option in optionsValue"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </Radio>
    </RadioGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, computed, watch } from "vue";
import { Typography, Radio, RadioGroup } from "ant-design-vue";
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from "./interface";
import { MinusCircleOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
const { Paragraph } = Typography;

const store = useStore();

const props = withDefaults(
  defineProps<QuestionRadioPropsType>(),
  QuestionRadioDefaultProps
);

const titleValue = computed(() => props.title);
const optionsValue = computed(() => props.options || []);
const isVerticalValue = computed(() => props.isVertical);

// 优先使用value作为选中值，如果没有则使用defaultOption
const selectedValue = computed(() => props.value || props.defaultOption);
</script>

<style scoped>
.title {
  margin: 0;
  margin-bottom: 10px;
}
</style>
