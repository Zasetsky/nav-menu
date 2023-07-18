<template>
  <div class="employee">
    <div class="employee__card">
      <el-avatar class="employee--avatar" shape="square">
        <div
          class="employee--avatar--online-indicator"
          v-show="employee.isOnline"
        ></div>
        <div
          class="employee--avatar--offline-indicator"
          v-show="!employee.isOnline"
        ></div>
      </el-avatar>
      <div class="employee__info">
        <div class="employee__info__name-wrapper">
          <p
            ref="nameElement"
            :style="nameStyle"
            class="employee__info__name-wrapper--name"
          >
            {{ employee.name }}
          </p>
          <i class="el-icon-edit employee__info__name-wrapper--edit-icon"></i>
        </div>
        <p class="employee__info--phone">{{ employee.phone }}</p>
      </div>
    </div>
    <p class="employee--success">
      {{ successAndWarningStatuses.length }}
      <span class="employee--backslash">/</span>
      <span class="employee--danger">{{ dangerStatuses.length }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { Employee, StatusItem } from "@/types";

export default defineComponent({
  props: {
    employee: {
      type: Object as () => Employee,
      required: true,
    },
  },

  setup(props) {
    const nameElement = ref(null) as any;

    const employeeStatuses = computed(() => {
      if (!props.employee.dates) return [];
      return Object.entries(props.employee.dates)
        .filter(([dateStr, _]) => {
          const date = new Date(dateStr);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const isFuture = date > new Date();
          return !isWeekend && !isFuture;
        })
        .map(([_, dateData]) => dateData.status);
    });

    const successAndWarningStatuses = computed(() => {
      return employeeStatuses.value.filter(
        (status: StatusItem) =>
          status.dayStatus === "success" || status.dayStatus === "warning"
      );
    });

    const dangerStatuses = computed(() => {
      return employeeStatuses.value.filter(
        (status: StatusItem) => status.dayStatus === "danger"
      );
    });

    const nameStyle = computed(() => {
      if (nameElement.value && nameElement.value.scrollWidth > 153) {
        return { width: "min-content" };
      }
      return {};
    });

    return {
      nameElement,
      nameStyle,
      successAndWarningStatuses,
      dangerStatuses,
    };
  },
});
</script>

<style lang="scss" scoped>
.employee {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 16.5rem;

  &__card {
    display: flex;
    align-items: center;
  }

  &--avatar {
    position: relative;
    height: 33px;
    width: 33px;

    &--online-indicator {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 8px;
      height: 8px;
      border: 2px solid $main-palette-background-base;
      background-color: $color-success;
      border-radius: 50%;
    }

    &--offline-indicator {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 8px;
      height: 8px;
      border: 2px solid $main-palette-background-base;
      background-color: $color-danger;
      border-radius: 50%;
    }
  }

  &__info {
    margin-left: 10px;
    color: $main-palette-neutral-dark-gray;

    &__name-wrapper {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;

      &--name {
        margin: 0;
        font-weight: 600;
      }

      &--edit-icon {
        font-size: 12px;
        color: $main-palette-eutral-light-gray;
        margin-left: 5px;
      }
    }

    &--phone {
      margin: 2px 0;
      color: $main-palette-neutral-midgray;
      font-size: 10px;
    }
  }

  &--success {
    flex-shrink: 0;
    color: $color-success;
    margin-right: 1rem;
  }

  &--danger {
    color: $color-danger;
  }
}
</style>
