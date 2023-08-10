<template>
  <div class="department-list">
    <div class="search">
      <EmployeeSearch v-model="selectedEmployees" :isIntoFired="isIntoFired" />
    </div>

    <el-tooltip
      popper-class="department-menu-custom-tooltip"
      effect="dark"
      :content="
        allCollapsed ? 'Свернуть все разделы' : 'Развернуть все разделы'
      "
      placement="bottom"
      :show-after="500"
    >
      <div class="collapse-expand-icon">
        <i v-if="!allCollapsed" @click="collapseAllDepartments">
          <all_collapse_icon />
        </i>
        <i v-else @click="expandAllDepartments"><all_expand_icon /></i>
      </div>
    </el-tooltip>

    <div class="departments" :class="{ isFired: isIntoFired }">
      <DepartmentItem
        v-for="(department, index) in filteredDepartments"
        :key="department.id"
        :department="department"
        :isIntoFired="isIntoFired"
        :isLastItem="index === filteredDepartments.length - 1"
        :all-collapsed="allCollapsed"
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
import { all_collapse_icon, all_expand_icon } from "@/assets/icons/index";

export default defineComponent({
  components: {
    DepartmentItem,
    EmployeeSearch,
    all_collapse_icon,
    all_expand_icon,
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
    const allCollapsed = ref(false);

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

    const collapseAllDepartments = () => {
      allCollapsed.value = true;
    };

    const expandAllDepartments = () => {
      allCollapsed.value = false;
    };

    return {
      selectedEmployees,
      filteredDepartments,
      stickySearch,
      allCollapsed,
      collapseAllDepartments,
      expandAllDepartments,
    };
  },
});
</script>

<style lang="scss" scoped>
.department-list {
  min-height: calc(100vh - 5.1rem);
  background-color: var(--el-color-success-light-9);
  border-right: 1px solid var(--el-border-color);
  width: 280px;

  .collapse-expand-icon {
    display: flex;
    padding-top: 65px;
    justify-content: flex-end;
    margin-right: 16px;
    cursor: pointer;
  }

  .search {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2px;
    padding: 14px;
    border-bottom: 1px solid var(--el-border-color);
    background-color: var(--el-color-success-light-9);
    z-index: 500;
  }
}
</style>
