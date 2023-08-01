<template>
  <div
    class="day"
    :class="{
      'day-weekend': isWeekendForUser && isWorkDay,
      'day-holiday': isHoliday(new Date(date).getDate()) && isWorkDay,
      'day-birthday': isBirthday,
      'day-vacation': dayData.isVacation,
      'day-business-trip': dayData.isBusinessTrip,
      'day-sick': dayData.isSickDay,
      'day-personal': dayData.isDayOff,
      'day-maternity-leave': dayData.isMaternityLeave,
    }"
  >
    <!-- День рождения -->
    <div v-if="isBirthday" class="day-birthday-cirle"></div>
    <i v-if="isBirthday" class="day-birhday-icon"><birthday_icon /></i>

    <!-- Круг -->
    <div
      v-if="!isWeekendForUser && !isHolidayForUser"
      @click.stop="showPopup"
      @mouseover="cancelCloseTimeout"
      @mouseleave="startHidePopup"
      ref="referenceElement"
    >
      <div
        v-if="new Date(date) > new Date() && isWorkDay"
        class="day-circle day-circle-future"
      ></div>

      <div v-else-if="!isWorkDay" class="day-circle"></div>

      <div
        v-else
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
import { defineComponent, toRefs, computed, ref, onUnmounted } from "vue";
import { DatesData } from "@/types";
import { useCalendar } from "@/composables/useCalendar";
import { birthday_icon } from "@/assets/icons/index";
import PopupWindow from "../day-statistics-popup-window/PopupWindow.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { birthday_icon, PopupWindow },

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
  },

  setup(props) {
    const { isWeekend, isHoliday } = useCalendar();
    const { date, dayData, birthday } = toRefs(props);
    const store = useStore();
    const isPopupVisible = ref(false);
    let closeTimeout: number | null = null;
    const referenceElement = ref<HTMLElement | null>(null);
    let clickHandler: ((event: MouseEvent) => void) | null = null;

    const referenceElementValue = computed(() => referenceElement.value);

    const showOptions = computed(() => {
      return store.getters["LocalStates/getshowOptions"];
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

    const hidePopup = () => {
      isPopupVisible.value = false;
    };

    const showPopup = () => {
      cancelCloseTimeout();
      isPopupVisible.value = true;
    };

    const onPopupMounted = () => {
      clickHandler = (event: MouseEvent) => {
        let targetElement: HTMLElement | null = event.target as HTMLElement; // здесь мы делаем приведение типа

        console.log(event.target as HTMLElement);

        while (targetElement) {
          // проверяем, является ли элемент target частью popover
          if (targetElement.classList.contains("popover-content")) {
            return;
          }
          targetElement = targetElement.parentElement;
        }
        // Если target не является частью popover, скрываем его
        hidePopup();
      };

      document.addEventListener("click", clickHandler);
    };

    onUnmounted(() => {
      if (clickHandler) {
        document.removeEventListener("click", clickHandler);
      }
    });

    const startHidePopup = () => {
      if (!showOptions.value) {
        closeTimeout = window.setTimeout(hidePopup, 40000);
      }
    };

    const cancelCloseTimeout = () => {
      if (closeTimeout !== null) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
    };

    return {
      isWeekendForUser,
      isHolidayForUser,
      isBirthday,
      isWorkDay,
      isPopupVisible,
      referenceElement,
      referenceElementValue,
      onPopupMounted,
      showPopup,
      startHidePopup,
      cancelCloseTimeout,
      isHoliday,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/day-cell.scss";
</style>
