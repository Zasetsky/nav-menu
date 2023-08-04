<template>
  <div class="department-list">
    <div class="search" ref="stickySearch">
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
    <div class="footer">
      <span>Онлайн: {{ onlineCount }}/{{ totalEmployees }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
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
    const stickySearch = ref<HTMLElement | null>(null);
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

    const onlineCount = computed(() => {
      let count = 0;
      for (const department of departments.value) {
        for (const employee of department.employees) {
          if (employee.isOnline) count++;
        }
      }
      return count;
    });

    const totalEmployees = computed(() => {
      let count = 0;
      for (const department of departments.value) {
        count += department.employees.length;
      }
      return count;
    });

    const updateSearchPosition = () => {
      if (stickySearch.value) {
        const stickyTop = stickySearch.value.getBoundingClientRect().top;
        if (window.scrollY > stickyTop) {
          stickySearch.value.style.position = "fixed";
          stickySearch.value.style.top = "0";
          stickySearch.value.style.marginLeft = "4px";
        } else {
          stickySearch.value.style.position = "static";
        }
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", updateSearchPosition);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", updateSearchPosition);
    });

    return {
      selectedEmployees,
      filteredDepartments,
      onlineCount,
      totalEmployees,
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    border-bottom: 1px solid $el-border-color;
    background-color: $el-color-success-light-9;
    z-index: 99999;
  }

  .footer {
    position: fixed;
    width: 16.261rem;
    color: $el-color-white;
    font-size: 12px;
    bottom: 0;
    padding: 10px;
    background-color: $el-color-primary;
  }
}
</style>
