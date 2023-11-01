<template>
  <div class="work-session-panel">
    <RoleSelector :options="roles" />

    <div><WorkSessionButton /></div>

    <div><WorkModes /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import WorkSessionButton from "./WorkSessionButton.vue";
import RoleSelector from "./RoleSelector.vue";
import WorkModes from "./WorkModes.vue";

export default defineComponent({
  components: {
    WorkSessionButton,
    RoleSelector,
    WorkModes,
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
