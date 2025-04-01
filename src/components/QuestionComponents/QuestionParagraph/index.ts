import QuestionParagraphComponent from "./QuestionParagraphComponent.vue";
import PropComponent from "./PropComponent.vue";
import {
  QuestionParagraphDefaultProps,
  QuestionParagraphPropsType,
} from "./interface";

export type { QuestionParagraphPropsType };

export default {
  title: "段落",
  type: "questionParagraph",
  component: QuestionParagraphComponent,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
};
