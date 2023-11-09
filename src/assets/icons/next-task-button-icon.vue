<template>
  <div
    style="
      border-left: 1px solid var(--el-border-color);
      border-bottom: 1px solid var(--el-border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 65px;
      padding: 16px 0;
    "
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <svg
      v-if="isActualTask"
      style="border-radius: 4px"
      :style="isHover ? 'background-color: #17505B;' : ''"
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.833 28.833L21.333 21.333L13.833 13.833"
        :stroke="disabled ? '#C0C4CC' : isHover ? '#fff' : '#17505B'"
        stroke-width="1.66667"
        stroke-linecap="round"
      />
      <path
        d="M21.333 28.833L28.833 21.333L21.333 13.833"
        :stroke="disabled ? '#C0C4CC' : isHover ? '#fff' : '#17505B'"
        stroke-width="1.66667"
        stroke-linecap="round"
      />
    </svg>
    <svg
      v-else
      :style="isHover ? 'background-color: #17505B;' : ''"
      style="border-radius: 4px"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.6667 28.3335L19.1667 20.8335L26.6667 13.3335"
        :stroke="
          disabled
            ? 'var(--el-text-color-disabled)'
            : isHover
            ? 'var(--el-bg-color)'
            : 'var(--el-color-primary)'
        "
        stroke-width="1.66667"
        stroke-linecap="round"
      />
      <path
        d="M19.1667 28.3335L11.6667 20.8335L19.1667 13.3335"
        :stroke="
          disabled
            ? 'var(--el-text-color-disabled)'
            : isHover
            ? 'var(--el-bg-color)'
            : 'var(--el-color-primary)'
        "
        stroke-width="1.66667"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    isActualTask: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const isHover = ref(false);

    return { isHover };
  },
});
</script>
