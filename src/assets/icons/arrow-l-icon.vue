<template>
  <div class="arrow-icon" @mouseover="hover = true" @mouseleave="hover = false">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 17L9 12.5L13.5 8"
        :style="{ stroke: hover ? hoverColor : defaultColor }"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const hover = ref(false);
    const defaultColor = "var(--el-text-color-regular)";
    const hoverColor = "var(--el-color-success)";

    return {
      hover,
      defaultColor,
      hoverColor,
    };
  },
});
</script>
