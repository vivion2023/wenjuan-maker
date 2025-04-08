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
  componentList: ComponentInfoType[],
  isHidden: boolean // 新增参数，表示是隐藏还是取消隐藏
) {
  // 获取当前选中的组件ID
  const currentSelectedId = state.selectedId;

  // 如果是取消隐藏，直接返回当前组件的ID
  if (!isHidden) {
    return currentSelectedId;
  }

  // 获取当前组件在列表中的索引
  const currentIndex = componentList.findIndex(
    (c) => c.fe_id === currentSelectedId
  );
  if (currentIndex === -1) return "";

  // 尝试获取下一个可见组件
  for (let i = currentIndex + 1; i < componentList.length; i++) {
    if (!componentList[i].isHidden) {
      return componentList[i].fe_id;
    }
  }

  // 如果后面没有可见组件，尝试获取前一个可见组件
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (!componentList[i].isHidden) {
      return componentList[i].fe_id;
    }
  }

  // 如果前后都没有可见组件，返回空字符串
  return "";
}
