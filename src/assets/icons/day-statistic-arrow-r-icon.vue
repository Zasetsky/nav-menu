<template>
  <div style="display: flex">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11 17L15.5 12.5L11 8"
        :stroke="
          hover ? 'var(--el-color-success)' : 'var(--el-text-color-primary)'
        "
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    hover: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
