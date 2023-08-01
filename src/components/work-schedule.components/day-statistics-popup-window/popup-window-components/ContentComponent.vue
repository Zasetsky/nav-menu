<template>
  <div class="content">
    <div
      class="content__timeline"
      v-for="(workPointArray, arrayIndex) in workPoints"
      :key="arrayIndex"
    >
      <div class="content__timeline-block">
        <div
          class="content__timeline-item"
          v-for="(workPoint, index) in workPointArray"
          :key="index"
        >
          <div class="content__timeline-dot"></div>
          <div
            class="content__timeline-line"
            v-if="index !== workPointArray.length - 1"
          ></div>

          <div class="content__timeline-content">
            <div class="content__timeline-time-name-wrapper">
              <span class="content__timeline-time">{{ workPoint.time }}</span>
              <span class="content__timeline-name">{{ workPoint.name }}</span>
            </div>
            <p class="content__timeline-comment">{{ workPoint.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { User, WorkPoint } from "@/types";

export default defineComponent({
  props: {
    date: {
      type: String,
      required: true,
    },

    workPoints: {
      type: Array as () => WorkPoint[][],
      required: true,
    },

    user: {
      type: Object as () => User,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.content {
  min-height: 152px;
  max-height: 168px;
  width: 234px;
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: default;

  &__timeline {
    position: relative;
    margin-left: 20px;
  }

  &__timeline-block {
    margin-bottom: 35px;
    margin-top: 10px;
  }

  &__timeline-item {
    position: relative;
    margin-bottom: -5px;
  }

  &__timeline-dot {
    position: absolute;
    left: -15px;
    top: 2px;
    width: 12px;
    height: 12px;
    background: $el-color-primary;
    border-radius: 50%;
    z-index: 1;
  }

  &__timeline-line {
    position: absolute;
    left: -10px;
    top: 10px;
    bottom: -10px;
    width: 2px;
    background: $el-color-primary;
  }

  &__timeline-content {
    margin-left: 10px;
  }

  &__timeline-time-name-wrapper {
    display: flex;
  }

  &__timeline-time {
    font-size: 12px;
    min-width: 50px;
    font-weight: bold;
    color: $el-text-color-primary;
  }

  &__timeline-name {
    font-size: 12px;
    font-weight: bold;
    color: $el-text-color-regular;
  }

  &__timeline-comment {
    margin-top: 2px;
    font-size: 10px;
    color: $el-text-color-regular;
  }
}
</style>
