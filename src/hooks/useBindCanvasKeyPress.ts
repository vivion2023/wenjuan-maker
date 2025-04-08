// 监听快捷键
import { useMagicKeys } from "@vueuse/core";
import { watch } from "vue";
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

  watch(deleteKey, (isPressed) => {
    if (isPressed && isActivateElement()) {
      // 只有在按下删除键且焦点在 body 上时才执行删除
      store.dispatch("componentsStore/deleteComponent");
    }
  });

  watch(CtrlC, (isPressed) => {
    if (isPressed && isActivateElement()) {
      store.dispatch("componentsStore/copyComponent");
    }
  });

  watch(CtrlV, (isPressed) => {
    if (isPressed && isActivateElement()) {
      store.dispatch("componentsStore/pasteComponent");
    }
  });

  watch(CtrlX, (isPressed) => {
    if (isPressed && isActivateElement()) {
      store.dispatch("componentsStore/copyComponent");
      store.dispatch("componentsStore/deleteComponent");
    }
  });
}

export default useBindCanvasKeyPress;
