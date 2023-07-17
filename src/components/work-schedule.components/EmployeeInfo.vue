<template>
  <div class="employee">
    <div class="employee__card">
      <el-avatar class="employee--avatar" shape="square" />
      <div class="employee__info">
        <div class="employee__info__name-wrapper">
          <p class="employee__info__name-wrapper--name">{{ employee.name }}</p>
          <i class="el-icon-edit employee__info__name-wrapper--edit-icon"></i>
        </div>
        <p class="employee__info--phone">{{ employee.phone }}</p>
      </div>
    </div>
    <p class="employee--success">
      {{ successAndWarningStatuses.length }}/
      <span class="employee--danger">{{ dangerStatuses.length }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Employee, StatusItem } from "@/types";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    employee: {
      type: Object as () => Employee,
      required: true,
    },
  },

  setup() {
    const store = useStore();

    const allStatuses = computed(() => {
      return store.getters["Status/getAllStatuses"];
    });

    console.log(allStatuses);

    const successAndWarningStatuses = computed(() => {
      return allStatuses.value.filter(
        (status: StatusItem) =>
          status.dayStatus === "success" || status.dayStatus === "warning"
      );
    });

    const dangerStatuses = computed(() => {
      return allStatuses.value.filter(
        (status: StatusItem) => status.dayStatus === "danger"
      );
    });

    return { store, successAndWarningStatuses, dangerStatuses };
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
    height: 33px;
    width: 33px;
  }

  &__info {
    margin-left: 10px;
    color: $main-palette-neutral-dark-gray;

    &__name-wrapper {
      display: flex;
      align-items: center;

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
    color: $color-success;
    margin-right: 1rem;
  }

  &--danger {
    color: $color-danger;
  }
}
</style>
