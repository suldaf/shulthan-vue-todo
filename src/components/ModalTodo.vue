<script>
import { mapActions } from "pinia";
import { useTodoStore } from "../stores/todo";

export default {
  data() {
    return {
      listPriority: [
        { value: "very-high", label: "Very High", color: "bg-veryHigh" },
        { value: "high", label: "High", color: "bg-high" },
        { value: "normal", label: "Medium", color: "bg-normal" },
        { value: "low", label: "Low", color: "bg-low" },
        { value: "very-low", label: "Very Low", color: "bg-veryLow" },
      ],
      title: "",
      priority: {},
      dropdown: false,
    };
  },
  props: {
    handleModal: {
      type: Function,
    },
    modal: {
      type: Boolean,
    },
    typeModal: {
      type: String,
    },
    dataModal: {
      type: Object,
    },
  },
  methods: {
    ...mapActions(useTodoStore, ["createTodo", "updateTodo"]),
    handleCreate() {
      const payload = {
        title: this.title,
        priority: this.priority.value,
      };
      this.createTodo(payload, this.$route.params.id);
      this.handleModal();
      this.title = "";
    },
    handleEdit() {
      const payload = {
        title: this.title,
        priority: this.priority.value,
      };
      this.updateTodo(payload, this.dataModal.id, this.$route.params.id);
      this.handleModal();
      this.title = "";
    },
    changePriority() {
      if (this.dataModal) {
        this.priority = this.listPriority.find(
          (e) => e.value === this.dataModal.priority
        );
        this.title = this.dataModal.title;
      }
    },
  },
  created() {
    this.priority = this.listPriority[0];
  },
  watch: {
    dataModal(newData, oldData) {
      this.changePriority();
    },
  },
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modal"
      class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-16"
      :class="modal ? 'z-50' : ''"
      data-cy="modal-add"
    >
      <div
        class="w-[690px] h-[335px] bg-white rounded-lg shadow-lg drop-shadow-md flex flex-col"
      >
        <div class="border-b px-8 py-3 flex justify-between items-center">
          <p class="font-bold text-base" data-cy="modal-add-title">
            {{ typeModal == "add" ? "Tambah List Item" : "Edit List Item" }}
          </p>
          <button
            @click="
              () => {
                handleModal();
              }
            "
            data-cy="modal-add-close-button"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="my-6 px-8 py-3 flex flex-col">
          <label
            class="text-[10px] font-semibold mb-1"
            data-cy="modal-add-name-title"
            >NAMA LIST ITEM</label
          >
          <input
            type="text"
            class="border outline-none px-4 py-2 focus:border-[#16ABF8] rounded"
            placeholder="Tambahkan nama list item"
            data-cy="modal-add-name-input"
            @input="
              (e) => {
                this.title = e.target.value;
              }
            "
            :value="title"
          />
          <label
            class="text-[10px] font-semibold mb-1 mt-5"
            data-cy="modal-add-priority-title"
            >PRIORITY</label
          >
          <div class="relative">
            <button
              class="flex items-center border min-w-[25%] py-2 px-2 rounded relative"
              :class="dropdown ? 'bg-[#E5E5E5] !rounded-b-none' : ''"
              data-cy="modal-add-priority-dropdown"
              @click="
                () => {
                  dropdown = !dropdown;
                }
              "
            >
              <div
                class="priority mx-3 h-3 w-3 rounded-full"
                :class="priority.color"
                v-if="!dropdown"
              ></div>
              <p class="mr-3" v-if="!dropdown">{{ priority.label }}</p>
              <p class="mx-3" v-if="dropdown">Pilih priority</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 absolute right-3"
                v-if="!dropdown"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 absolute right-3"
                v-if="dropdown"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-show="dropdown" class="absolute min-w-full">
              <template v-for="(prior, index) in listPriority" :key="index">
                <button
                  class="flex items-center border min-w-[25%] py-2 px-2 bg-white last:rounded-b hover:bg-[#efefef]"
                  @click="
                    () => {
                      priority = prior;
                      dropdown = !dropdown;
                    }
                  "
                  :data-cy="`modal-add-priority-${prior.value}`"
                >
                  <div
                    class="priority mx-3 h-3 w-3 rounded-full"
                    :class="prior.color"
                  ></div>
                  <p class="mr-3">{{ prior.label }}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    class="w-5 h-5 fill-trans"
                    v-if="priority.value === prior.value"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </template>
            </div>
          </div>
        </div>
        <div class="border-t px-8 py-3 flex justify-end items-center">
          <button
            class="border border-primary rounded-full py-2 px-5 bg-primary text-white font-bold"
            :class="
              title.length === 0
                ? 'disabled:bg-[#16ABF8] disabled:opacity-20'
                : ''
            "
            data-cy="modal-add-save-button"
            :disabled="title.length === 0"
            @click="
              () => {
                if (typeModal === 'add') {
                  handleCreate();
                } else {
                  handleEdit();
                }
              }
            "
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
