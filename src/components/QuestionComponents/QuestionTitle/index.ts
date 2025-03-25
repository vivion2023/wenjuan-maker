/**
 * @description 问卷 输入框
 */

import QuestionTitleComponent from "./QuestionTitleComponent.vue";
import PropComponent from "./PropComponent.vue";
import { QuestionTitleDefaultProps } from "./interface";

export * from "./interface";

export default {
  title: "标题",
  type: "questionTitle",
  component: QuestionTitleComponent, // 画布组件
  PropComponent, // 属性组件
  defaultProps: QuestionTitleDefaultProps, // 默认属性
};
