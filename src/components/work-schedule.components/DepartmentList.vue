<template>
  <div class="department-list">
    <EmployeeSearch v-model="search" />

    <div class="departments">
      <DepartmentItem
        v-for="department in filteredDepartments"
        :key="department.id"
        :department="department"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import DepartmentItem from "./DepartmentItem.vue";
import EmployeeSearch from "./EmployeeSearch.vue";
import { Department } from "@/types";

export default defineComponent({
  components: {
    DepartmentItem,
    EmployeeSearch,
  },
  setup() {
    const search = ref("");
    const activeNames = ref([]);

    const departments = ref<Department[]>([
      {
        id: 1,
        name: "ОТДЕЛ ПРОДАЖ",
        employees: [
          { id: 1, name: "Иван Иванов", phone: "+1234567890", isOnline: true },
          { id: 2, name: "Петр Петров", phone: "+0987654321", isOnline: false },
        ],
      },
      {
        id: 2,
        name: "БУХГАЛТЕРИЯ",
        employees: [
          {
            id: 1,
            name: "Владимир Владимиров",
            phone: "+1234567890",
            isOnline: true,
          },
          { id: 2, name: "Олег Олегов", phone: "+0987654321", isOnline: true },
        ],
      },
    ]);

    const filteredDepartments = computed(() => {
      if (search.value === "") {
        return departments.value;
      } else {
        return departments.value.map((department) => ({
          ...department,
          employees: department.employees.filter((employee) =>
            employee.name.toLowerCase().includes(search.value.toLowerCase())
          ),
        }));
      }
    });

    return { search, filteredDepartments, activeNames };
  },
});
</script>

<style lang="scss" scoped>
.department-list {
  min-height: 100vh;
  background-color: $main-palette-background-base;
}

.departments {
}
</style>
