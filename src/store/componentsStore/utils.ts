/**
 * @Description 存储组件列表
 * */
import { ComponentsStateType, ComponentInfoType } from "./index";

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */

export function insertNewComponent(
  state: ComponentsStateType,
  newComponent: ComponentInfoType
) {
  const { selectedId, componentList } = state;
  // 找到选中的组件
  const index = componentList.findIndex((c) => c.fe_id === selectedId);
  if (index < 0) {
    // 如果选中的组件不存在，则直接添加到组件列表中
    componentList.push(newComponent);
  } else {
    // 如果选中的组件存在，则插入到选中的组件后面
    componentList.splice(index + 1, 0, newComponent);
  }
  // 更新选中的组件id
  state.selectedId = newComponent.fe_id;
}

export function getNextSelectedId(
  state: ComponentsStateType,
  componentList: ComponentInfoType[]
) {
  // 获取当前选中的组件ID
  const currentSelectedId = state.selectedId;

  // 获取可见组件列表（不包括当前要隐藏的组件）
  const visibleComponentList = componentList.filter((c) => !c.isHidden);

  // 如果隐藏后没有可见组件了，返回空字符串
  if (visibleComponentList.length === 0) {
    return "";
  }

  // 找到当前选中组件在可见列表中的索引
  const index = visibleComponentList.findIndex(
    (c) => c.fe_id === currentSelectedId
  );

  // 如果当前选中的组件不在可见列表中，选中第一个可见组件
  if (index < 0) {
    return visibleComponentList[0].fe_id;
  }

  // 如果隐藏的是最后一个可见组件，选中前一个
  if (index === visibleComponentList.length - 1) {
    return visibleComponentList[index - 1].fe_id;
  }

  // 如果隐藏的不是最后一个可见组件，选中下一个
  return visibleComponentList[index + 1].fe_id;
}
