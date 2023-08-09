<template>
  <div
    class="employee-days"
    :style="{
      width: isCollapsed ? `calc(100vw - 21.25rem)` : `calc(100vw - 34rem)`,
      borderTop: index === 0 ? '1px solid var(--el-border-color)' : 'none',
    }"
  >
    <day-cell
      v-for="(dayData, date) in employee.dates"
      :key="date"
      :day-data="dayData"
      :date="(date as string)"
      :birthday="employee.birthday"
      :employeeID="employee.id"
      :is-first-special-day="isFirstSpecialDay(date as string)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import DayCell from "./DayCell.vue";
import { Employee } from "@/types";
import { useStore } from "vuex";

export default defineComponent({
  components: { DayCell },

  props: {
    employee: {
      type: Object as () => Employee,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();

    const isSpecialDaySet = computed(() => {
      let specialDaysFound: Record<number, string> = {};
      const dates = Object.entries(props.employee.dates);

      // Сортируем даты по возрастанию
      dates.sort(
        ([dateA], [dateB]) =>
          new Date(dateA).getTime() - new Date(dateB).getTime()
      );

      for (const [date, dayData] of dates) {
        const month = new Date(date).getMonth();

        if (
          dayData.isVacation ||
          dayData.isBusinessTrip ||
          dayData.isSickDay ||
          dayData.isDayOff ||
          dayData.isMaternityLeave
        ) {
          if (!specialDaysFound[month]) {
            // Если особого дня в этом месяце ещё не было найдено, устанавливаем его
            specialDaysFound[month] = date;
          }
        }
      }

      // specialDaysFound теперь содержит дату первого особого дня в каждом месяце
      return specialDaysFound;
    });

    const isCollapsed = computed(
      () => store.getters["LocalStates/getIsCollapsed"]
    );

    const isFirstSpecialDay = (date: string): boolean => {
      const month = new Date(date).getMonth();
      return isSpecialDaySet.value[month] === date;
    };

    return { isCollapsed, isFirstSpecialDay };
  },
});
</script>

<style lang="scss" scoped>
.employee-days {
  display: flex;
  justify-content: space-between;
  transition: width 0.4s;
  border-bottom: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  height: 48px;
}
</style>
