<template>
  <div class="day" :class="dayClass">
    <!-- День рождения -->
    <div v-if="isBirthday" class="day-birthday-cirle"></div>
    <i v-if="isBirthday" class="day-birhday-icon"><birthday_icon /></i>

    <!-- Подсказка особых дней -->
    <el-tooltip
      v-if="isFirstSpecialDay"
      popper-class="special-day-custom-tooltip"
      :content="specialDayText"
      placement="top"
      :show-after="500"
    >
      <div class="special-day">
        <div class="special-day--cirle"></div>
        <i class="special-day--info-icon">
          <holliday_info_icon />
        </i>
      </div>
    </el-tooltip>

    <!-- Круг -->
    <div v-if="!isWeekendForUser && !isHolidayForUser" ref="referenceElement">
      <div
        v-if="new Date(date) > new Date() && isWorkDay"
        class="day-circle day-circle-future"
      ></div>

      <div v-else-if="!isWorkDay" class="day-circle"></div>

      <div
        v-else
        @click.stop="showPopup"
        @mouseover="cancelCloseTimeout"
        @mouseleave="startHidePopup"
        class="day-circle"
        :class="{
          'day-circle-success': dayData.status.dayStatus === 'success',
          'day-circle-warning': dayData.status.dayStatus === 'warning',
          'day-circle-danger': dayData.status.dayStatus === 'danger',
        }"
      ></div>
    </div>

    <PopupWindow
      v-if="isPopupVisible"
      ref="popover"
      :visible="isPopupVisible"
      :date="date"
      :workPointsForDate="dayData.workPoints"
      :dateData="dayData"
      :employeeID="employeeID"
      :referenceElement="referenceElementValue"
      @mounted="onPopupMounted"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, ref, watch } from "vue";
import { DatesData } from "@/types";
import { useCalendar } from "@/composables/useCalendar";
import { birthday_icon, holliday_info_icon } from "@/assets/icons/index";
import PopupWindow from "../day-statistics-popup-window/PopupWindow.vue";
import usePopup from "@/composables/usePopup";
import { useStore } from "vuex";
import { ElTooltip } from "element-plus";

import "element-plus/es/components/tooltip/style/css";

export default defineComponent({
  components: { birthday_icon, holliday_info_icon, PopupWindow, ElTooltip },

  props: {
    dayData: {
      type: Object as () => DatesData,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    birthday: {
      type: String,
      required: true,
    },

    employeeID: {
      type: Number,
      required: true,
    },

    isFirstSpecialDay: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props) {
    // Data:
    const { isWeekend, isHoliday, isPreHoliday } = useCalendar();
    const { date, dayData, birthday } = toRefs(props);
    const referenceElement = ref<HTMLElement | null>(null);
    const {
      isPopupVisible,
      hidePopup,
      showPopup,
      startHidePopup,
      cancelCloseTimeout,
    } = usePopup(props.date);
    let clickHandler: ((event: MouseEvent) => void) | null = null;
    const store = useStore();

    // Computed:

    const referenceElementValue = computed(() => referenceElement.value);

    const specialDays = computed(() => {
      return (
        dayData.value.isVacation ||
        dayData.value.isBusinessTrip ||
        dayData.value.isSickDay ||
        dayData.value.isDayOff ||
        dayData.value.isMaternityLeave
      );
    });

    const dayClass = computed(() => {
      return {
        "day-weekend": isWeekend(new Date(date.value)),
        "day-holiday":
          isHoliday(new Date(date.value).getDate()) && isWorkDay.value,
        "day-preHoliday":
          isPreHoliday(new Date(date.value).getDate()) && isWorkDay.value,
        "day-birthday": isBirthday.value,
        "day-vacation": dayData.value.isVacation,
        "day-business-trip": dayData.value.isBusinessTrip,
        "day-sick": dayData.value.isSickDay,
        "day-personal": dayData.value.isDayOff,
        "day-maternity-leave": dayData.value.isMaternityLeave,
      };
    });

    const specialDayText = computed(() => {
      if (dayData.value.isVacation) {
        return "Отпуск";
      } else if (dayData.value.isBusinessTrip) {
        return "Командировка";
      } else if (dayData.value.isSickDay) {
        return "Больничный";
      } else if (dayData.value.isDayOff) {
        return "Отгул";
      } else if (dayData.value.isMaternityLeave) {
        return "Декрет";
      } else {
        return ""; // Если никакой специальный день не наступил
      }
    });

    const isBirthday = computed(() => {
      const [day, month, year] = birthday.value.split("-");
      const birthDate = new Date(`${month}-${day}-${year}`);
      const currentDate = new Date(date.value);
      return (
        birthDate.getDate() === currentDate.getDate() &&
        birthDate.getMonth() === currentDate.getMonth()
      );
    });

    const isWorkDay = computed(() => {
      return (
        !dayData.value.isVacation &&
        !dayData.value.isBusinessTrip &&
        !dayData.value.isSickDay &&
        !dayData.value.isDayOff &&
        !dayData.value.isMaternityLeave
      );
    });

    const isWeekendForUser = computed(() => {
      return (
        isWeekend(new Date(date.value)) && dayData.value.isWeekend !== false
      );
    });

    const isHolidayForUser = computed(() => {
      return (
        isHoliday(new Date(date.value).getDate()) &&
        dayData.value.isHoliday === true
      );
    });

    // Watch:

    watch(isPopupVisible, (newValue, oldValue) => {
      if (!newValue && oldValue) {
        removeMouseHandlers();

        if (clickHandler) {
          document.removeEventListener("click", clickHandler);
        }
      }
    });

    // Methods:

    const removeMouseHandlers = () => {
      const popover = document.querySelector(".popover-content");
      if (popover) {
        popover.removeEventListener("mouseenter", cancelCloseTimeout);
        popover.removeEventListener("mouseleave", startHidePopup);
      }
    };

    const onPopupMounted = () => {
      clickHandler = (event: MouseEvent) => {
        let targetElement: HTMLElement | null = event.target as HTMLElement; // здесь мы делаем приведение типа

        while (targetElement) {
          // проверяем, является ли элемент target частью popover
          if (targetElement.classList.contains("popover-content")) {
            return;
          }
          targetElement = targetElement.parentElement;
        }
        // Если target не является частью popover, скрываем его
        hidePopup();
        store.dispatch("LocalStates/toggleIsEditing", false);
      };

      document.addEventListener("click", clickHandler);

      const addMouseHandlers = () => {
        const popover = document.querySelector(".popover-content");

        if (popover) {
          popover.addEventListener("mouseenter", cancelCloseTimeout);
          popover.addEventListener("mouseleave", startHidePopup);
        }
      };

      addMouseHandlers();
    };

    return {
      isWeekendForUser,
      isHolidayForUser,
      isBirthday,
      dayClass,
      specialDays,
      specialDayText,
      isWorkDay,
      isPopupVisible,
      referenceElement,
      referenceElementValue,
      onPopupMounted,
      showPopup,
      startHidePopup,
      cancelCloseTimeout,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/day-cell.scss";
</style>
