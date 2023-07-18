<template>
  <div class="work-schedule">
    <DepartmentList class="work-schedule--department-list" />
    <CalendarHeader class="work-schedule--calendar-header" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import DepartmentList from "@/components/work-schedule.components/DepartmentList.vue";
import CalendarHeader from "@/components/work-schedule.components/CalendarHeader.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { DepartmentList, CalendarHeader },

  setup() {
    const store = useStore();

    const measureScrollbar = () => {
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll";
      document.body.appendChild(outer);

      const inner = document.createElement("div");
      outer.appendChild(inner);

      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      document.body.removeChild(outer);

      return scrollbarWidth;
    };

    const checkScrollbarPresence = () => {
      const hasScrollbar = window.innerHeight < document.body.offsetHeight;
      store.commit("LocalStates/setHasScrollbar", hasScrollbar);

      if (hasScrollbar) {
        const scrollbarWidth = measureScrollbar();
        store.commit("LocalStates/setScrollbarWidth", scrollbarWidth);
      }
    };

    onMounted(() => {
      window.addEventListener("resize", checkScrollbarPresence);
      checkScrollbarPresence();
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkScrollbarPresence);
    });

    return {};
  },
});
</script>

<style lang="scss" scoped>
.work-schedule {
  display: flex;
  align-items: flex-start;
  width: 100%;

  &--department-list {
    width: 17.5rem;
  }

  &--calendar-header {
    flex-grow: 1;
  }
}
</style>
