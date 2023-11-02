<template>
  <div style="display: flex; padding-left: 20px">
    <svg
      v-if="active"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="#E8EEEF" />
      <path
        d="M8.44433 11.9997H15.1112M15.1112 11.9997L12 8.88854M15.1112 11.9997L12 15.111M4.2842 12.6878L11.312 19.7147C11.6915 20.0951 12.3076 20.0951 12.688 19.7147L19.7149 12.6878C19.8973 12.5053 19.9997 12.2578 19.9997 11.9997C19.9997 11.7417 19.8973 11.4942 19.7149 11.3117L12.688 4.28484C12.5055 4.10245 12.258 4 12 4C11.742 4 11.4945 4.10245 11.312 4.28484L4.28509 11.3117C4.1027 11.4942 4.00024 11.7417 4.00024 11.9997C4.00024 12.2578 4.10181 12.5053 4.2842 12.6878Z"
        stroke="#17505B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#17505B" />
    </svg>

    <svg
      v-else-if="!hover"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="#F0F2F5" />
      <path
        d="M8.44433 11.9997H15.1112M15.1112 11.9997L12 8.88854M15.1112 11.9997L12 15.111M4.2842 12.6878L11.312 19.7147C11.6915 20.0951 12.3076 20.0951 12.688 19.7147L19.7149 12.6878C19.8973 12.5053 19.9997 12.2578 19.9997 11.9997C19.9997 11.7417 19.8973 11.4942 19.7149 11.3117L12.688 4.28484C12.5055 4.10245 12.258 4 12 4C11.742 4 11.4945 4.10245 11.312 4.28484L4.28509 11.3117C4.1027 11.4942 4.00024 11.7417 4.00024 11.9997C4.00024 12.2578 4.10181 12.5053 4.2842 12.6878Z"
        stroke="#606266"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#DCDFE6" />
    </svg>

    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" fill="#F0F2F5" />
      <path
        d="M8.44433 11.9997H15.1112M15.1112 11.9997L12 8.88854M15.1112 11.9997L12 15.111M4.2842 12.6878L11.312 19.7147C11.6915 20.0951 12.3076 20.0951 12.688 19.7147L19.7149 12.6878C19.8973 12.5053 19.9997 12.2578 19.9997 11.9997C19.9997 11.7417 19.8973 11.4942 19.7149 11.3117L12.688 4.28484C12.5055 4.10245 12.258 4 12 4C11.742 4 11.4945 4.10245 11.312 4.28484L4.28509 11.3117C4.1027 11.4942 4.00024 11.7417 4.00024 11.9997C4.00024 12.2578 4.10181 12.5053 4.2842 12.6878Z"
        stroke="#606266"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#17505B" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    hover: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
