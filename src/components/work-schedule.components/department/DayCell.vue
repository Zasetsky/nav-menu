<template>
  <div
    class="day"
    :class="{
      'day-weekend': isWeekendForUser && isWorkDay,
      'day-holiday': isHolidayForUser && isWorkDay,
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
    <div v-if="!isWeekendForUser">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";
import { DatesData } from "@/types";
import { useCalendar } from "@/composables/useCalendar";
import { birthday_icon } from "@/assets/icons/index";

export default defineComponent({
  components: { birthday_icon },

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
  },

  setup(props) {
    const { isWeekend, isHoliday } = useCalendar();
    const { date, dayData, birthday } = toRefs(props);

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
        dayData.value.isHoliday !== false
      );
    });

    return { isWeekendForUser, isHolidayForUser, isBirthday, isWorkDay };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/day-cell.scss";
</style>
