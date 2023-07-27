<template>
  <div class="legend-popup-window">
    <div class="legend-popup-window__calendar-days">
      <div class="legend-popup-window__calendar-days__work">
        <work_day_icon />
        <p>рабочий день</p>
      </div>
      <div class="legend-popup-window__calendar-days__weekend">
        <weekend_icon />
        <p>выходной</p>
      </div>
      <div class="legend-popup-window__calendar-days__holliday">
        <holliday_icon />
        <p>праздник</p>
      </div>
    </div>

    <hr />

    <div class="legend-popup-window__day-statuses">
      <div class="legend-popup-window__day-statuses__success">
        <div class="legend-popup-window__day-statuses__success--circle"></div>
        <p>день засчитан</p>
      </div>
      <div class="legend-popup-window__day-statuses__empty">
        <div class="legend-popup-window__day-statuses__empty--circle"></div>
        <p>запланированный рабочий день</p>
      </div>
      <div class="legend-popup-window__day-statuses__warning">
        <div class="legend-popup-window__day-statuses__warning--circle"></div>
        <p>нарушение</p>
      </div>
      <div class="legend-popup-window__day-statuses__danger">
        <div class="legend-popup-window__day-statuses__danger--circle"></div>
        <p>день не засчитан</p>
      </div>
    </div>

    <hr />

    <div class="legend-popup-window__vacation-days">
      <div class="legend-popup-window__vacation-days__vacation">
        <div class="legend-popup-window__vacation-days__vacation--square"></div>
        <p>
          оплачиваемый <br />
          отпуск
        </p>
      </div>
      <div class="legend-popup-window__vacation-days__work-day-on-vacation">
        <div
          class="legend-popup-window__vacation-days__work-day-on-vacation--square"
        >
          <div
            class="legend-popup-window__vacation-days__work-day-on-vacation--square--circle"
          ></div>
        </div>
        <p>запланированный рабочий день, попавший на отпуск</p>
      </div>
      <div class="legend-popup-window__vacation-days__business-trip">
        <div
          class="legend-popup-window__vacation-days__business-trip--square"
        ></div>
        <p>командировка</p>
      </div>
      <div
        class="legend-popup-window__vacation-days__work-day-on-business-trip"
      >
        <div
          class="legend-popup-window__vacation-days__work-day-on-business-trip--square"
        >
          <div
            class="legend-popup-window__vacation-days__work-day-on-business-trip--square--circle"
          ></div>
        </div>
        <p>запланированный рабочий день, попавший на командировку</p>
      </div>
      <div class="legend-popup-window__vacation-days__sick-day">
        <div class="legend-popup-window__vacation-days__sick-day--square"></div>
        <p>больничный</p>
      </div>
      <div class="legend-popup-window__vacation-days__work-day-on-sick-day">
        <div
          class="legend-popup-window__vacation-days__work-day-on-sick-day--square"
        >
          <div
            class="legend-popup-window__vacation-days__work-day-on-sick-day--square--circle"
          ></div>
        </div>
        <p>запланированный рабочий день, попавший на больничный</p>
      </div>
      <div class="legend-popup-window__vacation-days__personal-day">
        <div
          class="legend-popup-window__vacation-days__personal-day--square"
        ></div>
        <p>
          отпуск/отгул <br />
          за свой счёт
        </p>
      </div>
      <div class="legend-popup-window__vacation-days__work-day-on-personal-day">
        <div
          class="legend-popup-window__vacation-days__work-day-on-personal-day--square"
        >
          <div
            class="legend-popup-window__vacation-days__work-day-on-personal-day--square--circle"
          ></div>
        </div>
        <p>
          запланированный рабочий день, попавший на отпуск/отгул за свой счёт
        </p>
      </div>
      <div class="legend-popup-window__vacation-days__birthday">
        <birthday_day_cell_icon />
        <p>день рождения</p>
      </div>
      <div class="legend-popup-window__vacation-days__maternity-leave">
        <div
          class="legend-popup-window__vacation-days__maternity-leave--square"
        ></div>
        <p>декретный отпуск</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  work_day_icon,
  weekend_icon,
  holliday_icon,
  birthday_day_cell_icon,
} from "@/assets/icons/index";

export default defineComponent({
  components: {
    work_day_icon,
    weekend_icon,
    holliday_icon,
    birthday_day_cell_icon,
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/components/legend-popup-window-content.scss";
</style>
