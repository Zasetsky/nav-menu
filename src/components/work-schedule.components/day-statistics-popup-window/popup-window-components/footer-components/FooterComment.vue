<template>
  <div class="footer__comment">
    <EditComment
      v-if="isEditing"
      :statusComment="statusComment"
      :date="date"
      :employeeID="employeeID"
      @editDone="stopEditing"
    />

    <button
      v-else-if="!isEditing && !statusComment && user.isAdmin"
      class="add-comment-btn"
      @click.stop="startEditing"
    >
      +&nbsp;Комментарий
    </button>

    <p v-else-if="!isEditing && statusComment" class="comment-text">
      {{ statusComment }}
      <i
        v-if="user.isAdmin && statusComment"
        @click.stop="startEditing"
        class="el-icon-edit edit-icon"
      />
    </p>

    <p class="comment-text__none" v-if="!user.isAdmin && !statusComment">
      Комментариев нет
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import EditComment from "./EditComment.vue";

export default defineComponent({
  components: {
    EditComment,
  },
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
  setup() {
    const store = useStore();

    const isEditing = computed(() => store.getters["LocalStates/getIsEditing"]);

    const user = computed(() => store.getters["User/getUser"]);

    const startEditing = () => {
      store.dispatch("LocalStates/toggleIsEditing", true);
      store.dispatch("LocalStates/toggleShowOptions", false);
    };

    const stopEditing = () => {
      store.dispatch("LocalStates/toggleIsEditing", false);
    };

    const clickHandler = () => {
      stopEditing();
    };

    onMounted(() => {
      window.addEventListener("click", clickHandler);
    });

    onUnmounted(() => {
      window.removeEventListener("click", clickHandler);
    });

    return { isEditing, user, startEditing, stopEditing };
  },
});
</script>

<style scoped lang="scss">
.footer__comment {
  cursor: default;
  color: var(--el-text-color-regular);
  font: 8px;
  line-height: 8px;
  word-break: keep-all;
}

.add-comment-btn {
  width: 93px;
  height: 20px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  color: var(--el-color-primary);
  background-color: var(--el-color-success-light-9);
  border: 1px solid var(--el-color-primary);
  cursor: pointer;
  text-align: center;
  margin-top: 10px;

  &:hover {
    color: var(--el-color-success-light-9);
    background-color: var(--el-color-primary);
  }
}

.comment-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 8px;
  background-color: var(--el-color-success-light-8);
  padding: 7px 10px;
  margin-top: 10px;
  width: 190px;
  border-radius: 4px;

  &__none {
    color: var(--el-text-color-secondary);
    font-size: 8px;
    background-color: var(--el-color-success-light-8);
    padding: 11px 10px;
    width: 190px;
    border-radius: 4px;
  }
}

.edit-icon {
  width: 8px;
  height: 8px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    color: var(--el-color-success);
  }
}
</style>
