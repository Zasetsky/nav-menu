<template>
  <div class="footer">
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
  },
});
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 1px solid $el-color-primary;
  margin: 0 -13px;
  padding: 20px;
}
</style>
