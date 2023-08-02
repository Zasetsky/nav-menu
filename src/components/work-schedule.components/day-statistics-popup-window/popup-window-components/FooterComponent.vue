<template>
  <div
    class="footer"
    :style="isContent ? { 'border-top': '1px solid #17505b' } : {}"
  >
    <footer-status
      :date="date"
      :status="dateStatus.dayStatus"
      :employeeID="employeeID"
    />
    <footer-comment
      :date="date"
      :statusComment="dateStatus.comment"
      :employeeID="employeeID"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FooterStatus from "./footer-components/FooterStatus.vue";
import FooterComment from "./footer-components/FooterComment.vue";
import { StatusItem } from "@/types";

export default defineComponent({
  components: {
    FooterStatus,
    FooterComment,
  },

  props: {
    date: {
      type: String,
      required: true,
    },

    dateStatus: {
      type: Object as () => StatusItem,
      required: true,
    },

    employeeID: {
      type: Number,
      required: true,
    },

    isContent: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 -13px;
  padding: 20px 20px 8px 20px;
}
</style>
