<template>
  <div class="employee-row">
    <div class="employee-row__card">
      <div class="employee-row-info">
        <!-- <el-avatar :size="size" :src="circleUrl" /> -->
        <h3>{{ employee.name }}</h3>
        <p>{{ employee.phone }}</p>
      </div>
    </div>

    <div class="employee-row-days">
      <day-cell v-for="day in daysOfMonth" :key="day" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Employee } from "@/types";
import DayCell from "./DayCell.vue";

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

    const daysOfMonth = computed(() => {
      const date = new Date(year.value, month.value, 0);
      return Array.from({ length: date.getDate() }, (_, i) => i + 1);
    });

    return { daysOfMonth };
  },
});
</script>

<style lang="scss" scoped>
.employee-row {
  display: flex;
  align-items: center;

  &__card {
    min-width: 280px;
  }

  &-days {
    display: flex;
  }
}
</style>
