<template>
  <div class="work-schedule">
    <DepartmentList class="work-schedule--department-list" />
    <CalendarHeader class="work-schedule--calendar-header" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DepartmentList from "@/components/work-schedule.components/DepartmentList.vue";
import CalendarHeader from "@/components/work-schedule.components/CalendarHeader.vue";

export default defineComponent({
  components: { DepartmentList, CalendarHeader },
});
</script>

<style lang="scss" scoped>
.work-schedule {
  display: flex;
  align-items: flex-start;
  width: 100%;

  &--department-list {
    width: 17.5rem;
  }

  &--calendar-header {
    flex-grow: 1;
  }
}
</style>
