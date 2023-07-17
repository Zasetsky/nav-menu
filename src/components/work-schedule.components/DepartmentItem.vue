<template>
  <div class="department">
    <div class="department__header" @click="isCollapsed = !isCollapsed">
      <h3 class="department__title">{{ department.name }}</h3>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
  },
  setup() {
    const isCollapsed = ref(false);
    return { isCollapsed, plus, minus };
  },
});
</script>

<style lang="scss" scoped>
.department {
  padding: 44px 16px 0 16px;
  border-top: 1px solid $main-palette-success-border;
  border-bottom: 1px solid $main-palette-success-border;

  &__header {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  &__title {
    margin: 0;
    height: 32px;
    font-size: 14px;
    color: $main-palette-primary-darker-20;
  }

  &__toggle-icon {
  }

  &__content {
  }

  &__employee-row {
  }
}
</style>
