<template>
  <div
    class="day"
    :class="{
      'day-weekend': isWeekend(new Date(date)) && isWorkDay,
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
    <div v-if="!isWeekend(new Date(date))">
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

    console.log(isBirthday.value);

    return { isWeekend, isHoliday, isBirthday, isWorkDay };
  },
});
</script>

<style lang="scss" scoped>
.day {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: auto;
  width: 100%;

  &-birthday-cirle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: -10px;
    background-color: $el-additional-color-special;
    border-radius: 50%;
  }

  &-birhday-icon {
    position: absolute;
    top: -5px;
  }

  &-birthday {
    border: 1px solid $el-additional-color-special;
  }

  &-vacation {
    background-color: $el-color-primary;

    .day-circle {
      border: 1px dashed $el-color-success;
    }
  }

  &-business-trip {
    background-color: $el-color-info;

    .day-circle {
      border: 1px dashed $el-color-success-light-3;
    }
  }

  &-sick {
    background-color: $el-color-category-top;

    .day-circle {
      border: 1px dashed $el-color-info;
    }
  }

  &-personal {
    background-color: $el-fill-color-darker;

    .day-circle {
      border: 1px dashed $el-color-primary;
    }
  }

  &-maternity-leave {
    background-color: $el-color-info-light-9;
  }

  &-holiday {
    background-color: $el-color-danger-light-9;
  }

  &-weekend {
    background-color: $el-color-success-light-9;
  }

  .day-circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;

    &-success {
      background: $el-color-success;
    }

    &-warning {
      background: $el-color-warning;
    }

    &-danger {
      background: $el-color-danger;
    }

    &-future {
      border: 1px solid $el-color-success;
      background: $el-color-white;
    }
  }
}
</style>
