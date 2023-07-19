<template>
  <div class="day" :class="{ 'day-weekend': isWeekend(date) }">
    <div v-if="!isWeekend(date)">
      <div
        v-if="new Date(date) > new Date()"
        class="day-circle day-circle-future"
      ></div>
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
import { defineComponent } from "vue";
import { DatesData } from "@/types";

export default defineComponent({
  props: {
    dayData: {
      type: Object as () => DatesData,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },

  setup() {
    const isWeekend = (date: string) => {
      const day = new Date(date).getDay();
      return day === 0 || day === 6;
    };

    return { isWeekend };
  },
});
</script>

<style lang="scss" scoped>
.day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &.day-weekend {
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
