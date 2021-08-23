<template>
  <Header />
  <!--
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>-->
  <router-view />
</template>

<script>
import Header from "./components/Header";

import { onBeforeMount, provide } from "vue";
import store from "@/store";

export default {
  setup() {
    provide("store", store);
    onBeforeMount(() => {
      store.methods.getWeather();
    });
    return { store };
  },
  components: {
    Header,
  },
};
</script>


<style lang="scss">
body {
  height: 100vh;
  width: 80%;
  margin: 0 auto;
  background: rgb(255,255,255);
background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(158,226,241,1) 100%);
}
</style>