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
        d="M16 17L11.5 12.5L16 8"
        :style="{ stroke: hover ? hoverColor : defaultColor }"
        stroke-linecap="round"
      />
      <path
        d="M11.5 17L7 12.5L11.5 8"
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
    const defaultColor = "#606266";
    const hoverColor = "#6fcf97";

    return {
      hover,
      defaultColor,
      hoverColor,
    };
  },
});
</script>
