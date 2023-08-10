<template>
  <div class="arrow-icon" @mouseover="hover = true" @mouseleave="hover = false">
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 17L12.5 12.5L8 8"
        :style="{ stroke: hover ? hoverColor : defaultColor }"
        stroke-linecap="round"
      />
      <path
        d="M12.5 17L17 12.5L12.5 8"
        :style="{ stroke: hover ? hoverColor : defaultColor }"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    width: {
      type: String,
      default: "24px",
    },
    height: {
      type: String,
      default: "24px",
    },
  },

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
