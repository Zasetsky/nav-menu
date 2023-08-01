<template>
  <div class="footer-status">
    <div
      class="footer-status__info"
      @click.stop="toggleShowOptions(!showOptions)"
      :style="{ cursor: user.isAdmin ? 'pointer' : 'default' }"
    >
      <div class="footer-status__info-text">
        <span
          :style="{ backgroundColor: statusColor }"
          class="status-circle"
        ></span>
        <span>{{ statusText }}</span>
      </div>
      <i
        v-if="user.isAdmin"
        class="el-icon-arrow-right footer-status__arrow"
        :class="{ 'footer-status__arrow--hover': isHovered || showOptions }"
      ></i>
    </div>

    <status-select-window
      ref="statusSelectWindow"
      :status="status"
      :statuses="statuses"
      :getColor="getColor"
      :show="showOptions"
      :date="date"
      :employeeID="employeeID"
      @mouseleave="onMouseLeave"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  ComponentPublicInstance,
} from "vue";
import { useStore } from "vuex";
import StatusSelectWindow from "./StatusSelectWindow.vue";

interface Props {
  status: string;
  date: string;
  employeeID: number;
}

export default defineComponent({
  components: {
    StatusSelectWindow,
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
    const user = computed(() => store.getters["User/getUser"]);
    const showOptions = computed(
      () => store.getters["LocalStates/getshowOptions"]
    );
    const isHovered = ref(false);
    const statusSelectWindow = ref<ComponentPublicInstance | null>(null);
    const statuses = ref([
      { value: "success", label: "День засчитан" },
      { value: "warning", label: "Нарушение" },
      { value: "danger", label: "День не засчитан" },
    ]);

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
      toggleShowOptions(false);
    };

    const toggleShowOptions = (value: boolean) => {
      if (!user.value.isAdmin) return;
      store.dispatch("LocalStates/toggleShowOptions", value);
    };

    const closeOnOutsideClick = (event: Event) => {
      if (statusSelectWindow.value) {
        const el = statusSelectWindow.value.$el;
        if (el && !el.contains(event.target as Node)) {
          toggleShowOptions(false);
        }
      }
    };

    onMounted(() => {
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("click", closeOnOutsideClick);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", closeOnOutsideClick);
    });

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
      toggleShowOptions,
      getColor,
      onMouseLeave,
    };
  },
});
</script>

<style scoped lang="scss">
.footer-status {
  position: relative;
  width: 100%;
  color: $el-text-color-primary;
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

  .footer-status__arrow--hover {
    color: $el-color-success !important;
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
