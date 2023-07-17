<template>
  <div class="calendar-header">
    <div v-for="day in daysOfMonth" :key="day" class="calendar-header-day">
      {{ day }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDaysOfMonth from "@/composables/useDaysOfMonth";

export default defineComponent({
  setup() {
    const { daysOfMonth } = useDaysOfMonth();

    return { daysOfMonth };
  },
});
</script>

<style lang="scss">
.calendar-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  &-day {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>
