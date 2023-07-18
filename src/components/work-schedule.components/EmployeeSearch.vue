<template>
  <div class="employee-search" @click.stop>
    <div
      class="search-container"
      :class="{ 'search-container--active': isActive }"
      @click="inputFocus"
    >
      <div class="search-container__employees-wrapper">
        <div class="employees">
          <span
            v-for="employee in selectedEmployees"
            :key="employee.id"
            class="employee-tag"
            @click.stop
          >
            {{ employee.name }}
            <i
              class="employee-tag--icon"
              v-html="close"
              @click.stop="removeEmployee(employee)"
            ></i>
          </span>
        </div>
        <i
          v-if="selectedEmployees.length > 0"
          class="search-container__employees-wrapper--all_close"
          v-html="all_close"
          @click.stop="clearAllEmployees"
        ></i>
      </div>
      <div v-if="!selectedEmployees.length || isActive" class="input-wrapper">
        <input
          type="text"
          v-model="search"
          :placeholder="!isActive ? 'Поиск' : ''"
          @input="handleInput"
          ref="searchInput"
        />
        <i class="el-icon-search search-icon"></i>
      </div>
    </div>

    <div v-if="isActive" class="employee-list">
      <div
        v-for="(department, index) in filteredDepartments"
        :key="department.id"
        class="employee-list__department"
      >
        <p class="employee-list__department--name">
          {{
            department.name.charAt(0).toUpperCase() +
            department.name.slice(1).toLowerCase()
          }}
          <button @click.stop="selectDepartment(department)">Весь отдел</button>
        </p>

        <div
          v-for="employee in department.employees"
          :key="employee.id"
          @click="selectEmployee(employee)"
          class="employee-list__employee"
        >
          {{ employee.name }}
        </div>

        <hr v-if="index !== filteredDepartments.length - 1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useStore } from "vuex";
import { Department, Employee } from "@/types";
import { close, all_close } from "@/assets/icons/index";

export default defineComponent({
  props: {
    modelValue: {
      type: Array as () => Employee[],
      default: () => [],
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const search = ref("");
    const isActive = ref(false);
    const selectedEmployees = ref<Employee[]>(props.modelValue);
    const store = useStore();
    const searchInput = ref<HTMLInputElement | null>(null);

    const handleOutsideClick = (e: MouseEvent) => {
      if (!e.composedPath().includes(searchInput.value as Node)) {
        isActive.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleOutsideClick);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleOutsideClick);
    });

    const departments = computed(
      () => store.getters["Department/getAllDepartments"]
    );

    const filteredDepartments = computed(() =>
      departments.value
        .map((department: Department) => ({
          ...department,
          employees: department.employees.filter(
            (employee: Employee) =>
              employee.name
                .toLowerCase()
                .includes(search.value.toLowerCase()) &&
              !selectedEmployees.value.includes(employee)
          ),
        }))
        .filter((department: Department) => department.employees.length)
    );

    const handleInput = () => {
      isActive.value = true;
    };

    const selectEmployee = (employee: Employee) => {
      if (!selectedEmployees.value.includes(employee)) {
        selectedEmployees.value.push(employee);
      }
      emit("update:modelValue", selectedEmployees.value);
      search.value = "";
      isActive.value = false;
    };

    const removeEmployee = (employee: Employee) => {
      const index = selectedEmployees.value.indexOf(employee);
      if (index !== -1) {
        selectedEmployees.value.splice(index, 1);
      }
      emit("update:modelValue", selectedEmployees.value);
    };

    const inputFocus = () => {
      isActive.value = true;
      nextTick(() => {
        if (searchInput.value) {
          searchInput.value.focus();
        }
      });
    };

    const selectDepartment = (department: Department) => {
      department.employees.forEach((employee) => {
        if (!selectedEmployees.value.includes(employee)) {
          selectedEmployees.value.push(employee);
        }
      });
      emit("update:modelValue", selectedEmployees.value);
      isActive.value = false;
    };

    const clearAllEmployees = () => {
      selectedEmployees.value = [];
      emit("update:modelValue", selectedEmployees.value);
      isActive.value = false;
    };

    return {
      search,
      filteredDepartments,
      handleInput,
      selectEmployee,
      isActive,
      close,
      all_close,
      selectedEmployees,
      removeEmployee,
      inputFocus,
      selectDepartment,
      clearAllEmployees,
      searchInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.employee-search {
  position: relative;
  background-color: #fff;
  width: 248px;
  font-size: 12px;
  font-weight: 600;

  .search-container {
    display: flex;
    flex-direction: column;
    padding: 5px;
    border: 1px solid $border-color-light;
    cursor: text;

    &--active {
      border: 1px solid $color-primary;
    }

    &__employees-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &--all_close {
        margin-right: 10px;
        cursor: pointer;
      }

      .employees {
        display: flex;
        flex-direction: column;

        .employee-tag {
          display: flex;
          width: fit-content;
          align-items: center;
          background-color: $border-color-lighter;
          border: 1px solid $border-color-light;
          border-radius: 4px;
          color: $color-primary;
          padding: 2px 0px 2px 5px;
          height: 20px;
          margin-left: 10px;
          margin-bottom: 5px;
          cursor: default;

          &--icon {
            margin-top: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .employee-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 99.4%;
    font-weight: 400;
    height: 252px;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid $color-primary;
    z-index: 1;

    &__department {
      padding: 0px 20px 0px 10px;
      font-size: 12px;
      color: $color-info;
      cursor: default;

      &--name {
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
          border: 1px solid $border-color-base;
          cursor: pointer;
          padding: 8px 15px;
          font-weight: 600;
          font-size: 12px;
          color: $main-palette-neutral-gray;
          border-radius: 4px;
          background-color: #fff;

          &:hover {
            background-color: $border-color-lighter;
            color: $color-primary;
          }
        }
      }

      hr {
        border: none;
        border-top: 1px solid $border-color-light;
      }
    }

    &__employee {
      margin-bottom: 20px;
      font-size: 14px;
      color: $main-palette-neutral-gray;
      cursor: pointer;
    }
  }

  .input-wrapper {
    position: relative;

    .search-icon {
      position: absolute;
      left: 5px;
      top: 2px;
      color: $main-palette-eutral-light-gray;
    }

    input {
      height: 100%;
      flex-grow: 1;
      border: none;
      outline: none;
      margin-left: 20px;

      &::placeholder {
        color: $main-palette-eutral-light-gray;
      }
    }
  }
}
</style>
