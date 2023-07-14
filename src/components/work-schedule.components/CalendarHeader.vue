<template>
  <div class="calendar-header">
    <div v-for="day in daysOfMonth" :key="day" class="calendar-header-day">
      {{ day }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  setup() {
    const month = ref(new Date().getMonth() + 1);
    const year = ref(new Date().getFullYear());

    const daysOfMonth = computed(() => {
      const date = new Date(year.value, month.value, 0);
      return Array.from({ length: date.getDate() }, (_, i) => i + 1);
    });

    return { daysOfMonth };
  },
});
</script>

<style lang="scss">
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 280px;

  &-day {
    padding: 0 12.15px;
  }
}
</style>
