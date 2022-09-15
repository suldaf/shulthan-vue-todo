<script>
import { mapActions } from "pinia";
import { useActivityStore } from "../stores/activity";

export default {
  props: {
    handleModal: {
      type: Function,
    },
    modal: {
      type: Boolean,
    },
    dataModal: {
      type: Object,
    },
    typeModal: {
      type: String,
    },
    handleAlert: {
      type: Function,
    },
  },
  methods: {
    ...mapActions(useActivityStore, ["deleteActivity"]),
    handleDelete(id) {
      this.deleteActivity(id);
      this.handleModal({});
      this.handleAlert();
      setTimeout(() => {
        this.handleAlert();
      }, 1000);
    },
  },
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modal"
      class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-16 z-50"
      data-cy="modal-delete"
      @click.self="() => handleModal({}, '')"
    >
      <div
        class="w-[490px] h-[355px] bg-white rounded-lg shadow-lg drop-shadow-md px-8 py-3 flex flex-col"
      >
        <div class="flex flex-col h-full items-center py-10 px-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            class="w-[84px] h-[84px] stroke-danger"
            data-cy="modal-delete-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <div class="mt-5 mb-10" data-cy="modal-delete-title">
            <p class="font-medium text-center">
              Apakah anda yakin menghapus
              {{ typeModal === "activity" ? "activity" : "List Item" }}
            </p>
            <p class="font-bold text-center">“{{ dataModal.title }}”?</p>
          </div>
          <div class="flex justify-between items-center w-[75%]">
            <button
              class="border rounded-full bg-[#F4F4F4] border-[#F4F4F4] text-[#4A4A4A] font-medium flex py-2 px-8"
              @click="
                (e) => {
                  e.stopPropagation();
                  handleModal({});
                }
              "
              data-cy="modal-delete-cancel-button"
            >
              Batal
            </button>
            <button
              class="border rounded-full bg-danger border-danger text-white font-medium flex py-2 px-8 z-10"
              @click="
                () => {
                  e.stopPropagation();
                  handleDelete(dataModal.id);
                }
              "
              data-cy="modal-delete-confirm-button"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
