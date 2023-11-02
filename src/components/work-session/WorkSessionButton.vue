<template>
  <div class="work-session-button">
    <div
      @mouseover="isStartHover = true"
      @mouseleave="handleMouseLeaveStart"
      @click="startTimer"
      class="work-session-button__wrapper"
    >
      <button
        class="work-session-button__button work-session-button__button--start"
      >
        <play_icon :isActive="isStartHover" />
      </button>
      <div
        :style="{ maxWidth: activeWidth }"
        class="work-session-button__timer work-session-button__timer--active"
      >
        <p :class="{ active: isStartHover }">{{ activeTime }}</p>
      </div>
    </div>

    <div
      @mouseover="isPauseHover = true"
      @mouseleave="handleMouseLeavePause"
      @click="pauseTimer"
      class="work-session-button__wrapper"
    >
      <button
        class="work-session-button__button work-session-button__button--pause"
      >
        <pause_icon :isActive="isPauseHover" />
      </button>
      <div
        :style="{ maxWidth: pauseWidth }"
        class="work-session-button__timer work-session-button__timer--pause"
      >
        <p :class="{ active: isPauseHover }">{{ pauseTime }}</p>
      </div>
    </div>

    <button
      @mouseover="isStopHover = true"
      @mouseleave="isStopHover = false"
      class="work-session-button__button work-session-button__button--stop"
      @click="stopTimer"
    >
      <stop_icon :isActive="isStopHover" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from "vue";
import { play_icon, pause_icon, stop_icon } from "@/assets/icons/index";

export default defineComponent({
  components: {
    play_icon,
    pause_icon,
    stop_icon,
  },

  setup() {
    let timerId: number | null = null;
    const activeTime = ref("00:00:00");
    const pauseTime = ref("00:00:00");
    let activeSeconds = 0;
    let pauseSeconds = 0;
    let isActiveStart = false;
    let isActivePause = false;
    let isStartHover = ref(false);
    let isPauseHover = ref(false);
    let isStopHover = ref(false);
    const activeWidth = ref("100px");
    const pauseWidth = ref("0");

    const updateTime = () => {
      if (isActiveStart) {
        activeSeconds += 1;
      } else if (isActivePause) {
        pauseSeconds += 1;
      }
      activeTime.value = new Date(activeSeconds * 1000)
        .toISOString()
        .substring(11, 19);
      pauseTime.value = new Date(pauseSeconds * 1000)
        .toISOString()
        .substring(11, 19);
    };

    const startTimer = () => {
      if (isActiveStart) {
        return; // Если таймер уже активен, просто вернуться
      }

      isActiveStart = true;
      isActivePause = false;

      activeWidth.value = "100px";
      pauseWidth.value = "0";

      isPauseHover.value = false;

      if (timerId === null) {
        timerId = window.setInterval(updateTime, 1000);
      }
    };

    const pauseTimer = () => {
      if (isActivePause) {
        return; // Если таймер уже на паузе, просто вернуться
      }

      isActivePause = true;
      isActiveStart = false;

      pauseWidth.value = "100px";
      activeWidth.value = "0";

      isStartHover.value = false;

      if (timerId === null) {
        timerId = window.setInterval(updateTime, 1000);
      }
    };

    const stopTimer = () => {
      clearInterval(timerId!);
      // Здесь буду отправлять данные на сервер
      activeSeconds = 0;
      pauseSeconds = 0;
      activeTime.value = "00:00:00";
      pauseTime.value = "00:00:00";

      activeWidth.value = "100px";
      pauseWidth.value = "0";

      isActiveStart = false;
      isActivePause = false;

      isStartHover.value = false;
      isPauseHover.value = false;

      timerId = null;
    };

    const handleMouseLeaveStart = () => {
      if (!isActiveStart) {
        isStartHover.value = false;
      }
    };

    const handleMouseLeavePause = () => {
      if (!isActivePause) {
        isPauseHover.value = false;
      }
    };

    onUnmounted(() => {
      clearInterval(timerId!);
    });

    return {
      activeTime,
      pauseTime,
      activeWidth,
      pauseWidth,
      isStartHover,
      isPauseHover,
      isStopHover,
      startTimer,
      pauseTimer,
      stopTimer,
      handleMouseLeaveStart,
      handleMouseLeavePause,
    };
  },
});
</script>

<style lang="scss" scoped>
.work-session-button {
  display: flex;
  justify-content: center;
  padding: 16px 20px;
  // width: 224px;
  border-bottom: 1px solid var(--el-border-color);

  &__wrapper {
    display: flex;
    align-items: center;
    height: 40px;
    cursor: pointer;
  }

  &__timer {
    display: flex;
    align-items: center;
    max-width: 0;
    height: 40px;
    overflow: hidden;
    transition: max-width 0.4s ease-out;

    p {
      margin: 0 8px 0 0;

      &.active {
        color: var(--el-color-white);
      }
    }

    &--active {
      width: 100%;
      color: var(--el-color-primary-light-7);
      background-color: var(--el-color-primary);
    }

    &--pause {
      border-right: 1px solid var(--el-color-overlay-50);
      width: 100%;
      color: var(--el-color-primary-light-7);
      background-color: var(--el-color-warning);
    }
  }

  &__button {
    height: 40px;
    border: none;
    cursor: pointer;

    &--start {
      border-radius: 4px 0 0 4px;
      background-color: var(--el-color-primary);
      color: var(--el-color-primary-light-7);
    }

    &--pause {
      border-left: 1px solid var(--el-color-overlay-50);
      background-color: var(--el-color-warning);
      color: var(--el-color-primary-light-7);
    }

    &--stop {
      border-radius: 0 4px 4px 0;
      background-color: var(--el-color-danger);
      color: var(--el-color-primary-light-7);
    }
  }
}
</style>
