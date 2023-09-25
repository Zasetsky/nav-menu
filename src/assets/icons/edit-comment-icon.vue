<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <g clip-path="url(#clip0_3185_38592)">
      <path
        d="M1.55494 5.2548L3.07044 6.1298L4.82044 3.0988L3.30544 2.2238L1.55544 5.2553L1.55494 5.2548ZM1.36844 5.7248L1.62544 6.8833L2.75744 6.5263L1.36844 5.7248ZM3.55494 1.7908L5.06994 2.6658L5.51294 1.8993L3.99744 1.0243L3.55494 1.7908ZM0.814941 5.5373L3.81494 0.341797L6.19594 1.7163L3.19644 6.9123H3.19694L1.25594 7.5243L0.814941 5.5373ZM3.81494 7.5238V7.0238H7.31494V7.5238H3.81494Z"
        :style="{ fill: hover ? hoverColor : defaultColor }"
      />
    </g>
    <defs>
      <clipPath id="clip0_3185_38592">
        <rect width="8" height="8" fill="white" />
      </clipPath>
    </defs>
  </svg>
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
