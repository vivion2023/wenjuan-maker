<template>
  <div v-if="loading" style="text-align: center; margin-top: 24px">
    <Spin />
  </div>
  <div v-else class="canvas">
    <div
      v-for="item in componentList"
      :key="item.fe_id"
      class="component-wrapper"
    >
      <div class="component-container">
        <component
          v-if="getComponentByType(item.type)"
          :is="getComponentByType(item.type)"
          v-bind="item.props"
        />
      </div>
    </div>
    <div class="component-wrapper">
      <div class="component-container">
        <div>
          <p>{{ JSON.stringify(componentList) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Spin } from "ant-design-vue";
import { computed } from "vue";
import { useLoadQuestionData } from "@/hooks/useLoadQuestionData";
import { useRoute } from "vue-router";
import { getComponentConfByType } from "@/components/QuestionComponents";

const route = useRoute();

const { data, loading, error } = useLoadQuestionData(route.params.id as string);

const componentList = computed(() => {
  if (!data.value) return [];
  return data.value.componentList || [];
});

const getComponentByType = (type: string) => {
  const conf = getComponentConfByType(type);
  if (!conf) return null;
  return conf.component;
};
</script>

<style scoped lang="scss">
@use "./EditCanvas.module.scss" as *;
</style>
