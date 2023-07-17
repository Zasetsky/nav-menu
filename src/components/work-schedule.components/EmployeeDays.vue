<template>
  <div
    class="employee-days"
    :style="{
      width: isCollapsed ? 'calc(100vw - 21.25rem)' : 'calc(100vw - 34rem)',
    }"
  >
    <day-cell
      v-for="(dayData, date) in employee.dates"
      :key="date"
      :day-data="dayData"
      :date="date"
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

    return { isCollapsed };
  },
});
</script>

<style lang="scss" scoped>
.employee-days {
  display: flex;
  justify-content: space-between;
  transition: width 0.3s;
}
</style>
