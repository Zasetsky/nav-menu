<template>
  <div v-if="show" class="window-status-options">
    <div
      v-for="status in statuses"
      :key="status.value"
      class="option"
      :class="{
        'option--selected': status.value === selectedStatus,
      }"
      @click.stop="updateStatus(status.value)"
    >
      <div class="option__selectable-area">
        <div class="option__text">
          <span
            :style="{ backgroundColor: getColor(status.value) }"
            class="option__text__status-circle"
          ></span>
          {{ status.label }}
        </div>
        <i
          v-if="status.value === selectedStatus"
          class="el-icon-check option__icon--selected"
        ></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "StatusSelectWindow",
  props: {
    status: {
      type: String,
      required: true,
    },
    statuses: {
      type: Array as PropType<{ value: string; label: string }[]>,
      required: true,
    },
    getColor: {
      type: Function as PropType<(status: string) => string>,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },

    date: {
      type: String,
      required: true,
    },

    employeeID: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const selectedStatus = ref(props.status);

    const updateStatus = (status: string) => {
      selectedStatus.value = status;
      store.dispatch("Department/updateDayStatus", {
        employeeId: props.employeeID,
        date: props.date,
        dayStatus: status,
      });
    };

    return {
      selectedStatus,
      updateStatus,
    };
  },
});
</script>

<style scoped lang="scss">
.window-status-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 89px;
  position: absolute;
  left: 113%;
  top: -22px;
  width: 218px;
  border: 1px solid $el-color-primary;
  background-color: $el-color-success-light-9;
  border-radius: 4px;
  padding: 20px;
  z-index: 10;

  .option {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    justify-content: flex-start;
    color: $el-text-color-primary;

    &--selected {
      color: $el-color-primary;
      cursor: default;

      &:hover {
        color: $el-color-primary;
      }
    }

    &:not(&--selected) {
      cursor: pointer;

      &:hover {
        color: $el-color-success;
      }
    }

    &__selectable-area {
      display: flex;
    }

    &__text {
      display: flex;
      align-items: center;

      &__status-circle {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
      }
    }

    &__icon--selected {
      position: absolute;
      right: 20px;
      height: 24px;
      width: 24px;
      color: $el-color-primary;
    }
  }
}
</style>
