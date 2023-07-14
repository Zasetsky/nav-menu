<template>
  <div
    class="employee-days"
    :style="{
      width: isCollapsed ? 'calc(100vw - 21.25rem)' : 'calc(100vw - 34rem)',
    }"
  >
    <day-cell v-for="day in daysOfMonth" :key="day" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
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
    const month = ref(new Date().getMonth() + 1);
    const year = ref(new Date().getFullYear());
    const store = useStore();

    const isCollapsed = computed(
      () => store.getters["LocalStates/getIsCollapsed"]
    );

    const daysOfMonth = computed(() => {
      const date = new Date(year.value, month.value, 0);
      return Array.from({ length: date.getDate() }, (_, i) => i + 1);
    });

    return { daysOfMonth, isCollapsed };
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
