<template>
  <div class="date-picker">
    <div class="date-picker__windows">
      <i
        class="arrow-icon"
        v-html="calendar_arrows_l"
        @click.stop="prevYear"
      ></i>
      <i
        class="arrow-icon"
        v-html="calendar_arrow_l"
        @click.stop="prevMonth"
      ></i>

      <div class="selected-dates">
        <month-picker />

        <year-picker />
      </div>

      <i
        class="arrow-icon"
        v-html="calendar_arrow_r"
        @click.stop="nextMonth"
      ></i>
      <i
        class="arrow-icon"
        v-html="calendar_arrows_r"
        @click.stop="nextYear"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import MonthPicker from "./MonthPicker.vue";
import YearPicker from "./YearPicker.vue";
import {
  calendar_arrows_l,
  calendar_arrows_r,
  calendar_arrow_l,
  calendar_arrow_r,
} from "@/assets/icons/index";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    MonthPicker,
    YearPicker,
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
      store.dispatch("LocalStates/updateYear", currentYear.value + 1);
    };

    const prevYear = () => {
      store.dispatch("LocalStates/updateYear", currentYear.value - 1);
    };

    const nextMonth = () => {
      const newMonth = currentMonth.value === 11 ? 0 : currentMonth.value + 1;
      const newYear =
        currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value;

      store.dispatch("LocalStates/updateMonth", newMonth);
      store.dispatch("LocalStates/updateYear", newYear);
    };

    const prevMonth = () => {
      const newMonth = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
      const newYear =
        currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;

      store.dispatch("LocalStates/updateMonth", newMonth);
      store.dispatch("LocalStates/updateYear", newYear);
    };

    return {
      calendar_arrows_l,
      calendar_arrows_r,
      calendar_arrow_l,
      calendar_arrow_r,
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
