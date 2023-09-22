<template>
  <div class="footer-status">
    <div
      ref="openButton"
      class="footer-status__info"
      @click.stop="toggleShowOptions(!showOptions)"
      @mouseover="onMouseEnter"
      @mouseleave="onMouseLeave"
      :style="{ cursor: user.isAdmin ? 'pointer' : 'default' }"
    >
      <div class="footer-status__info-text">
        <span
          :style="{ backgroundColor: statusColor }"
          class="status-circle"
        ></span>
        <span>{{ statusText }}</span>
      </div>
      <i v-if="user.isAdmin" class="footer-status__arrow"
        ><day_statistic_arrow_r_icon :hover="isHovered || showOptions"
      /></i>
    </div>

    <status-select-window
      :status="status"
      :statuses="statuses"
      :getColor="getColor"
      :show="showOptions"
      :date="date"
      :employeeID="employeeID"
      :openButton="openButton"
      @mouseleave="toggleShowOptions(false)"
      @close="toggleShowOptions(false)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import StatusSelectWindow from "./StatusSelectWindow.vue";
import { day_statistic_arrow_r_icon } from "@/assets/icons/index";

interface Props {
  status: string;
  date: string;
  employeeID: number;
}

export default defineComponent({
  components: {
    StatusSelectWindow,
    day_statistic_arrow_r_icon,
  },

  props: {
    status: {
      type: String,
      required: true,
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

  setup(props: Props) {
    const store = useStore();
    const openButton = ref<HTMLElement | null>(null);
    const isHovered = ref(false);
    const statuses = ref([
      { value: "success", label: "День засчитан" },
      { value: "warning", label: "Нарушение" },
      { value: "danger", label: "День не засчитан" },
    ]);

    const user = computed(() => store.getters["User/getUser"]);

    const showOptions = computed(
      () => store.getters["LocalStates/getShowOptions"]
    );

    const statusColor = computed(() => getColor(props.status));

    const statusText = computed(() => {
      if (!props.status) return "";
      const statusText = statuses.value.find((s) => s.value === props.status);
      return statusText ? statusText.label : "";
    });

    const onMouseEnter = () => {
      isHovered.value = true;
    };

    const onMouseLeave = () => {
      isHovered.value = false;
    };

    const toggleShowOptions = (value: boolean) => {
      if (!user.value.isAdmin) return;
      store.dispatch("LocalStates/toggleShowOptions", value);
      store.dispatch("LocalStates/toggleIsEditing", false);
    };

    const getColor = (status: string) => {
      switch (status) {
        case "success":
          return "#6FCF97";
        case "danger":
          return "#EB5757";
        case "warning":
          return "#F2994A";
        default:
          return "transparent";
      }
    };

    return {
      user,
      showOptions,
      isHovered,
      statuses,
      statusColor,
      statusText,
      openButton,
      toggleShowOptions,
      getColor,
      onMouseEnter,
      onMouseLeave,
    };
  },
});
</script>

<style scoped lang="scss">
.footer-status {
  position: relative;
  width: 100%;
  color: var(--el-text-color-primary);
  font-weight: bold;
  cursor: default;

  &__info {
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    width: 100%;

    &-text {
      display: flex;
      align-items: center;
    }
  }

  .status-circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
