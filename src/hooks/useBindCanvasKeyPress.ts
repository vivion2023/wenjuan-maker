// 监听快捷键
import { useMagicKeys } from "@vueuse/core";
import { watch, WatchStopHandle } from "vue";
import { useStore } from "vuex";

function isActivateElement(): boolean {
  const activeElement = document.activeElement;
  return activeElement === document.body;
}

function useBindCanvasKeyPress() {
  const store = useStore();
  const keys = useMagicKeys();
  const deleteKey = keys["Delete"];
  const CtrlC = keys["Ctrl+C"];
  const CtrlV = keys["Ctrl+V"];
  const CtrlX = keys["Ctrl+X"];
  const PreyKey = keys["ArrowUp"];
  const NextKey = keys["ArrowDown"];

  // 收集所有的 watch 停止函数
  const stopHandles: WatchStopHandle[] = [];

  stopHandles.push(
    watch(deleteKey, (isPressed) => {
      if (isPressed && isActivateElement()) {
        // 只有在按下删除键且焦点在 body 上时才执行删除
        store.dispatch("componentsStore/deleteComponent");
      }
    })
  );

  stopHandles.push(
    watch(CtrlC, (isPressed) => {
      if (isPressed && isActivateElement()) {
        store.dispatch("componentsStore/copyComponent");
      }
    })
  );

  stopHandles.push(
    watch(CtrlV, (isPressed) => {
      if (isPressed && isActivateElement()) {
        store.dispatch("componentsStore/pasteComponent");
      }
    })
  );

  stopHandles.push(
    watch(CtrlX, (isPressed) => {
      if (isPressed && isActivateElement()) {
        store.dispatch("componentsStore/copyComponent");
        store.dispatch("componentsStore/deleteComponent");
      }
    })
  );

  stopHandles.push(
    watch(PreyKey, (isPressed) => {
      if (isPressed && isActivateElement()) {
        store.dispatch("componentsStore/selectPreviousComponent");
      }
    })
  );

  stopHandles.push(
    watch(NextKey, (isPressed) => {
      if (isPressed && isActivateElement()) {
        store.dispatch("componentsStore/selectNextComponent");
      }
    })
  );
  // 返回清理函数
  return () => {
    stopHandles.forEach((stop) => stop());
  };
}

export default useBindCanvasKeyPress;
