<template>
  <div class="department">
    <el-collapse v-model="isCollapsed" @change="handleCollapseChange">
      <el-collapse-item :name="department.name">
        <template #title>
          <div class="department__header">
            <h3 class="department__title">
              {{ department.name.toUpperCase() }}
            </h3>
            <i class="department__toggle-icon">
              <plus_icon v-if="!isCollapsed.includes(department.name)" />
              <minus_icon v-else />
            </i>
          </div>
        </template>
        <transition name="slide-fade">
          <div
            v-if="isCollapsed.includes(department.name)"
            class="department__content"
          >
            <div
              v-for="(employee, index) in department.employees"
              :key="employee.id"
              class="department__employee-row"
            >
              <employee-row :employee="employee" :index="index" />
            </div>
          </div>
        </transition>
      </el-collapse-item>
    </el-collapse>
    <p class="department__isOnline">
      Онлайн: <span>{{ onlineEmployeesCount }}</span
      >/<span>{{ department.employees.length }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import EmployeeRow from "./EmployeeRow.vue";
import { Department } from "@/types";
import { plus_icon, minus_icon } from "@/assets/icons/index";

export default defineComponent({
  components: { EmployeeRow, plus_icon, minus_icon },
  props: {
    department: {
      type: Object as () => Department,
      required: true,
    },
    isLastItem: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isCollapsed = ref<string[]>([]);

    const handleCollapseChange = (val: string[]) => {
      isCollapsed.value = val;
      console.log(isCollapsed.value);
    };

    const onlineEmployeesCount = computed(() => {
      return props.department.employees.filter((employee) => employee.isOnline)
        .length;
    });

    return { isCollapsed, onlineEmployeesCount, handleCollapseChange };
  },
});
</script>

<style lang="scss" scoped>
.department {
  padding: 0 16px 0 16px;

  &:first-child {
    padding-top: 44px;
  }

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
    color: $el-color-primary-dark-2;
  }

  &__content {
    z-index: -1;
  }

  &__isOnline {
    font-weight: 600;
    color: $el-text-color-regular;
    font-size: 12px;
    cursor: default;
  }
}

.department:last-child {
  padding-bottom: 15px;
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
