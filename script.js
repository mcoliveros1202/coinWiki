function searchInput(event) {
    event.preventDefault()
    currentWeatherDataApi(searchInputEl.val()) // the search input value aka cityName
}