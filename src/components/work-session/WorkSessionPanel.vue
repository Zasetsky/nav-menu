<template>
  <div class="work-session-panel">
    <RoleSelector :options="roles" />

    <div><WorkSessionButton /></div>

    <div style="width: 100%"><WorkModes /></div>
    <div style="min-width: 600px"></div>
    <el-tooltip
      popper-class="menu-custom-tooltip"
      effect="dark"
      content="Следующая задача"
      placement="bottom-end"
      :show-after="500"
    >
      <div style="cursor: pointer">
        <next_task_button_icon />
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import WorkSessionButton from "./WorkSessionButton.vue";
import RoleSelector from "./RoleSelector.vue";
import WorkModes from "./WorkModes.vue";
import { next_task_button_icon } from "@/assets/icons/index";
import { ElTooltip } from "element-plus";

import "element-plus/es/components/tooltip/style/css";

export default defineComponent({
  components: {
    WorkSessionButton,
    RoleSelector,
    WorkModes,
    next_task_button_icon,
    ElTooltip,
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
