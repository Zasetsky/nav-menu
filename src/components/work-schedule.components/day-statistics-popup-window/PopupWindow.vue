<template>
  <div class="popup-window">
    <el-popover
      placement="auto"
      :popper-class="'popover-custom'"
      :visible="isVisibleLocal"
      :virtual-ref="referenceElement"
      virtual-triggering
    >
      <div class="popover-content">
        <Header
          class="popup-window__header"
          :totalTime="dateData.totalTime"
          :downtime="dateData.downtime"
          :breaksCount="dateData.breaksCount"
        />
        <Content
          v-if="workPointsForDate.length > 0"
          class="popup-window__content"
          :date="date"
          :workPoints="workPointsForDate"
          :user="user"
        />
        <Footer
          class="popup-window__footer"
          :date="date"
          :dateStatus="dateData.status"
          :employeeID="employeeID"
        />
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import Header from "./popup-window-components/HeaderComponent.vue";
import Content from "./popup-window-components/ContentComponent.vue";
import Footer from "./popup-window-components/FooterComponent.vue";
import { useStore } from "vuex";
import { WorkPoint, DatesData } from "@/types";

export default defineComponent({
  components: {
    Header,
    Content,
    Footer,
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    workPointsForDate: {
      type: Array as () => WorkPoint[][],
      required: true,
    },

    dateData: {
      type: Object as () => DatesData,
      required: true,
    },

    employeeID: {
      type: Number,
      required: true,
    },

    referenceElement: {
      type: Object as () => HTMLElement | null,
      required: true,
    },
  },

  setup(props, { emit }) {
    const isVisibleLocal = ref(props.visible);
    const store = useStore();

    const user = computed(() => store.getters["User/getUser"]);

    const handleMouseEnter = () => {
      emit("mouseenter");
    };

    watch(
      () => props.visible,
      (newValue) => {
        isVisibleLocal.value = newValue;
      }
    );

    onMounted(() => {
      emit("mounted");
    });

    return {
      isVisibleLocal,
      user,
      handleMouseEnter,
    };
  },
});
</script>

<style lang="scss" scoped>
.popup-window {
  z-index: 9999;
}
</style>
