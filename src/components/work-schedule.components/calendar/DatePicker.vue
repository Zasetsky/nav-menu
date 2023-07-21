<template>
  <div class="date-picker">
    <div class="date-picker__windows">
      <i class="arrow-icon" @click.stop="prevYear">
        <double_arrow_l_icon />
      </i>
      <i class="arrow-icon" @click.stop="prevMonth">
        <arrow_l_icon />
      </i>

      <div class="selected-dates">
        <month-picker />

        <year-picker />
      </div>

      <i class="arrow-icon" @click.stop="nextMonth">
        <arrow_r_icon />
      </i>
      <i class="arrow-icon" @click.stop="nextYear">
        <double_arrow_r_icon />
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import MonthPicker from "./MonthPicker.vue";
import YearPicker from "./YearPicker.vue";
import {
  double_arrow_l_icon,
  double_arrow_r_icon,
  arrow_l_icon,
  arrow_r_icon,
} from "@/assets/icons/index";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    MonthPicker,
    YearPicker,
    double_arrow_l_icon,
    double_arrow_r_icon,
    arrow_l_icon,
    arrow_r_icon,
  },
  setup() {
    const store = useStore();

    const currentYear = computed(
      () => store.getters["LocalStates/getSelectedYear"]
    );
    const currentMonth = computed(
      () => store.getters["LocalStates/getSelectedMonth"]
    );

    const nextYear = () => {
      if (currentYear.value < new Date().getFullYear()) {
        store.dispatch("LocalStates/updateYear", currentYear.value + 1);
      }
    };

    const prevYear = () => {
      if (currentYear.value > 2012) {
        store.dispatch("LocalStates/updateYear", currentYear.value - 1);
      }
    };

    const nextMonth = () => {
      const newMonth = currentMonth.value === 11 ? 0 : currentMonth.value + 1;
      const newYear =
        currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value;

      const currentDate = new Date();
      if (
        newYear < currentDate.getFullYear() ||
        (newYear === currentDate.getFullYear() &&
          newMonth <= currentDate.getMonth())
      ) {
        store.dispatch("LocalStates/updateMonth", newMonth);
        store.dispatch("LocalStates/updateYear", newYear);
      }
    };

    const prevMonth = () => {
      const newMonth = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
      const newYear =
        currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;

      if (newYear > 2012 || (newYear === 2012 && newMonth >= 0)) {
        store.dispatch("LocalStates/updateMonth", newMonth);
        store.dispatch("LocalStates/updateYear", newYear);
      }
    };

    return {
      nextMonth,
      prevMonth,
      nextYear,
      prevYear,
    };
  },
});
</script>

<style lang="scss" scoped>
.date-picker {
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  margin-left: 32px;

  &__windows {
    display: flex;
    align-items: center;

    .arrow-icon {
      cursor: pointer;
    }

    .selected-dates {
      display: flex;
      justify-content: center;
      min-width: 150px;
    }
  }
}
</style>
