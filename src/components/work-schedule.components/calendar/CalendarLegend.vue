<template>
  <div class="calendar-legend" ref="calendarLegend">
    <div
      @click="showCalendarLegend = true"
      @mouseenter="openPicker"
      @mouseleave="closePicker"
    >
      <div
        class="calendar-legend__selected"
        :class="{
          'calendar-legend__selected--show-picker': showCalendarLegend,
        }"
      >
        <question_icon />
      </div>
      <transition name="fade">
        <div
          v-if="showCalendarLegend"
          class="calendar-legend__body"
          @click.stop
        >
          <legend-popup-window-content />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { question_icon } from "@/assets/icons/index";
import LegendPopupWindowContent from "./LegendPopupWindowContent.vue";

export default defineComponent({
  components: { LegendPopupWindowContent, question_icon },
  setup() {
    const calendarLegend = ref<HTMLElement | null>(null);
    const showCalendarLegend = ref(false);

    const handleClickOutside = (event: Event) => {
      if (
        calendarLegend.value &&
        !calendarLegend.value.contains(event.target as Node)
      ) {
        showCalendarLegend.value = false;
      }
    };

    let timeoutId: number | undefined;
    const openPicker = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        showCalendarLegend.value = true;
      }, 400);
    };

    const closePicker = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        showCalendarLegend.value = false;
      }, 400);
    };

    onMounted(() => {
      document.addEventListener("mousedown", handleClickOutside);
    });

    onUnmounted(() => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    });

    return {
      calendarLegend,
      showCalendarLegend,
      openPicker,
      closePicker,
    };
  },
});
</script>

<style lang="scss" scoped>
.calendar-legend {
  position: relative;
  color: $el-text-color-regular;
  cursor: default;

  &__selected {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    color: $el-text-color-primary;
    cursor: pointer;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  &__body {
    position: absolute;
    border: 1px solid $el-color-info;
    background-color: $el-color-white;
    padding: 12px 10px;
    right: -23px;
    border-radius: 4px;
    top: 32px;
    width: 480px;
    height: 556px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      right: 32px;
      transform: translateX(50%);
      width: 14px;
      height: 14px;
      background-color: $el-color-white;
    }

    &::before {
      top: -7px;
      background-color: $el-color-info;
      z-index: 1;
    }

    &::after {
      top: -6px;
      z-index: 2;
    }

    &::before,
    &::after {
      transform: translateX(50%) rotate(45deg);
    }
  }
}
</style>
