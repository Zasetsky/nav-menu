<template>
  <div class="employee">
    <div class="employee-info">
      <h3>{{ employee.name }}</h3>
      <p>{{ employee.phone }}</p>
    </div>
    <div v-for="day in daysOfMonth" :key="day" class="employee-day">
      <div class="day-circle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";

interface Employee {
  id: number;
  name: string;
  phone: string;
}

export default {
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
};
</script>

<style scoped>
.employee-day {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.day-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff0000;
  margin-right: 5px;
}

.day-circle:nth-child(2n) {
  background: #00ff00;
}

.day-circle:nth-child(3n) {
  background: #0000ff;
}
</style>
