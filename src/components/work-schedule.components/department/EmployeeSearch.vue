<template>
  <div class="employee-search" @click.stop>
    <!-- Список сотрудников -->
    <div
      class="search-container"
      :class="{ 'search-container--active': isActive }"
      @click="inputFocus"
    >
      <div class="search-container__employees-wrapper">
        <div class="employees">
          <span
            v-for="employee in limitedEmployees"
            :key="employee.id"
            class="employee-tag"
            @click.stop
          >
            {{ employee.name }}
            <i class="employee-tag--icon" @click.stop="removeEmployee(employee)"
              ><close_icon
            /></i>
          </span>

          <!-- Скрыватель сотрудников -->
          <div
            v-if="selectedEmployees.length > 1"
            class="more"
            ref="more"
            @click.stop="showPopover = true"
            @mouseenter="openPopover"
            @mouseleave="closePopover"
          >
            +{{ selectedEmployees.length - 1 }}

            <!-- Всплывающее окно со списком выбранных сотрудников -->
            <div v-if="showPopover" class="popover" ref="popover">
              <div class="tag-wrapper">
                <div
                  v-for="employee in selectedEmployees.slice(1)"
                  :key="employee.id"
                  class="employee-tag"
                >
                  {{ employee.name }}
                  <i
                    class="employee-tag--icon"
                    @click.stop="removeEmployee(employee)"
                    ><close_icon
                  /></i>
                </div>
              </div>

              <!-- Закрыть в скрывателе -->
              <div class="clear-all">
                <i
                  @click.stop="clearAllHideEmployees"
                  v-if="selectedEmployees.length > 0"
                  class="search-container__employees-wrapper--all_close"
                  ><all_close_icon
                /></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Закрыть вообще все -->
        <div class="clear-all" @click.stop="clearAllEmployees">
          <i
            v-if="selectedEmployees.length > 0"
            class="search-container__employees-wrapper--all_close"
            ><all_close_icon
          /></i>
        </div>
      </div>

      <!-- Инпут -->
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

    <!-- Выпадающее окно -->
    <div v-if="isActive" class="employee-list" ref="dropdown">
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
          @click.stop="selectEmployee(employee)"
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
  onUnmounted,
  nextTick,
} from "vue";
import { useStore } from "vuex";
import { Department, Employee } from "@/types";
import { close_icon, all_close_icon } from "@/assets/icons/index";
import { useTransliterate } from "@/composables/useTransliterate";

export default defineComponent({
  components: {
    close_icon,
    all_close_icon,
  },

  props: {
    modelValue: {
      type: Array as () => Employee[],
      default: () => [],
    },

    isIntoFired: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const search = ref("");
    const isActive = ref(false);
    const selectedEmployees = ref<Employee[]>(props.modelValue);
    const store = useStore();
    const searchInput = ref<HTMLInputElement | null>(null);
    const showPopover = ref(false);
    const more = ref<HTMLElement | null>(null);
    const popover = ref<HTMLElement | null>(null);
    const dropdown = ref<HTMLElement | null>(null);
    let popoverTimeout: number | undefined;
    const { transliterate } = useTransliterate();
    const transliteratedSearch = ref("");

    const departments = computed(
      () => store.getters["Department/getAllDepartments"]
    );

    const limitedEmployees = computed(() => {
      return selectedEmployees.value.slice(0, 1);
    });

    const filteredDepartments = computed(() =>
      departments.value
        .map((department: Department) => ({
          ...department,
          employees: department.employees
            .filter(
              (employee: Employee) =>
                // Сначала фильтруем сотрудников по isFired
                (props.isIntoFired && employee.isFired) ||
                (!props.isIntoFired && !employee.isFired)
            )
            // Затем фильтруем по имени или названию отдела с использованием транслитерированного текста
            .filter(
              (employee: Employee) =>
                (employee.name
                  .toLowerCase()
                  .includes(transliteratedSearch.value.toLowerCase()) ||
                  department.name
                    .toLowerCase()
                    .includes(transliteratedSearch.value.toLowerCase())) &&
                !selectedEmployees.value.includes(employee)
            ),
        }))
        // Убираем отделы без подходящих сотрудников
        .filter((department: Department) => department.employees.length)
    );

    const handleInput = () => {
      transliteratedSearch.value = transliterate(search.value);
      isActive.value = true;
    };

    const selectEmployee = (employee: Employee) => {
      if (!selectedEmployees.value.includes(employee)) {
        selectedEmployees.value.push(employee);
      }
      emit("update:modelValue", selectedEmployees.value);
      search.value = "";
      transliteratedSearch.value = "";
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
      search.value = "";
    };

    const clearAllHideEmployees = () => {
      if (selectedEmployees.value.length > 0) {
        selectedEmployees.value = [selectedEmployees.value[0]];
      } else {
        selectedEmployees.value = [];
      }
      emit("update:modelValue", selectedEmployees.value);
      isActive.value = false;
    };

    const clearAllEmployees = () => {
      selectedEmployees.value = [];
      emit("update:modelValue", selectedEmployees.value);
      isActive.value = false;
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        !e.composedPath().includes(searchInput.value as Node) &&
        !e.composedPath().includes(more.value as Node) &&
        !e.composedPath().includes(popover.value as Node) &&
        !e.composedPath().includes(dropdown.value as Node)
      ) {
        isActive.value = false;
        showPopover.value = false;
        search.value = "";
        transliteratedSearch.value = "";
      }
    };

    const openPopover = () => {
      clearTimeout(popoverTimeout);
      popoverTimeout = setTimeout(() => {
        showPopover.value = true;
      }, 400);
    };

    const closePopover = () => {
      clearTimeout(popoverTimeout);
      popoverTimeout = setTimeout(() => {
        showPopover.value = false;
      }, 400);
    };

    onMounted(() => {
      document.addEventListener("mousedown", handleClickOutside);
    });

    onUnmounted(() => {
      clearTimeout(popoverTimeout);
      document.removeEventListener("mousedown", handleClickOutside);
    });

    return {
      search,
      filteredDepartments,
      isActive,
      selectedEmployees,
      searchInput,
      limitedEmployees,
      showPopover,
      more,
      popover,
      dropdown,
      openPopover,
      closePopover,
      removeEmployee,
      inputFocus,
      selectDepartment,
      clearAllEmployees,
      clearAllHideEmployees,
      handleInput,
      selectEmployee,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/search.scss";
</style>
