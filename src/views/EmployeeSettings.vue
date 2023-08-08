<template>
  <div class="employee-settings">
    <div class="employee-settings__header">
      <span class="employee-settings__header--title">Сотрудники</span>
    </div>
    <div class="employee-settings__content">
      <department-list />
      <fired-employees />
    </div>
    <department-list-footer />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DepartmentList from "@/components/work-schedule.components/department/DepartmentList.vue";
import DepartmentListFooter from "@/components/work-schedule.components/footers/DepartmentListFooter.vue";
import FiredEmployees from "@/components/settings.components/FiredEmployees.vue";

export default defineComponent({
  components: {
    DepartmentList,
    DepartmentListFooter,
    FiredEmployees,
  },
});
</script>
<style lang="scss" scoped>
.employee-settings {
  &__header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--el-border-color);
    padding: 1rem;
    z-index: 9999;

    &--title {
      font-weight: 900;
      font-size: 1.5rem;
      // margin-left: 0.3125rem;
      color: var(--el-color-primary);
    }
  }
  &__content {
    margin-top: 3.79rem;
  }
}
</style>
