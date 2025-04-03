export type QuestionParagraphPropsType = {
  content?: string;
  isCenter?: boolean;
  onChange?: (newProps: QuestionParagraphPropsType) => void;
  disabled?: boolean;
};

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  content: "段落内容",
  isCenter: false,
};
