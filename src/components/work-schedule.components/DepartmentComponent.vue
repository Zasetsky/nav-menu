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
import { Department } from "@/types";

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
