//Creating a custom store

import { reactive, ref } from "vue";

//Creating state object

const state = reactive({
    currentDate: new Date(),
    weatherData: [],
    currentDayImage: '',
    city: '',
    weatherDataReady: false,
    lastSearch: ''
});

const weatherDataReady = ref(false);
const citySearch = ref('');

//Methods Object
const methods = {
    async getWeather(prepareSearch) {

        weatherDataReady.value = false;

        this.loadFromStorage();

        if (!prepareSearch && !state.lastSearch) {
            const response = await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=9863abeb6a1b48a393d72909211908&q=Barcelona&days=4&aqi=no&alerts=no`)
            state.weatherData = await response.json()
            state.currentDayImage = await state.weatherData.current.condition.icon
            weatherDataReady.value = true;
        } else if (prepareSearch && !state.lastSearch) {
            const response = await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=9863abeb6a1b48a393d72909211908&q=${prepareSearch}&days=4&aqi=no&alerts=no`)
            state.weatherData = await response.json()
            state.currentDayImage = await state.weatherData.current.condition.icon
            weatherDataReady.value = true;
        } else {
            const response = await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=9863abeb6a1b48a393d72909211908&q=${state.lastSearch}&days=4&aqi=no&alerts=no`)
            state.weatherData = await response.json()
            state.currentDayImage = await state.weatherData.current.condition.icon
            weatherDataReady.value = true;
        }

    },
    prepareSearch() {
        let searchQuery = citySearch.value.toString();
        searchQuery = searchQuery.replace(/ /g, "_");
        searchQuery = searchQuery.toLowerCase();
        console.log(searchQuery);
        state.lastSearch = searchQuery;
        this.saveInStorage();
        this.getWeather(searchQuery);
    },

    saveInStorage() {
        localStorage.setItem("lastSearch", state.lastSearch);
    },

    loadFromStorage() {
        const loadLastSearch = localStorage.getItem("lastSearch");
        state.lastSearch = loadLastSearch;
    },

    getDay(date) {

        return this.getDayName(date, 'en-EN')


    },

    getDayName(date, locale) {
        const parts = date.split("-");
        const formattedDate = new Date(parts[0], parts[1] - 1, parts[2]);
        return formattedDate.toLocaleDateString(locale, { weekday: 'long' });        
    }
}

export default {
    state,
    methods,
    weatherDataReady,
    citySearch

}