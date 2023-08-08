import { Ref, onMounted, onUnmounted } from "vue";

export default function useSettingsVisibility(isSettingsVisible: Ref<boolean>) {
  const openSettings = (event: Event) => {
    isSettingsVisible.value = true;
    event.stopPropagation();
  };

  const closeSettings = () => {
    isSettingsVisible.value = false;
  };

  const clickOutsideHandler = () => {
    if (isSettingsVisible.value) {
      isSettingsVisible.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", clickOutsideHandler);
  });

  onUnmounted(() => {
    document.removeEventListener("click", clickOutsideHandler);
  });

  return {
    isSettingsVisible,
    openSettings,
    closeSettings,
  };
}
