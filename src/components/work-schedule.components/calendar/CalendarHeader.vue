<template>
  <div
    class="calendar-header"
    :style="{
      width: isCollapsed ? `calc(100vw - 21.25rem)` : `calc(100vw - 34rem)`,
    }"
    ref="stickyHeader"
  >
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
          weekend: isWeekend(new Date(year, month, day)),
          holiday: isHoliday(day),
          preHoliday: isPreHoliday(day),
        }"
      >
        <div class="calendar-header__days-wrapper__day--number">
          {{ day }}
        </div>
        <div class="calendar-header__days-wrapper__day--name">
          {{ daysOfWeekInMonth[index] }}
        </div>

        <el-tooltip
          v-if="isPreHoliday(day)"
          popper-class="preHoliday-custom-tooltip"
          :content="'Предпраздничный день'"
          placement="top"
          :show-after="500"
        >
          <div class="icon-wrapper">
            <div class="preHoliday-icon-circle"></div>
            <i class="holiday-icon"><holliday_info_icon /></i>
          </div>
        </el-tooltip>
        <el-tooltip
          v-if="isHoliday(day)"
          popper-class="holiday-custom-tooltip"
          :content="getHolidayInfo(day)"
          placement="top"
          :show-after="500"
        >
          <div class="icon-wrapper">
            <div class="holiday-icon-circle"></div>
            <i class="holiday-icon"><holliday_info_icon /></i>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted } from "vue";
import { useCalendar } from "@/composables/useCalendar";
import DatePicker from "./DatePicker.vue";
import CalendarLegend from "./CalendarLegend.vue";
import { holliday_info_icon } from "@/assets/icons/index";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    DatePicker,
    CalendarLegend,
    holliday_info_icon,
  },

  setup() {
    const {
      weekDays,
      year,
      month,
      isWeekend,
      isHoliday,
      getHolidayInfo,
      isPreHoliday,
    } = useCalendar();

    const stickyHeader = ref<HTMLElement | null>(null);

    const store = useStore();

    const isCollapsed = computed(
      () => store.getters["LocalStates/getIsCollapsed"]
    );

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

    const updateHeaderPosition = () => {
      if (stickyHeader.value) {
        const stickyTop = stickyHeader.value.getBoundingClientRect().top;
        if (window.scrollY > stickyTop) {
          stickyHeader.value.style.position = "fixed";
          stickyHeader.value.style.top = "0";
          stickyHeader.value.style.right = "-1px";
        } else {
          stickyHeader.value.style.position = "static";
        }
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", updateHeaderPosition);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", updateHeaderPosition);
    });

    return {
      daysOfMonth,
      weekDays,
      daysOfWeekInMonth,
      year,
      month,
      stickyHeader,
      isCollapsed,
      isWeekend,
      isHoliday,
      getHolidayInfo,
      isPreHoliday,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/calendar-header.scss";
</style>
