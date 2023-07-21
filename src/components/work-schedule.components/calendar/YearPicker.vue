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
                'year-picker__years__year': true,
                'year-picker__years__year--selected': year === selectedYear,
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
.year-picker {
  position: relative;
  margin-left: 0.5rem;
  color: $el-text-color-regular;
  cursor: default;

  &__selected {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    color: $el-text-color-secondary;
    cursor: pointer;

    &:not(&--show-picker)::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 2px;
      background-color: $el-text-color-secondary;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  &__body {
    position: absolute;
    border: 1px solid $el-border-color-lighter;
    background-color: $el-color-white;
    padding: 10px;
    left: -10px;
    border-radius: 4px;
    top: 32px;
    width: 322px;
    height: 248px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 32px;
      transform: translateX(-50%);
      width: 14px;
      height: 14px;
      background-color: $el-color-white;
    }

    &::before {
      top: -7px;
      background-color: $el-border-color-lighter;
      z-index: 1;
    }

    &::after {
      top: -6px;
      z-index: 2;
    }

    &::before,
    &::after {
      transform: translateX(-50%) rotate(45deg);
    }

    hr {
      border: none;
      border-top: 1px solid $el-border-color-lighter;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;

    i {
      cursor: pointer;
    }
  }

  &__years {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    place-items: center;

    &__year {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 73px;
      height: 64px;
      font-size: 12px;
      cursor: pointer;

      &--selected {
        color: $el-color-primary;
        font-weight: 600;
      }
    }
  }
}
</style>
