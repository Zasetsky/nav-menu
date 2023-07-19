<template>
  <div
    class="employee-days"
    :style="{
      width: isCollapsed
        ? `calc(100vw - 21.25rem - ${scrollbarWidth}px)`
        : `calc(100vw - 34rem - ${scrollbarWidth}px)`,
    }"
  >
    <day-cell
      v-for="(dayData, date) in employee.dates"
      :key="date"
      :day-data="dayData"
      :date="(date as string)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import DayCell from "./DayCell.vue";
import { Employee } from "@/types";
import { useStore } from "vuex";

export default defineComponent({
  components: { DayCell },

  props: {
    employee: {
      type: Object as () => Employee,
      required: true,
    },
  },

  setup() {
    const store = useStore();

    const isCollapsed = computed(
      () => store.getters["LocalStates/getIsCollapsed"]
    );

    const scrollbarWidth = computed(
      () => store.getters["LocalStates/getScrollbarWidth"]
    );

    return { isCollapsed, scrollbarWidth };
  },
});
</script>

<style lang="scss" scoped>
.employee-days {
  display: flex;
  justify-content: space-between;
  transition: width 0.3s;
  border-top: 1px solid $el-fill-color-light;
  border-bottom: 1px solid $el-fill-color-light;
  height: 48px;
}
</style>
