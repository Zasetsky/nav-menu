<template>
  <div class="calendar-header">
    <div
      v-for="(day, index) in daysOfMonth"
      :key="day"
      class="calendar-header-day"
      :class="{
        'day-weekend': isWeekend(new Date(year, month, day)),
        'day-holiday': isHoliday(day),
      }"
    >
      <div class="day-number">{{ day }}</div>
      <div class="day-name">{{ daysOfWeekInMonth[index] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useCalendar } from "@/composables/useCalendar";

export default defineComponent({
  setup() {
    const { weekDays, year, month, isWeekend, isHoliday } = useCalendar();

    const daysOfMonth = computed(() => {
      const date = new Date(year.value, month.value + 1, 0);
      return Array.from({ length: date.getDate() }, (_, i) => i + 1);
    });

    const daysOfWeekInMonth = computed(() => {
      return daysOfMonth.value.map((day) => {
        const date = new Date(year.value, month.value, day);
        return weekDays[date.getDay()];
      });
    });

    return {
      daysOfMonth,
      weekDays,
      daysOfWeekInMonth,
      isWeekend,
      year,
      month,
      isHoliday,
    };
  },
});
</script>

<style lang="scss">
.calendar-header {
  display: flex;
  justify-content: space-between;

  &-day {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 41px;

    .day-number {
      font-size: 12px;
      font-weight: 600;
    }
    .day-name {
      font-size: 10px;
      color: $el-text-color-regular;
    }
  }

  .day-weekend {
    background-color: $el-color-success-light-9;
  }

  .day-holiday {
    background-color: $el-color-danger-light-9;
    .day-number,
    .day-name {
      color: $el-color-danger;
    }
  }
}
</style>
