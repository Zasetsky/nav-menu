<template>
  <div class="work-session-button">
    <div class="work-session-button__content">
      <div
        @mouseover="isStartHover = true"
        @mouseleave="handleMouseLeaveStart"
        @click="checkStartCondition"
        class="work-session-button__wrapper"
      >
        <button
          class="work-session-button__button work-session-button__button--start"
        >
          <play_icon :isActive="isStartHover || isActiveStart" />
        </button>
        <div
          :style="{ maxWidth: activeWidth }"
          class="work-session-button__timer work-session-button__timer--active"
        >
          <p :class="{ active: isStartHover || isActiveStart }">
            {{ activeTime }}
          </p>
        </div>
      </div>

      <div
        @mouseover="isPauseHover = true"
        @mouseleave="handleMouseLeavePause"
        @click="checkPauseCondition"
        class="work-session-button__wrapper"
      >
        <button
          class="work-session-button__button work-session-button__button--pause"
        >
          <pause_icon :isActive="isPauseHover || isActivePause" />
        </button>
        <div
          :style="{ maxWidth: pauseWidth }"
          class="work-session-button__timer work-session-button__timer--pause"
        >
          <p :class="{ active: isPauseHover || isActivePause }">
            {{ pauseTime }}
          </p>
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
  </div>

  <div class="comment" :class="{ open: isOpen }">
    <div class="comment__content">
      <el-input
        v-model="comment"
        maxlength="30"
        :placeholder="placeholderText"
        show-word-limit
        type="textarea"
      />
      <div class="comment__actions">
        <el-button style="width: 76px; height: 24px" @click="handleCancel" text
          >Отменить</el-button
        >
        <el-button
          style="width: 48px; height: 24px"
          :disabled="!comment"
          @click="handleConfirm"
          type="warning"
          >ОК</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onUnmounted } from "vue";
import { play_icon, pause_icon, stop_icon } from "@/assets/icons/index";

import { ElInput, ElButton } from "element-plus";
import "element-plus/es/components/input/style/css";
import "element-plus/es/components/button/style/css";

export default defineComponent({
  components: {
    play_icon,
    pause_icon,
    stop_icon,
    ElInput,
    ElButton,
  },

  setup() {
    let timerId: number | null = null;
    const activeTime = ref("00:00:00");
    const pauseTime = ref("00:00:00");
    let activeSeconds = 0;
    let pauseSeconds = 0;
    let isActiveStart = ref(false);
    let isActivePause = ref(false);
    let isStartHover = ref(false);
    let isPauseHover = ref(false);
    let isStopHover = ref(false);
    const activeWidth = ref("100px");
    const pauseWidth = ref("0");
    const isOpen = ref(false);
    const startTimeDeclared = ref("09:00:00");
    const stopTimeDeclared = ref("17:00:00");
    const lastButtonClicked = ref<"start" | "pause">("start");
    const comment = ref("");

    const placeholderText = computed(() => {
      const now = new Date();
      const startTime = new Date();
      const [hours, minutes, seconds] = startTimeDeclared.value
        .split(":")
        .map(Number);
      startTime.setHours(hours, minutes, seconds);

      if (lastButtonClicked.value === "start" && now > startTime) {
        // Пользователь опоздал
        return "Введите причину опоздания...";
      } else {
        // Пользователь не опоздал, значит перерыв
        return "Введите комментарий...";
      }
    });

    const checkStartCondition = () => {
      if (isActiveStart.value && isOpen) {
        return;
      }

      const now = new Date();
      const startTime = new Date();
      const [hours, minutes, seconds] = startTimeDeclared.value
        .split(":")
        .map(Number);
      startTime.setHours(hours, minutes, seconds);

      if (now > startTime) {
        isOpen.value = true;
      } else {
        startTimer();
      }

      lastButtonClicked.value = "start";
    };

    const checkPauseCondition = () => {
      if (isActivePause.value) {
        return;
      }

      isOpen.value = true;
      lastButtonClicked.value = "pause";
    };

    // const checkStopCondition = () => {
    //   const now = new Date();
    //   const stopTime = new Date();
    //   const [hours, minutes, seconds] = stopTimeDeclared.value
    //     .split(":")
    //     .map(Number);
    //   stopTime.setHours(hours, minutes, seconds);

    //   if (now < stopTime) {
    //     modalVisible.value = true;
    //   }
    // };

    const handleConfirm = () => {
      isOpen.value = false;

      if (lastButtonClicked.value === "start") {
        // Нужна логика сервера

        console.log("Отправка на сервер старт", comment.value);

        comment.value = "";

        startTimer();
      } else if (lastButtonClicked.value === "pause") {
        // Нужна логика сервера

        console.log("Отправка на сервер пауза", comment.value);

        comment.value = "";

        pauseTimer();
      }
    };

    const handleCancel = () => {
      isOpen.value = false;
      setTimeout(() => {
        comment.value = "";
      }, 400);
    };

    const updateTime = () => {
      if (isActiveStart.value) {
        activeSeconds += 1;
      } else if (isActivePause.value) {
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
      if (isActiveStart.value) {
        return; // Если таймер уже активен, просто вернуться
      }

      isActiveStart.value = true;
      isActivePause.value = false;

      activeWidth.value = "100px";
      pauseWidth.value = "0";

      isPauseHover.value = false;

      if (timerId === null) {
        timerId = window.setInterval(updateTime, 1000);
      }
    };

    const pauseTimer = () => {
      if (isActivePause.value) {
        return; // Если таймер уже на паузе, просто вернуться
      }

      isActivePause.value = true;
      isActiveStart.value = false;

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

      isActiveStart.value = false;
      isActivePause.value = false;

      isStartHover.value = false;
      isPauseHover.value = false;

      timerId = null;
    };

    const handleMouseLeaveStart = () => {
      if (!isActiveStart.value) {
        isStartHover.value = false;
      }
    };

    const handleMouseLeavePause = () => {
      if (!isActivePause.value) {
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
      isActiveStart,
      isActivePause,
      isStopHover,
      isOpen,
      startTimeDeclared,
      stopTimeDeclared,
      comment,
      placeholderText,
      startTimer,
      pauseTimer,
      stopTimer,
      handleMouseLeaveStart,
      handleMouseLeavePause,
      checkStartCondition,
      checkPauseCondition,
      // checkStopCondition,
      handleConfirm,
      handleCancel,
    };
  },
});
</script>

<style lang="scss">
.work-session-button {
  &__content {
    display: flex;
    justify-content: center;
    padding: 16px 20px;
    // width: 224px;
    border: 1px solid var(--el-border-color);
    border-top: none;
  }
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
.comment {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 0.4s ease-in-out, padding 0s 0.4s,
    border-color 0s 0.4s;
  border: 1px solid transparent;
  border-top: none;

  &.open {
    grid-template-rows: 1fr;
    transition-delay: 0s;
    padding: 16px 20px;
    border-color: var(--el-border-color);
  }

  &__content {
    padding: 0;
    min-height: 0;

    .el-textarea__inner {
      min-height: 64px !important;
      font-size: 10px;
      font-weight: 400;

      &::placeholder {
        font-family: "Roboto";
        font-size: 10px;
        font-weight: 400;
        white-space: nowrap;
      }
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }
}
</style>
