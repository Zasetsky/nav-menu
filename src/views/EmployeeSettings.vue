<template>
  <div class="employee-settings">
    <div class="employee-settings__header">
      <span class="employee-settings__header--title">Сотрудники</span>
    </div>
    <department-list />
    <department-list-footer />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DepartmentList from "@/components/work-schedule.components/department/DepartmentList.vue";
import DepartmentListFooter from "@/components/work-schedule.components/footers/DepartmentListFooter.vue";

export default defineComponent({
  components: {
    DepartmentList,
    DepartmentListFooter,
  },
});
</script>
<style lang="scss" scoped>
.employee-settings {
  &__header {
    padding: 1rem;
    margin-top: 4px;
    border-bottom: 1px solid $el-border-color;

    &--title {
      font-weight: 900;
      font-size: 1.5rem;
      margin-left: 0.3125rem;
      color: $el-color-primary;
    }
  }
}
</style>
