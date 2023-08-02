<template>
  <el-input
    type="textarea"
    :rows="1"
    placeholder="Enter text"
    v-model="localComment"
    maxlength="60"
    show-word-limit
    class="hidden-input"
    ref="editInput"
    @click.stop
    @blur="onBlur"
    @keydown="onKeydown"
  />
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch, onMounted, nextTick } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    statusComment: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    employeeID: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const editInput: Ref<HTMLTextAreaElement | null> = ref(null);

    const localComment = ref(props.statusComment);

    watch(
      () => props.statusComment,
      (newVal) => {
        localComment.value = newVal;
      }
    );

    const onBlur = () => {
      store.dispatch("Department/updateStatusComment", {
        employeeId: props.employeeID,
        date: props.date,
        comment: localComment.value,
      });
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        store.dispatch("Department/updateStatusComment", {
          employeeId: props.employeeID,
          date: props.date,
          comment: localComment.value,
        });
        event.preventDefault(); // Всегда предотвращаем новую строку при нажатии "Enter"
        emit("editDone");
      }
    };

    onMounted(async () => {
      await nextTick();
      if (editInput.value) {
        editInput.value.focus();
      }
    });

    return {
      localComment,
      editInput,
      onBlur,
      onKeydown,
    };
  },
});
</script>

<style lang="scss">
.hidden-input {
  padding-bottom: 8px;
  .el-input__inner,
  .el-textarea__inner {
    border: 1px solid $el-color-success-light-8;
    background-color: $el-color-success-light-9;
    color: $el-text-color-regular;
    font-size: 8px;
    margin-top: 10px;
    width: 210px;
    height: 32px;
    line-height: 8px;
    padding: 11px 10px;
    resize: none;
    box-shadow: none;
    overflow: hidden;

    &:focus {
      border-color: $el-color-success-light-8;
      border-radius: 4px;
      outline: none;
      box-shadow: none;
    }
  }

  .el-input__inner::selection,
  .el-textarea__inner::selection {
    background: $el-color-info;
    color: $el-color-white;
  }

  .el-input__count,
  .el-textarea__count {
    color: $el-color-primary !important;
    background-color: transparent;
    margin-right: 10px;
    font-size: 8px;
    right: 0;
    bottom: 8px;
  }
}
</style>
