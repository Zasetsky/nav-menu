<template>
  <svg
    style="display: flex"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M8.43746 7.63538V12.3645M11.5625 7.63538V12.3645M9.99996 18.3333C14.6025 18.3333 18.3333 14.6025 18.3333 9.99996C18.3333 5.39746 14.6025 1.66663 9.99996 1.66663C5.39746 1.66663 1.66663 5.39746 1.66663 9.99996C1.66663 14.6025 5.39746 18.3333 9.99996 18.3333Z"
      :stroke="
        isActive ? 'var(--el-color-white)' : 'var(--el-color-warning-light-7)'
      "
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
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
