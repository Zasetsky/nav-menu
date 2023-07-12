import { ref, onMounted, onUnmounted } from "vue";

export default function useSettingsVisibility() {
  const isSettingsVisible = ref(false);

  const openSettings = (event: Event) => {
    isSettingsVisible.value = !isSettingsVisible.value;
    event.stopPropagation();
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
  };
}
