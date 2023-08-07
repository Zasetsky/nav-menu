<template>
  <div class="department-list">
    <div class="search">
      <EmployeeSearch v-model="selectedEmployees" :isIntoFired="isIntoFired" />
    </div>
    <div class="departments" :class="{ isFired: isIntoFired }">
      <DepartmentItem
        v-for="(department, index) in filteredDepartments"
        :key="department.id"
        :department="department"
        :isIntoFired="isIntoFired"
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

  props: {
    isIntoFired: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const selectedEmployees = ref<Employee[]>([]);
    const stickySearch = ref<HTMLElement | null>(null);
    const store = useStore();

    const departments = computed(
      () => store.getters["Department/getAllDepartments"]
    );

    const filteredDepartments = computed(() => {
      let departmentsToFilter = departments.value;

      // Если isIntoFired равно true, то фильтруем отделы и сотрудников по полю isFired
      if (props.isIntoFired) {
        departmentsToFilter = departmentsToFilter
          .map((department: Department) => ({
            ...department,
            employees: department.employees.filter(
              (employee: Employee) => employee.isFired
            ),
          }))
          .filter((department: Department) => department.employees.length);
      }

      // Если есть выбранные сотрудники, то фильтруем отделы по этим сотрудникам
      if (selectedEmployees.value.length > 0) {
        departmentsToFilter = departmentsToFilter
          .map((department: Department) => ({
            ...department,
            employees: department.employees.filter((employee: Employee) =>
              selectedEmployees.value.includes(employee)
            ),
          }))
          .filter((department: Department) => department.employees.length);
      }

      return departmentsToFilter;
    });

    return {
      selectedEmployees,
      filteredDepartments,
      stickySearch,
    };
  },
});
</script>

<style lang="scss" scoped>
.department-list {
  min-height: calc(100vh - 5.1rem);
  background-color: $el-color-success-light-9;
  border-right: 1px solid $el-border-color;
  width: 280px;

  .search {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2px;
    padding: 14px;
    border-bottom: 1px solid $el-border-color;
    background-color: $el-color-success-light-9;
    z-index: 500;
  }

  .departments {
    margin-top: 45px;

    &.isFired {
      margin-top: 0;
    }
  }
}
</style>
