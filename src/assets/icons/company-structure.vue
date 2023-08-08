<template>
  <div class="knowledge-base-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M11.9997 6.85709C13.4198 6.85709 14.5711 5.70582 14.5711 4.28566C14.5711 2.8655 13.4198 1.71423 11.9997 1.71423C10.5795 1.71423 9.42822 2.8655 9.42822 4.28566C9.42822 5.70582 10.5795 6.85709 11.9997 6.85709Z"
        :style="{ stroke: isActive ? '#17505b' : '#303133' }"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.3"
      />
      <path
        d="M3.42836 22.2857C4.84852 22.2857 5.99979 21.1344 5.99979 19.7143C5.99979 18.2941 4.84852 17.1428 3.42836 17.1428C2.0082 17.1428 0.856934 18.2941 0.856934 19.7143C0.856934 21.1344 2.0082 22.2857 3.42836 22.2857Z"
        :style="{ stroke: isActive ? '#17505b' : '#303133' }"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.3"
      />
      <path
        d="M11.9997 22.2857C13.4198 22.2857 14.5711 21.1344 14.5711 19.7143C14.5711 18.2941 13.4198 17.1428 11.9997 17.1428C10.5795 17.1428 9.42822 18.2941 9.42822 19.7143C9.42822 21.1344 10.5795 22.2857 11.9997 22.2857Z"
        :style="{ stroke: isActive ? '#17505b' : '#303133' }"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.3"
      />
      <path
        d="M20.5714 22.2857C21.9916 22.2857 23.1429 21.1344 23.1429 19.7143C23.1429 18.2941 21.9916 17.1428 20.5714 17.1428C19.1513 17.1428 18 18.2941 18 19.7143C18 21.1344 19.1513 22.2857 20.5714 22.2857Z"
        :style="{ stroke: isActive ? '#17505b' : '#303133' }"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.3"
      />
      <path
        d="M3.42822 17.1428V13.7142C3.42822 13.2595 3.60883 12.8235 3.93033 12.502C4.25182 12.1805 4.68785 11.9999 5.14251 11.9999H18.8568C19.3114 11.9999 19.7475 12.1805 20.069 12.502C20.3905 12.8235 20.5711 13.2595 20.5711 13.7142V17.1428M11.9997 6.85706V17.1428"
        :style="{ stroke: isActive ? '#17505b' : '#303133' }"
        stroke-linecap="round"
        stroke-linejoin="round"
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
