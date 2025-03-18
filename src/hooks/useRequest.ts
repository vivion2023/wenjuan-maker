import { ref, UnwrapRef } from "vue";

type Service<T, P extends any[]> = (...args: P) => Promise<T>;

export function useRequest<T, P extends any[] = []>(service: Service<T, P>) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const run = async (...args: P) => {
    loading.value = true;
    error.value = null;

    try {
      const result = await service(...args);
      data.value = result as UnwrapRef<T>;
      return result;
    } catch (e) {
      error.value = e instanceof Error ? e.message : "请求失败";
      console.error(error.value, e);
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    run,
  };
}
