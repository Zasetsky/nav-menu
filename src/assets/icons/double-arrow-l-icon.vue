<template>
  <div>
    <svg
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 17L11.5 12.5L16 8" stroke="#606266" stroke-linecap="round" />
      <path
        d="M11.5 17L7 12.5L11.5 8"
        stroke="#606266"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
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
};
</script>
