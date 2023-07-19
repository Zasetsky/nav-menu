<template>
  <div class="department">
    <div class="department__header" @click="isCollapsed = !isCollapsed">
      <h3 class="department__title">{{ department.name.toUpperCase() }}</h3>
      <span
        class="department__toggle-icon"
        v-html="isCollapsed ? plus : minus"
      ></span>
    </div>
    <div v-show="!isCollapsed" class="department__content">
      <employee-row
        v-for="employee in department.employees"
        :key="employee.id"
        :employee="employee"
        class="department__employee-row"
      />
    </div>
    <p class="department__isOnline">
      Онлайн: <span>{{ onlineEmployeesCount }}</span
      >/<span>{{ department.employees.length }}</span>
    </p>
    <hr v-if="!isLastItem" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import EmployeeRow from "./EmployeeRow.vue";
import { Department } from "@/types";
import { plus, minus } from "@/assets/icons/index";

export default defineComponent({
  components: { EmployeeRow },
  props: {
    department: {
      type: Object as () => Department,
      required: true,
    },

    isLastItem: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isCollapsed = ref(false);

    const onlineEmployeesCount = computed(() => {
      return props.department.employees.filter((employee) => employee.isOnline)
        .length;
    });

    return { isCollapsed, plus, minus, onlineEmployeesCount };
  },
});
</script>

<style lang="scss" scoped>
.department {
  padding: 44px 16px 0 16px;

  &__header {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  &__title {
    margin: 0;
    height: 32px;
    font-size: 14px;
    color: $el-color-primary-dark-2;
  }

  &__isOnline {
    font-weight: 600;
    color: $el-text-color-regular;
    font-size: 12px;
  }

  hr {
    border: none;
    border-top: 1px solid $el-color-success-light-8;
  }
}
</style>
