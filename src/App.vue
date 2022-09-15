<script>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
export default {
  data() {
    return {};
  },
  components: {
    RouterView,
    Header,
  },
};
</script>

<template>
  <Header />
  <RouterView />
</template>
