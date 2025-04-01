/**
 * @description 问卷 多选
 */

import QuestionCheckboxComponent from "./QuestionCheckboxComponent.vue";
import PropComponent from "./PropComponent.vue";
import { QuestionCheckboxDefaultProps } from "./interface";

export type { QuestionCheckboxPropsType } from "./interface";

export default {
  title: "多选",
  type: "questionCheckbox",
  component: QuestionCheckboxComponent,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
};
