<template>
  <div class="department-list">
    <div class="search">
      <EmployeeSearch v-model="selectedEmployees" />
    </div>
    <div class="departments">
      <DepartmentItem
        v-for="(department, index) in filteredDepartments"
        :key="department.id"
        :department="department"
        :isLastItem="index === filteredDepartments.length - 1"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import DepartmentItem from "./DepartmentItem.vue";
import EmployeeSearch from "./EmployeeSearch.vue";
import { Department, Employee } from "@/types";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    DepartmentItem,
    EmployeeSearch,
  },
  setup() {
    const selectedEmployees = ref<Employee[]>([]);
    const store = useStore();

    const departments = computed(
      () => store.getters["Department/getAllDepartments"]
    );

    const filteredDepartments = computed(() => {
      if (selectedEmployees.value.length === 0) {
        return departments.value;
      } else {
        return departments.value
          .map((department: Department) => ({
            ...department,
            employees: department.employees.filter((employee: Employee) =>
              selectedEmployees.value.includes(employee)
            ),
          }))
          .filter((department: Department) => department.employees.length);
      }
    });

    return { selectedEmployees, filteredDepartments };
  },
});
</script>

<style lang="scss" scoped>
.department-list {
  min-height: 100vh;
  background-color: $el-color-success-light-9;
  border-right: 1px solid $el-color-primary-light-8;

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    border-bottom: 1px solid $el-color-primary-light-8;
  }
}
</style>
