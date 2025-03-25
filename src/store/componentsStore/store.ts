import { ComponentPropsType } from "@/components/QuestionComponents";

/**
 * @description 每个组件都有的组件type
 * */
export type ComponentInfoType = {
  fe_id: string; //前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

/**
 * @description 管理当前 数据列表 数据结构的type
 * */
export type ComponentsStateType = {
  selectedId: string; //记录选中的组件id
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

//默认状态
export const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
};
