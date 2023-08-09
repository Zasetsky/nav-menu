<template>
  <div>
    <svg
      width="20"
      height="48"
      viewBox="0 0 20 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      v-if="!isDarkTheme"
    >
      <mask id="path-1-inside-1_3185_45255" fill="white">
        <path d="M0 0H20V48H0V0Z" />
      </mask>
      <path d="M0 0H20V48H0V0Z" fill="#F1FBF5" />
      <path
        d="M10.6992 23.5H9.28711V16.7031L7.10156 17.5059V16.2695L10.6113 14.9688H10.6992V23.5Z"
        fill="black"
      />
      <path
        d="M8.78809 34.5H7.61133V28.3477H5.35059V34.5H4.17383V27.3906H8.78809V34.5ZM14.8281 34.5H13.6807V31.3311H11.2881V34.5H10.1455V27.3906H11.2881V30.3643H13.6807V27.3906H14.8281V34.5Z"
        fill="#606266"
      />
      <path
        d="M0 1H20V-1H0V1ZM20 47H0V49H20V47Z"
        fill="#DCDFE6"
        mask="url(#path-1-inside-1_3185_45255)"
      />
    </svg>
    <svg
      v-else
      width="20"
      height="42"
      viewBox="0 0 20 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="path-1-outside-1_3446_1613"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="42"
        fill="black"
      >
        <rect fill="white" width="20" height="42" />
        <path d="M0 1H20V41H0V1Z" />
      </mask>
      <path d="M0 1H20V41H0V1Z" fill="#1D2721" />
      <path
        d="M10.6992 20.5H9.28711V13.7031L7.10156 14.5059V13.2695L10.6113 11.9688H10.6992V20.5Z"
        fill="#E5EAF3"
      />
      <path
        d="M8.78809 31.5H7.61133V25.3477H5.35059V31.5H4.17383V24.3906H8.78809V31.5ZM14.8281 31.5H13.6807V28.3311H11.2881V31.5H10.1455V24.3906H11.2881V27.3643H13.6807V24.3906H14.8281V31.5Z"
        fill="#CFD3DC"
      />
      <path
        d="M0 2H20V0H0V2ZM20 40H0V42H20V40Z"
        fill="#4C4D4F"
        mask="url(#path-1-outside-1_3446_1613)"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isDarkTheme: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
