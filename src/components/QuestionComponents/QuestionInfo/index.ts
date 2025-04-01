/**
 * @description 问卷 信息框
 */

import QuestionInfoComponent from "./QuestionInfoComponent.vue";
import PropComponent from "./PropComponent.vue";
import { QuestionInfoDefaultProps } from "./interface";

export type { QuestionInfoPropsType } from "./interface";

export default {
  title: "问卷信息",
  type: "questionInfo",
  component: QuestionInfoComponent, // 画布组件
  PropComponent, // 属性组件
  defaultProps: QuestionInfoDefaultProps, // 默认属性
};
