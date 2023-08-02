<template>
  <div>
    <div class="footer__comment">
      <EditComment
        v-if="isEditing"
        :statusComment="statusComment"
        :date="date"
        :employeeID="employeeID"
        @editDone="isEditing = false"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
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

    return { isEditing, user, startEditing };
  },
});
</script>

<style scoped lang="scss">
.footer__comment {
  cursor: default;
  color: $el-text-color-regular;
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
  color: $el-color-primary;
  background-color: $el-color-success-light-9;
  border: 1px solid $el-color-primary;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;

  &:hover {
    color: $el-color-success-light-9;
    background-color: $el-color-primary;
  }
}

.comment-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 8px;
  background-color: $el-color-success-light-8;
  padding: 11px 10px;
  margin-top: 10px;
  width: 215px;
  border-radius: 4px;

  &__none {
    color: $el-text-color-secondary;
    font-size: 8px;
    background-color: $el-color-success-light-8;
    padding: 11px 10px;
    width: 215px;
  }
}

.edit-icon {
  width: 8px;
  height: 8px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    color: $el-color-success;
  }
}
</style>
