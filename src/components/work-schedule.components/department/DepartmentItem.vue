<template>
  <div
    class="department"
    :class="{
      settings: !isNotEmployeePage && !isIntoFired,
      fired: isIntoFired,
    }"
  >
    <el-collapse v-model="isCollapsed" @change="handleCollapseChange">
      <el-collapse-item :name="department.name">
        <template #title>
          <div class="department__header">
            <h3 class="department__title">
              {{ department.name.toUpperCase() }}
            </h3>
            <i class="department__toggle-icon">
              <plus_icon v-if="!isDepartmentCollapsed" />
              <minus_icon v-else />
            </i>
          </div>
        </template>
        <transition name="slide-fade">
          <div v-if="isDepartmentCollapsed" class="department__content">
            <div
              v-for="(employee, index) in department.employees"
              :key="employee.id"
              class="department__employee-row"
            >
              <employee-row
                v-if="
                  (isIntoFired && employee.isFired) ||
                  (!isIntoFired && !employee.isFired)
                "
                :employee="employee"
                :isIntoFired="isIntoFired"
                :index="index"
              />
            </div>
          </div>
        </transition>
      </el-collapse-item>
    </el-collapse>
    <p v-if="!isIntoFired" class="department__isOnline">
      Онлайн: <span>{{ onlineEmployeesCount }}</span
      >/<span>{{ totalEmployees }}</span>
    </p>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import EmployeeRow from "./EmployeeRow.vue";
import { Department } from "@/types";
import { plus_icon, minus_icon } from "@/assets/icons/index";
import { useIsNotEmployeePage } from "@/composables/useIsNotEmployeePage";
import { ElCollapse, ElCollapseItem } from "element-plus";
import type { CollapseModelValue } from "element-plus";

import "element-plus/es/components/collapse/style/css";
import "element-plus/es/components/collapse-item/style/css";

export default defineComponent({
  components: {
    EmployeeRow,
    plus_icon,
    minus_icon,
    ElCollapse,
    ElCollapseItem,
  },
  props: {
    department: {
      type: Object as () => Department,
      required: true,
    },

    isLastItem: {
      type: Boolean,
      default: false,
    },

    isIntoFired: {
      type: Boolean,
      default: false,
    },

    allCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isCollapsed = ref<CollapseModelValue>(
      props.allCollapsed ? [] : [props.department.name]
    );

    const { isNotEmployeePage } = useIsNotEmployeePage();

    const handleCollapseChange = (val: CollapseModelValue) => {
      isCollapsed.value = val;
    };

    const onlineEmployeesCount = computed(() => {
      if (!props.isIntoFired) {
        // Если isIntoFired == false, подсчитываем онлайн сотрудников с isFired == false
        return props.department.employees.filter(
          (employee) => employee.isOnline && !employee.isFired
        ).length;
      }
      return 0; // Вернем 0, если isIntoFired == true
    });

    const totalEmployees = computed(() => {
      if (!props.isIntoFired) {
        // Если isIntoFired == false, подсчитываем всех сотрудников с isFired == false
        return props.department.employees.filter(
          (employee) => !employee.isFired
        ).length;
      }
      return 0; // Вернем 0, если isIntoFired == true
    });

    const isDepartmentCollapsed = computed(() => {
      return (
        Array.isArray(isCollapsed.value) &&
        isCollapsed.value.includes(props.department.name)
      );
    });

    // Отслеживаем изменения свойства allCollapsed
    watch(
      () => props.allCollapsed,
      (newVal) => {
        isCollapsed.value = newVal ? [] : [props.department.name];
      }
    );

    return {
      isCollapsed,
      onlineEmployeesCount,
      isNotEmployeePage,
      totalEmployees,
      isDepartmentCollapsed,
      handleCollapseChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.department {
  padding: 0 16px 0 16px;

  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    cursor: pointer;
  }

  &__title {
    display: flex;
    align-items: center;
    margin: 0;
    height: 32px;
    font-size: 14px;
    color: var(--el-color-primary-dark-2);
  }

  &__content {
    z-index: -1;
  }

  &__isOnline {
    font-weight: 600;
    color: var(--el-text-color-regular);
    font-size: 12px;
    cursor: default;
  }

  hr {
    border: none;
    border-top: 1px solid var(--el-border-color);
  }
}

.department:last-child {
  padding-bottom: 10px;
  &.settings {
    padding-bottom: 70px;
  }

  &.fired {
    margin-bottom: -20px;
    padding-bottom: 0;
  }
}
.slide-fade-enter-from {
  transform: translateY(-25px);
  opacity: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateY(-25px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease-in-out;
}
</style>
