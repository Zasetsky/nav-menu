import { ref, computed } from "vue";
import { useStore } from "vuex";

export default function usePopup(propsDate: string) {
  const store = useStore();
  const isPopupVisible = ref(false);
  let closeTimeout: number | null = null;

  const showOptions = computed(() => {
    return store.getters["LocalStates/getshowOptions"];
  });

  const hidePopup = () => {
    isPopupVisible.value = false;
  };

  const showPopup = () => {
    if (new Date(propsDate) < new Date()) {
      cancelCloseTimeout();
      isPopupVisible.value = true;
    }
  };

  const startHidePopup = () => {
    if (!showOptions.value) {
      closeTimeout = window.setTimeout(hidePopup, 400);
    }
  };

  const cancelCloseTimeout = () => {
    if (closeTimeout !== null) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
  };

  return {
    isPopupVisible,
    hidePopup,
    showPopup,
    startHidePopup,
    cancelCloseTimeout,
  };
}
