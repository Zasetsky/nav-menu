<template>
  <div class="month-picker" ref="monthPicker">
    <div
      @click="showMonthPicker = true"
      @mouseenter="openPicker"
      @mouseleave="closePicker"
    >
      <div
        class="month-picker__selected"
        :class="{ 'month-picker__selected--show-picker': showMonthPicker }"
      >
        {{ selectedMonth }}
      </div>
      <transition name="fade">
        <div v-if="showMonthPicker" class="month-picker__body" @click.stop>
          <div class="month-picker__header">
            <i @click.stop="prevYear">
              <double_arrow_l_icon :width="'20'" :height="'20'" />
            </i>
            {{ localSelectedYear }}
            <i @click.stop="nextYear">
              <double_arrow_r_icon :width="'20'" :height="'20'" />
            </i>
          </div>
          <hr />
          <div class="month-picker__months">
            <div
              v-for="(month, index) in selectionMonths"
              :key="index"
              @click="selectMonth(index)"
              :class="getMonthClasses(index)"
            >
              {{ month }}
            </div>
          </div>
        </div>
      </transition>
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
import { double_arrow_l_icon, double_arrow_r_icon } from "@/assets/icons/index";

export default defineComponent({
  components: {
    double_arrow_l_icon,
    double_arrow_r_icon,
  },

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
      if (localSelectedYear.value < new Date().getFullYear()) {
        localSelectedYear.value++;
      }
    };

    const prevYear = () => {
      if (localSelectedYear.value > 2012) {
        localSelectedYear.value--;
      }
    };

    const selectMonth = (index: number) => {
      const currentDate = new Date();
      if (
        localSelectedYear.value < currentDate.getFullYear() ||
        (localSelectedYear.value === currentDate.getFullYear() &&
          index <= currentDate.getMonth())
      ) {
        store.dispatch("LocalStates/updateYear", localSelectedYear.value);
        store.dispatch("LocalStates/updateMonth", index);
        showMonthPicker.value = false;
      }
    };

    const handleClickOutside = (event: Event) => {
      if (
        monthPicker.value &&
        !monthPicker.value.contains(event.target as Node)
      ) {
        showMonthPicker.value = false;
        localSelectedYear.value = selectedYear.value;
      }
    };

    let timeoutId: number | undefined;
    const openPicker = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        showMonthPicker.value = true;
      }, 400);
    };

    const closePicker = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        showMonthPicker.value = false;
        localSelectedYear.value = selectedYear.value;
      }, 400);
    };

    const getMonthClasses = (index: number) => {
      return {
        "month-picker__months__item": true,
        "month-picker__months__item--selected":
          index === selectedMonthIndex.value &&
          selectedYear.value === localSelectedYear.value,
        "month-picker__months__item--disabled":
          localSelectedYear.value === new Date().getFullYear() &&
          index > new Date().getMonth(),
      };
    };

    onMounted(() => {
      document.addEventListener("mousedown", handleClickOutside);
    });

    onUnmounted(() => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    });

    return {
      monthPicker,
      showMonthPicker,
      selectedMonth,
      localSelectedYear,
      selectedYear,
      selectionMonths,
      selectedMonthIndex,
      nextYear,
      prevYear,
      selectMonth,
      openPicker,
      closePicker,
      getMonthClasses,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/pickers.scss";

.month-picker {
  @include picker(months, var(--el-text-color-primary));
}
</style>
