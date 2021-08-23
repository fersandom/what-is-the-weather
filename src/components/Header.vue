<template>
  <div v-if="store.weatherDataReady.value === true" class="header-container">
    <div class="header-main">
      <div class="header-title">
        <h3 class="city-name">
          {{ store.state.weatherData.location.name }}
        </h3>
      </div>
      <div class="header-secondary">
        <h5 class="country-name">
          {{ store.state.weatherData.location.country }}
        </h5>
      </div>
    </div>
    <div class="search-bar">
      <form action="">
        <input
          placeholder=""
          v-model.trim="store.citySearch.value"
          type="text"
        />
        <button v-on:click.prevent="store.methods.prepareSearch()" type="submit" >Search</button>
        <fa icon="search" />
      </form>
      
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const store = inject("store");

    return { store };
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-main {
  padding: 0;
}
.city-name {
  padding: 0;
  margin: 0;
  font-size: $text-xl;
}
.header-secondary {
  padding: 0;
  margin: 0;
}
.country-name {
  margin: 0;
  font-size: $text-l;
}

.search-bar {
  input {
    font-size: $text-l;
    padding: 10px;
    width: 80px;
    height: 24px;
    background: none;
    border: 1px solid $main-color;
    border-radius: 50px;
    box-sizing: border-box;
    font-size: $text-l;
    color: $main-color;
    outline: none;
    transition: 0.5s;
    margin-right: 15px;
    
  }
  input:hover{
    width: 200px;
    border-radius: 10px;
    @include phone{
      width: 100px;
    }
  }
  button {
    display: none;
  }

}
</style>