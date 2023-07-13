<template>
  <div class="department">
    <h2>{{ department.name }}</h2>
    <employee-row
      v-for="employee in department.employees"
      :key="employee.id"
      :employee="employee"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmployeeRow from "./EmployeeRow.vue";

interface Employee {
  id: number;
  name: string;
  phone: string;
}

interface Department {
  id: number;
  name: string;
  employees: Employee[];
}

export default defineComponent({
  components: {
    EmployeeRow,
  },
  props: {
    department: {
      type: Object as () => Department,
      required: true,
    },
  },
});
</script>
