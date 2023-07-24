<template>
  <div class="calendar-header">
    <div class="calendar-header__head-wrapper">
      <div class="calendar-header__head-wrapper__picker">
        <date-picker />
      </div>
      <div class="calendar-header__head-wrapper__legend">
        <h3 class="calendar-header__head-wrapper__legend-title">
          Условные обозначения
        </h3>
        <calendar-legend />
      </div>
    </div>
    <div class="calendar-header__days-wrapper">
      <div
        v-for="(day, index) in daysOfMonth"
        :key="day"
        class="calendar-header__days-wrapper__day"
        :class="{
          'calendar-header__days-wrapper__day--weekend': isWeekend(
            new Date(year, month, day)
          ),
          'calendar-header__days-wrapper__day--holiday': isHoliday(day),
        }"
      >
        <div class="calendar-header__days-wrapper__day--number">
          {{ day }}
        </div>
        <div class="calendar-header__days-wrapper__day--name">
          {{ daysOfWeekInMonth[index] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useCalendar } from "@/composables/useCalendar";
import DatePicker from "./DatePicker.vue";
import CalendarLegend from "./CalendarLegend.vue";

export default defineComponent({
  components: { DatePicker, CalendarLegend },

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
      year,
      month,
      isWeekend,
      isHoliday,
    };
  },
});
</script>

<style lang="scss" scoped>
.calendar-header {
  cursor: default;

  &__head-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $el-border-color;

    &__legend {
      display: flex;
      align-items: center;
      margin-right: 32px;

      &-title {
        font-size: 18px;
        color: $el-text-color-primary;
        margin-right: 5px;
      }
    }
  }

  &__days-wrapper {
    display: flex;
    justify-content: space-between;

    &__day {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 41px;
      border-bottom: 1px solid $el-border-color;

      &--number {
        font-size: 12px;
        font-weight: 600;
      }

      &--name {
        font-size: 10px;
        color: $el-text-color-regular;
      }

      &--weekend {
        background-color: $el-color-success-light-9;
      }

      &--holiday {
        background-color: $el-color-danger-light-9;

        .calendar-header__days-wrapper__day--number,
        .calendar-header__days-wrapper__day--name {
          color: $el-color-danger;
        }
      }
    }
  }
}
</style>
