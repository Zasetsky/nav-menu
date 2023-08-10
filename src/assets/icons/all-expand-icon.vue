<template>
  <div
    class="all-expand-icon"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13.9811 8.5C13.9936 8.33498 14 8.16824 14 8C14 7.83176 13.9936 7.66502 13.9811 7.5H20.5C20.7761 7.5 21 7.72386 21 8C21 8.27614 20.7761 8.5 20.5 8.5H13.9811Z"
        :style="{ fill: hover ? hoverColor : defaultColor }"
      />
      <path
        d="M12.1904 12.5C12.4842 12.1938 12.7484 11.859 12.9782 11.5H20.5C20.7761 11.5 21 11.7239 21 12C21 12.2761 20.7761 12.5 20.5 12.5H12.1904Z"
        :style="{ fill: hover ? hoverColor : defaultColor }"
      />
      <path
        d="M6 20C6 19.7239 6.22386 19.5 6.5 19.5H20.5C20.7761 19.5 21 19.7239 21 20C21 20.2761 20.7761 20.5 20.5 20.5H6.5C6.22386 20.5 6 20.2761 6 20Z"
        :style="{ fill: hover ? hoverColor : defaultColor }"
      />
      <path
        d="M6 16C6 15.7239 6.22386 15.5 6.5 15.5H20.5C20.7761 15.5 21 15.7239 21 16C21 16.2761 20.7761 16.5 20.5 16.5H6.5C6.22386 16.5 6 16.2761 6 16Z"
        :style="{ fill: hover ? hoverColor : defaultColor }"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 13C10.2614 13 12.5 10.7614 12.5 8C12.5 5.23858 10.2614 3 7.5 3C4.73858 3 2.5 5.23858 2.5 8C2.5 10.7614 4.73858 13 7.5 13ZM8 6.125C8 5.84886 7.77614 5.625 7.5 5.625C7.22386 5.625 7 5.84886 7 6.125V7.5H5.625C5.34886 7.5 5.125 7.72386 5.125 8C5.125 8.27614 5.34886 8.5 5.625 8.5H7V9.875C7 10.1511 7.22386 10.375 7.5 10.375C7.77614 10.375 8 10.1511 8 9.875V8.5H9.375C9.65114 8.5 9.875 8.27614 9.875 8C9.875 7.72386 9.65114 7.5 9.375 7.5H8V6.125Z"
        :style="{ fill: hover ? hoverColor : defaultColor }"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const hover = ref(false);
    const defaultColor = "var(--el-text-color-disabled)";
    const hoverColor = "var(--el-color-primary)";

    return {
      hover,
      defaultColor,
      hoverColor,
    };
  },
});
</script>
