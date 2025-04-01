/**
 * @description 问卷 文本域
 */

import QuestionTextareaComponent from "./QuestionTextareaComponent.vue";
import PropComponent from "./PropComponent.vue";
import { QuestionTextareaDefaultProps } from "./interface";

export type { QuestionTextareaPropsType } from "./interface";

export default {
  title: "文本域",
  type: "questionTextarea",
  component: QuestionTextareaComponent, // 画布组件
  PropComponent, // 属性组件
  defaultProps: QuestionTextareaDefaultProps, // 默认属性
};
