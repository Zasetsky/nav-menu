<template>
  <div class="day">
    <div class="day-circle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
.day {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  padding: 12px;
  border-top: 1px solid $main-palette-background-base;
  border-bottom: 1px solid $main-palette-background-base;
}

.day-circle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ff0000;
}
</style>
