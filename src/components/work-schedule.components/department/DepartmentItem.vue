<template>
  <div class="department">
    <div class="department__header" @click="isCollapsed = !isCollapsed">
      <h3 class="department__title">{{ department.name.toUpperCase() }}</h3>
      <i class="department__toggle-icon">
        <plus_icon v-if="isCollapsed" />
        <minus_icon v-else />
      </i>
    </div>
    <div v-show="!isCollapsed" class="department__content">
      <employee-row
        v-for="(employee, index) in department.employees"
        :key="employee.id"
        :employee="employee"
        :index="index"
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
import { plus_icon, minus_icon } from "@/assets/icons/index";

export default defineComponent({
  components: { EmployeeRow, plus_icon, minus_icon },
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

    return { isCollapsed, onlineEmployeesCount };
  },
});
</script>

<style lang="scss" scoped>
.department {
  padding: 16px 16px 0 16px;

  &:first-child {
    padding-top: 44px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  &__title {
    display: flex;
    align-items: center;
    margin: 0;
    height: 32px;
    font-size: 14px;
    color: $el-color-primary-dark-2;
  }

  &__isOnline {
    font-weight: 600;
    color: $el-text-color-regular;
    font-size: 12px;
    cursor: default;
  }

  hr {
    border: none;
    border-top: 1px solid $el-color-success-light-8;
  }
}
</style>
