<template>
  <div class="work-schedule">
    <div class="work-schedule__header">
      <span class="work-schedule__header--title">График работы</span>
    </div>
    <div class="work-schedule__content">
      <DepartmentList class="work-schedule__content--department-list" />
      <CalendarHeader class="work-schedule__content--calendar-header" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DepartmentList from "@/components/work-schedule.components/department/DepartmentList.vue";
import CalendarHeader from "@/components/work-schedule.components/calendar/CalendarHeader.vue";

export default defineComponent({
  components: { DepartmentList, CalendarHeader },
});
</script>

<style lang="scss" scoped>
.work-schedule {
  &__header {
    padding: 1rem;
    margin-top: 4px;
    border-bottom: 1px solid $el-border-color;
    &--title {
      font-weight: 900;
      font-size: 1.5rem;
      margin-left: 0.3125rem;
      color: $el-color-primary;
      height: 2.5rem;
    }
  }

  &__content {
    display: flex;
    align-items: flex-start;
    &--department-list {
      width: 17.5rem;
    }

    &--calendar-header {
      flex-grow: 1;
    }
  }
}
</style>
