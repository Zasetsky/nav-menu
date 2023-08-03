<template>
  <div class="work-schedule">
    <div class="work-schedule__header">
      <span class="work-schedule__header--title">График работы</span>
    </div>
    <div class="work-schedule__content">
      <DepartmentList class="work-schedule__content--department-list" />
      <CalendarHeader class="work-schedule__content--calendar-header" />
    </div>
    <div class="footer">
      <span>Рабочих дней в месяце: {{ workDaysCount }}</span>
      <span>Выходных дней: {{ weekendDaysCount }}</span>
      <span>Праздников: {{ holidaysCount }}</span>
      <button class="scroll-to-top" @click="scrollToTop" v-show="isScrolled">
        Наверх
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted, ref } from "vue";
import DepartmentList from "@/components/work-schedule.components/department/DepartmentList.vue";
import CalendarHeader from "@/components/work-schedule.components/calendar/CalendarHeader.vue";
import { useCalendar } from "@/composables/useCalendar";

export default defineComponent({
  components: { DepartmentList, CalendarHeader },

  setup() {
    const { month, year, isWeekend, isHoliday } = useCalendar();
    const date = new Date(year.value, month.value + 1, 0);

    const isScrolled = ref(false);

    const workDaysCount = computed(() => {
      let count = 0;
      for (let i = 1; i <= date.getDate(); i++) {
        if (!isWeekend(new Date(year.value, month.value, i))) {
          count++;
        }
      }
      return count;
    });

    const weekendDaysCount = computed(() => {
      let count = 0;
      for (let i = 1; i <= date.getDate(); i++) {
        if (isWeekend(new Date(year.value, month.value, i))) {
          count++;
        }
      }
      return count;
    });

    const holidaysCount = computed(() => {
      let count = 0;
      for (let i = 1; i <= date.getDate(); i++) {
        if (isHoliday(i)) {
          count++;
        }
      }
      return count;
    });

    window.onscroll = () => {
      isScrolled.value = window.scrollY > 200;
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const updateScroll = () => {
      localStorage.setItem("scroll", window.scrollY.toString());
    };

    onMounted(() => {
      window.addEventListener("scroll", updateScroll);
      const scroll = localStorage.getItem("scroll");
      if (scroll) {
        window.scrollTo(0, Number(scroll));
      }
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", updateScroll);
    });

    return {
      workDaysCount,
      weekendDaysCount,
      holidaysCount,
      isScrolled,
      scrollToTop,
    };
  },
});
</script>

<style lang="scss" scoped>
.work-schedule {
  &__header {
    padding: 1rem;
    margin-top: 4px;
    border-bottom: 1px solid $el-border-color;

    &--title {
      font-weight: 900;
      font-size: 1.5rem;
      margin-left: 0.3125rem;
      color: $el-color-primary;
    }
  }

  &__content {
    display: flex;
    align-items: flex-start;
    &--department-list {
      width: 17.5rem;
    }

    &--calendar-header {
      flex-grow: 1;
    }
  }
  .footer {
    position: fixed;
    width: 100%;
    margin-left: 281px;
    font-size: 12px;
    bottom: 0;
    padding: 10px;
    z-index: 9999;
    color: $el-color-white;
    background-color: $el-color-primary;

    span:not(:first-child) {
      margin-left: 40px;
    }

    .scroll-to-top {
      position: fixed;
      right: 20px;
      bottom: 20px;
      padding: 10px;
      border: none;
      background-color: $el-color-primary;
      color: $el-color-white;
      border-radius: 4px;
      cursor: pointer;
      z-index: 9999;
    }
  }
}
</style>
