<template>
  <div class="nav-menu-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.5 7.5V12.5H16.5"
        :style="{
          stroke: isActive
            ? 'var(--el-color-primary)'
            : 'var(--el-text-color-primary)',
        }"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.3"
      />
      <circle
        cx="12"
        cy="12"
        r="9.5"
        :style="{
          stroke: isActive
            ? 'var(--el-color-primary)'
            : 'var(--el-text-color-primary)',
        }"
        stroke-width="1.3"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
