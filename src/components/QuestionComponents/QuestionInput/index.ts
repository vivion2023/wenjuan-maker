/**
 * @description 问卷 输入框
 */

import QuestionInputComponent from "./QuestionInputComponent.vue";
import PropComponent from "./PropComponent.vue";
import { QuestionInputDefaultProps } from "./interface";

export * from "./interface";

export default {
  title: "输入框",
  type: "questionInput",
  component: QuestionInputComponent, // 画布组件
  PropComponent, // 属性组件
  defaultProps: QuestionInputDefaultProps, // 默认属性
};
