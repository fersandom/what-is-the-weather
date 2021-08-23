<template>
  <div v-if="store.weatherDataReady.value === true" class="home-container">
    <div class="today-box">
      <div class="box-section">
        <img :src="'http:' + store.state.currentDayImage" alt="" />
      </div>
      <div class="box-section">
        <fa icon="thermometer-quarter" size="2x" />
        <p class="font-xl">{{ store.state.weatherData.current.temp_c }}°</p>
      </div>
      <div class="box-section">
        <fa icon="cloud-rain" size="2x" />
        <p class="font-xl">{{ store.state.weatherData.current.precip_mm }}mm</p>
      </div>
    </div>
    <div v-if="store.weatherDataReady.value === true" class="home-container">
      <div class="forecast-container">
        <table class="forecast-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Max Temp</th>
              <th>Min Temp</th>
              <th>Chance of rain</th>
              <th>Precip</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr
              v-for="(item, i) in store.state.weatherData.forecast.forecastday"
              :key="i"
              class="table-row"
            >
              <td v-if="i == 0">Today</td>
              <td v-else-if="i==1">Tomorrow</td>
              <td v-else>
                {{ store.methods.getDay(store.state.weatherData.forecast.forecastday[i].date) }}
              </td>
              <td>
                {{
                  store.state.weatherData.forecast.forecastday[i].day.maxtemp_c
                }}°
              </td>
              <td>
                {{
                  store.state.weatherData.forecast.forecastday[i].day.mintemp_c
                }}°
              </td>
              <td>
                {{
                  store.state.weatherData.forecast.forecastday[i].day
                    .daily_chance_of_rain
                }}%
              </td>
              <td>
                {{
                  store.state.weatherData.forecast.forecastday[i].day
                    .totalprecip_mm
                }}mm
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
.today-box {

@include phone{
  width: 100%;
}

@include tablet {
  width: 100%;
}

  width: 40%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(auto);
  margin-top: 50px;
  padding: 20px 0;
  border: 1px $main-color solid;
  border-radius: 40px 5px 20px 15px;
  font-size: $text-l;
  background-color: #fff;
}
.location-box {
  display: block;
}

.box-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.forecast-container {
  width: 100%;
  padding-top: 60px;
}

.forecast-table {
  width: 100%;
  font-size: $text-l;
  border-collapse:separate;
  border-spacing:0 30px;
}

.table-body {
  text-align: center;
}

img {
  height: 100px;
  width: 100px;
}
</style>