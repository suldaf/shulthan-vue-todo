<script>
import { mapActions } from "pinia";
import { useTodoStore } from "../stores/todo";

export default {
  data() {
    return {
      priorityColor: "",
      checked: false,
    };
  },
  props: {
    index: {
      type: Number,
    },
    todo: {
      type: Object,
    },
    handleModal: {
      type: Function,
    },
    handleModalDelete: {
      type: Function,
    },
  },
  methods: {
    ...mapActions(useTodoStore, ["deleteTodo", "updateTodo"]),
    // handleDelete(id) {
    //   this.deleteTodo(id, this.$route.params.id);
    //   h
    // },
    handleCheck(e) {
      const payload = {
        is_active: e.target.checked ? 0 : 1,
      };
      this.checked = e.target.checked;
      this.updateTodo(payload, this.todo.id, this.$route.params.id);
    },
  },
  computed: {
    todoItem() {
      return `todo-item-${this.index}`;
    },
    todoPriority() {
      if (this.todo) {
        switch (this.todo.priority) {
          case "very-high":
            return "bg-veryHigh";
          case "high":
            return "bg-high";
          case "normal":
            return "bg-normal";
          case "low":
            return "bg-low";
          case "very-low":
            return "bg-veryLow";
          default:
            return "";
        }
      }
    },
  },
  created() {
    if (this.todo.is_active === 0) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  },
};
</script>

<template>
  <div
    class="w-full h-16 border shadow drop-shadow rounded-md flex justify-between items-center py-2 px-5 bg-white mb-1"
    :data-cy="this.todoItem"
  >
    <div class="flex items-center max-w-[95%]">
      <input
        type="checkbox"
        data-cy="todo-item-checkbox"
        @click="(e) => handleCheck(e)"
        :checked="checked"
      />
      <div
        class="priority mx-3 h-2 w-2 rounded"
        :class="this.todoPriority"
        data-cy="todo-item-priority-indicator"
      ></div>
      <p
        class="text-lg mr-3 max-w-[85%] truncate"
        :class="checked ? 'text-trans line-through' : ''"
        data-cy="todo-item-title"
      >
        {{ todo.title }}
      </p>
      <button
        @click="
          () => {
            handleModal(todo, 'edit');
          }
        "
        data-cy="todo-item-edit-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 25 25"
          stroke-width="1.5"
          class="w-6 h-5 stroke-trans"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </button>
    </div>
    <div>
      <button
        data-cy="todo-item-delete-button"
        @click="() => handleModalDelete(todo, 'todo')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          class="w-6 h-6 stroke-trans"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
