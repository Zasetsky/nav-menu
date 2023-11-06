<template>
  <div class="button-container">
    <mode1_icon
      class="button-container__icon"
      :class="{ active: isMode1Active }"
      @click="handlePressWorkMode(1)"
      @mouseenter="isMode1Hover = true"
      @mouseleave="handleMouseLeaveWorkMode(1)"
      :hover="isMode1Hover"
      :active="isMode1Active"
    />
    <mode2_icon
      class="button-container__icon"
      :class="{ active: isMode2Active }"
      @click="handlePressWorkMode(2)"
      @mouseenter="isMode2Hover = true"
      @mouseleave="handleMouseLeaveWorkMode(2)"
      :hover="isMode2Hover"
      :active="isMode2Active"
    />
    <mode3_icon
      class="button-container__icon"
      :class="{ active: isMode3Active }"
      @click="handlePressWorkMode(3)"
      @mouseenter="isMode3Hover = true"
      @mouseleave="handleMouseLeaveWorkMode(3)"
      :hover="isMode3Hover"
      :active="isMode3Active"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mode1_icon, mode2_icon, mode3_icon } from "@/assets/icons/index";

export default defineComponent({
  components: {
    mode1_icon,
    mode2_icon,
    mode3_icon,
  },

  setup() {
    const isMode1Hover = ref(false);
    const isMode2Hover = ref(false);
    const isMode3Hover = ref(false);

    const isMode1Active = ref(true);
    const isMode2Active = ref(false);
    const isMode3Active = ref(false);

    const handlePressWorkMode = (mode: number) => {
      if (mode === 1) {
        isMode1Active.value = true;

        isMode2Active.value = false;
        isMode3Active.value = false;

        isMode2Hover.value = false;
        isMode3Hover.value = false;
      } else if (mode === 2) {
        isMode2Active.value = true;

        isMode1Active.value = false;
        isMode3Active.value = false;

        isMode1Hover.value = false;
        isMode3Hover.value = false;
      } else {
        isMode3Active.value = true;

        isMode1Active.value = false;
        isMode2Active.value = false;

        isMode1Hover.value = false;
        isMode2Hover.value = false;
      }
    };

    const handleMouseLeaveWorkMode = (mode: number) => {
      if (mode === 1 && !isMode1Active.value) {
        isMode1Hover.value = false;
      } else if (mode === 2 && !isMode2Active.value) {
        isMode2Hover.value = false;
      } else if (mode === 3 && !isMode3Active.value) {
        isMode3Hover.value = false;
      }
    };

    return {
      isMode1Hover,
      isMode2Hover,
      isMode3Hover,
      isMode1Active,
      isMode2Active,
      isMode3Active,
      handlePressWorkMode,
      handleMouseLeaveWorkMode,
    };
  },
});
</script>

<style lang="scss">
.button-container {
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid var(--el-border-color);
  padding: 24px 0;

  &__icon {
    cursor: pointer;

    &.active {
      cursor: default;
    }
  }
}
</style>
