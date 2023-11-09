<template>
  <svg
    style="display: flex"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0013 18.3334C14.6038 18.3334 18.3346 14.6026 18.3346 10.0001C18.3346 5.39758 14.6038 1.66675 10.0013 1.66675C5.3988 1.66675 1.66797 5.39758 1.66797 10.0001C1.66797 14.6026 5.3988 18.3334 10.0013 18.3334Z"
      :stroke="
        isActive ? 'var(--el-color-white)' : 'var(--el-color-danger-light-7)'
      "
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.64062 7.6355V12.3647H12.3656V7.6355H7.64062Z"
      :stroke="
        isActive ? 'var(--el-color-white)' : 'var(--el-color-danger-light-7)'
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
