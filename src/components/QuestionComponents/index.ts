import QuestionTitleConf, {
  QuestionTitlePropsType,
} from "./QuestionTitle/index";
import QuestionInputConf, {
  QuestionInputPropsType,
} from "./QuestionInput/index";
import { DefineComponent } from "vue";

/**
 * @description 集合组件的配置
 * */
export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType;

/**
 * @description 组件的配置 type
 * */
export type ComponentConfType = {
  title: string;
  type: string;
  component: DefineComponent<ComponentPropsType>;
  PropComponent: DefineComponent<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

/**
 * @description 组件的配置列表
 * */
const componentConfList: ComponentConfType[] = [
  QuestionTitleConf as ComponentConfType,
  QuestionInputConf as ComponentConfType,
];

// 组件分组
export const componentConfGroup = [
  {
    groupId: "textGroup",
    groupName: "文本显示",
    components: [QuestionTitleConf],
  },
  {
    groupId: "inputGroup",
    groupName: "用户输入",
    components: [QuestionInputConf],
  },
  // {
  //   groupId: 'chooseGroup',
  //   groupName: '用户选择',
  //   components: [QuestionRadioConf, QuestionCheckboxConf],
  // },
];

/**
 * @description 根据组件的type返回对应组件的配置
 * @param type 组件的type
 * @returns 包括组件的type，title，Component（组件的实际代码），defaultProps
 * */
export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
