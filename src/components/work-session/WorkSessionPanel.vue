<template>
  <div class="work-session-panel">
    <RoleSelector :options="roles" />

    <div><WorkSessionButton /></div>

    <div style="width: 100%"><WorkModes /></div>
    <div style="min-width: 600px"></div>
    <div style="cursor: pointer">
      <next_task_button_icon />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import WorkSessionButton from "./WorkSessionButton.vue";
import RoleSelector from "./RoleSelector.vue";
import WorkModes from "./WorkModes.vue";
import { next_task_button_icon } from "@/assets/icons/index";

export default defineComponent({
  components: {
    WorkSessionButton,
    RoleSelector,
    WorkModes,
    next_task_button_icon,
  },
  setup() {
    const roles = ref([
      { label: "Работа", value: "work" },
      { label: "Отдых", value: "rest" },
      // Добавьте другие типы по мере необходимости
    ]);

    const selectedType = ref("work"); // По умолчанию выбран "Работа"

    return {
      roles,
      selectedType,
    };
  },
});
</script>

<style scoped>
/* Стили */
.work-session-panel {
  display: flex;
}
</style>
