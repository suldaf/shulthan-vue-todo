<script>
export default {
  props: {
    alert: {
      type: Boolean,
    },
  },
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="alert"
      class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-16"
      :class="alert ? 'z-50' : ''"
      data-cy="modal-information"
    >
      <div
        class="w-[490px] h-[3.5rem] bg-white rounded-lg shadow-lg drop-shadow-md px-8 py-2 flex justify-start items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          class="w-[20px] h-[20px] stroke-[#00A790] stroke-2"
          data-cy="modal-information-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>

        <p class="font-medium ml-4" data-cy="modal-information-title">
          Activity berhasil dihapus
        </p>
      </div>
    </div>
  </Teleport>
</template>
