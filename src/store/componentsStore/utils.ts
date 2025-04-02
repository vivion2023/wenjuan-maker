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
