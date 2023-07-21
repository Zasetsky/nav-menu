<template>
  <div class="month-picker" ref="monthPicker">
    <div @click="showMonthPicker = !showMonthPicker">
      <div
        class="month-picker__selected"
        :class="{ 'month-picker__selected--show-picker': showMonthPicker }"
      >
        {{ selectedMonth }}
      </div>
      <div v-if="showMonthPicker" class="month-picker__body" @click.stop>
        <div class="month-picker__header">
          <i v-html="picker_arrows_l" @click.stop="prevYear"></i>
          {{ localSelectedYear }}
          <i v-html="picker_arrows_r" @click.stop="nextYear"></i>
        </div>
        <hr />
        <div class="month-picker__months">
          <div
            v-for="(month, index) in selectionMonths"
            :key="index"
            @click="selectMonth(index)"
            :class="{
              'month-picker__month': true,
              'month-picker__month--selected': index === selectedMonthIndex,
            }"
          >
            {{ month }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import { useStore } from "vuex";
import { picker_arrows_l, picker_arrows_r } from "@/assets/icons/index";

export default defineComponent({
  setup() {
    const store = useStore();
    const monthPicker = ref<HTMLElement | null>(null);
    const showMonthPicker = ref(false);
    const displayMonths = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    const selectionMonths = [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ];

    const selectedMonthIndex = computed(
      () => store.getters["LocalStates/getSelectedMonth"]
    );
    const selectedYear = computed(
      () => store.getters["LocalStates/getSelectedYear"]
    );

    const localSelectedYear = ref(selectedYear.value);

    const selectedMonth = computed(
      () => displayMonths[selectedMonthIndex.value]
    );

    watch(selectedYear, (newYear) => {
      localSelectedYear.value = newYear;
    });

    const nextYear = () => {
      localSelectedYear.value++;
    };

    const prevYear = () => {
      localSelectedYear.value--;
    };

    const selectMonth = (index: number) => {
      store.dispatch("LocalStates/updateYear", localSelectedYear.value);
      store.dispatch("LocalStates/updateMonth", index);
      showMonthPicker.value = false;
    };

    const handleClickOutside = (event: Event) => {
      if (
        monthPicker.value &&
        !monthPicker.value.contains(event.target as Node)
      ) {
        showMonthPicker.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("mousedown", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("mousedown", handleClickOutside);
    });

    return {
      monthPicker,
      showMonthPicker,
      selectedMonth,
      localSelectedYear,
      selectionMonths,
      picker_arrows_l,
      picker_arrows_r,
      selectedMonthIndex,
      nextYear,
      prevYear,
      selectMonth,
    };
  },
});
</script>

<style lang="scss" scoped>
.month-picker {
  position: relative;
  color: $el-text-color-regular;
  cursor: default;

  &__selected {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    color: $el-text-color-primary;
    cursor: pointer;

    &:not(&--show-picker)::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 2px;
      background-color: $el-text-color-primary;
    }
  }

  &__body {
    position: absolute;
    border: 1px solid $el-border-color-lighter;
    background-color: $el-color-white;
    padding: 10px;
    left: -10px;
    border-radius: 4px;
    top: 32px;
    width: 322px;
    height: 248px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 32px;
      transform: translateX(-50%);
      width: 14px;
      height: 14px;
      background-color: $el-color-white;
    }

    &::before {
      top: -7px;
      background-color: $el-border-color-lighter;
      z-index: 1;
    }

    &::after {
      top: -6px;
      z-index: 2;
    }

    &::before,
    &::after {
      transform: translateX(-50%) rotate(45deg);
    }

    hr {
      border: none;
      border-top: 1px solid $el-border-color-lighter;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;

    i {
      cursor: pointer;
    }
  }

  &__months {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    place-items: center;

    .month-picker__month {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 73px;
      height: 64px;
      font-size: 12px;
      cursor: pointer;

      &--selected {
        text-transform: none;
        color: $el-color-primary;
        font-weight: 600;
      }
    }
  }
}
</style>
