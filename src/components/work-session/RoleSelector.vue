<template>
  <div @click.stop="toggleDropdown" class="custom-select">
    <div class="custom-select__wrapper">
      <span class="custom-select__label">Роль</span>
      <div class="custom-select__selected-option">
        {{ selectedOption.label }}
        <chevron_collapse_icon
          :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
        />
      </div>
    </div>

    <div class="custom-select__options">
      <div class="custom-select__options-wrapper">
        <div
          v-for="option in options"
          :key="option.value"
          @click.stop="selectOption(option)"
          class="custom-select__option"
          :class="{ open: isOpen }"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { chevron_collapse_icon } from "@/assets/icons/index";

interface Option {
  label: string;
  value: number | string;
}

export default defineComponent({
  components: {
    chevron_collapse_icon,
  },

  props: {
    options: {
      type: Array as () => Option[],
      required: true,
    },
  },
  setup(props) {
    const isOpen = ref(false);
    const selectedOption = ref<Option>(props.options[0]);
    const optionsElement = ref<HTMLElement | null>(null);

    const toggleDropdown = () => {
      if (optionsElement.value !== null) {
        if (isOpen.value) {
          console.log(optionsElement.value.style.maxHeight);

          optionsElement.value.style.maxHeight = "0";
        } else {
          console.log(optionsElement.value.style.maxHeight);
          // Получите высоту контента
          const scrollHeight = optionsElement.value.scrollHeight;

          // Установите высоту элемента равной высоте контента
          optionsElement.value.style.maxHeight = `${scrollHeight}px`;
        }

        isOpen.value = !isOpen.value;
      }
    };

    const selectOption = (option: Option) => {
      selectedOption.value = option;
      isOpen.value = false;

      if (optionsElement.value !== null) {
        optionsElement.value.style.maxHeight = "0";
      }
    };

    const handleClickOutside = (e: Event) => {
      // если элемент, по которому был клик, находится вне нашего дропдауна, закрываем его
      if (
        optionsElement.value &&
        !optionsElement.value.contains(e.target as Node)
      ) {
        isOpen.value = false;
        if (optionsElement.value !== null) {
          optionsElement.value.style.maxHeight = "0";
        }
      }
    };

    onMounted(() => {
      optionsElement.value = document.querySelector(
        ".custom-select__options"
      ) as HTMLElement;

      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return {
      isOpen,
      selectedOption,
      toggleDropdown,
      selectOption,
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-select {
  width: 180px;
  cursor: pointer;

  &__wrapper {
    padding: 16px 20px;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    // transition: background-color 0.2s ease-in;

    &:hover {
      background-color: var(--el-color-success-light-9);
    }
  }

  &__label {
    color: var(--el-text-color-secondary);
    font-size: 14px;
    font-weight: 400;
  }

  &__selected-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    font-size: 14px;
    font-weight: 400;
    color: var(--el-text-color-primary);
  }

  &__options {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-in-out;
  }

  &__options-wrapper {
    padding: 16px 0;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    border-radius: 0 0 4px 0;
  }

  &__option {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px 20px;
    font-size: 14px;
    font-weight: 400;
    color: var(--el-text-color-regular);
    // transition: background-color 0.2s ease-in;

    &:hover {
      background-color: var(--el-color-success-light-9);
    }
  }
}
</style>
