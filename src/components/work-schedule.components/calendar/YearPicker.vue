<template>
  <div class="year-picker" ref="yearPicker">
    <div
      @click="showYearPicker = true"
      @mouseenter="openPicker"
      @mouseleave="closePicker"
    >
      <div
        class="year-picker__selected"
        :class="{ 'year-picker__selected--show-picker': showYearPicker }"
      >
        {{ selectedYear }}
      </div>
      <transition name="fade">
        <div v-if="showYearPicker" class="year-picker__body" @click.stop>
          <div class="year-picker__header">
            <i @click.stop="prevDecade">
              <double_arrow_l_icon :width="'20'" :height="'20'" />
            </i>
            {{ yearRange }}
            <i @click.stop="nextDecade">
              <double_arrow_r_icon :width="'20'" :height="'20'" />
            </i>
          </div>
          <hr />
          <div class="year-picker__years">
            <div
              v-for="year in years"
              :key="year"
              @click="selectYear(year)"
              :class="{
                'year-picker__years__item': true,
                'year-picker__years__item--selected': year === selectedYear,
              }"
            >
              {{ year }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { double_arrow_l_icon, double_arrow_r_icon } from "@/assets/icons/index";

export default defineComponent({
  components: {
    double_arrow_l_icon,
    double_arrow_r_icon,
  },

  setup() {
    const store = useStore();
    const yearPicker = ref<HTMLElement | null>(null);
    const showYearPicker = ref(false);
    const currentDecade = ref(Math.floor(new Date().getFullYear() / 10) * 10);

    const selectedYear = computed(
      () => store.getters["LocalStates/getSelectedYear"]
    );

    const years = computed(() => {
      return Array.from({ length: 10 }, (_, i) => currentDecade.value + i);
    });

    const yearRange = computed(() => {
      return `${currentDecade.value} - ${currentDecade.value + 9}`;
    });

    const nextDecade = () => {
      currentDecade.value += 10;
    };

    const prevDecade = () => {
      currentDecade.value -= 10;
    };

    const selectYear = (year: number) => {
      store.dispatch("LocalStates/updateYear", year);
      showYearPicker.value = false;
    };

    const handleClickOutside = (event: Event) => {
      if (
        yearPicker.value &&
        !yearPicker.value.contains(event.target as Node)
      ) {
        showYearPicker.value = false;
      }
    };

    let timeoutId: number | undefined;
    const openPicker = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        showYearPicker.value = true;
      }, 400);
    };

    const closePicker = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        showYearPicker.value = false;
      }, 400);
    };

    onMounted(() => {
      document.addEventListener("mousedown", handleClickOutside);
    });

    onUnmounted(() => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    });

    return {
      yearPicker,
      showYearPicker,
      selectedYear,
      years,
      yearRange,
      nextDecade,
      prevDecade,
      selectYear,
      openPicker,
      closePicker,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/picker.scss";

.year-picker {
  @include picker(years, $el-text-color-secondary);
  margin-left: 0.5rem;
}
</style>
