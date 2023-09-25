<template>
  <div class="employee" :style="isIntoFired ? { 'margin-bottom': '10px' } : {}">
    <div class="employee__card">
      <el-avatar class="employee--avatar" shape="square">
        <div
          class="employee--avatar--online-indicator"
          v-if="employee.isOnline && !isIntoFired"
        ></div>
        <div
          class="employee--avatar--offline-indicator"
          v-if="!employee.isOnline && !isIntoFired"
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
          <router-link
            v-if="isNotEmployeePage"
            class="employee__info__name-wrapper__icon-wrapper"
            to="/employees"
          >
            <i class="employee__info__name-wrapper--edit-icon"
              ><edit_comment_icon
                style="
                  display: flex;
                  align-items: baseline;
                  height: 12px;
                  width: 12px;
                "
            /></i>
          </router-link>
        </div>
        <p class="employee__info--phone">{{ employee.phone }}</p>
      </div>
    </div>
    <!-- v-if="isNotEmployeePage" -->
    <p v-if="!isIntoFired" class="employee--success">
      {{ successAndWarningStatuses.length
      }}<span class="employee--backslash">/</span>
      <span class="employee--danger">{{ dangerStatuses.length }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { Employee, StatusItem } from "@/types";
import { useIsNotEmployeePage } from "@/composables/useIsNotEmployeePage";
import { edit_comment_icon } from "@/assets/icons/index";
import { ElAvatar } from "element-plus";

import "element-plus/es/components/avatar/style/css";

export default defineComponent({
  components: {
    edit_comment_icon,
    ElAvatar,
  },

  props: {
    employee: {
      type: Object as () => Employee,
      required: true,
    },

    isIntoFired: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const nameElement = ref<HTMLElement | null>(null);

    const { isNotEmployeePage } = useIsNotEmployeePage();

    const employeeStatuses = computed(() => {
      if (!props.employee.dates) return [];
      return Object.entries(props.employee.dates)
        .filter(([dateStr]) => {
          const date = new Date(dateStr);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const isFuture = date > new Date();
          return !isWeekend && !isFuture;
        })
        .map(([, dateData]) => dateData.status);
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
      isNotEmployeePage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/employee-info.scss";
</style>
