const API_KEY = "3c3de2fa59675ea02592d80266f827fd";
const cityName = document.getElementById("CityName");
const cityCountry = document.getElementById("CityCountry");
const Temp = document.getElementById("Temp");




const weatherInfo = (info) => {
  console.log("Pogoda na dzis:", info);
  cityName.textContent = info.name;
  cityCountry.textContent = info.sys.country;
  Pressure.textContent = info.main.pressure;
  Temp_max.textContent = Math.round(info.main.temp - 273.15) + " Cº";
  Temp_min.textContent = (info.main.temp - 273.15).toFixed() +" Cº";

  const searchBtn = document.getElementById("SearchBtn");
  const citySearch = document.getElementById("CitySearch"); 
};

const getWeatherBySearch = (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
fetch (URL) 
.then((res) => res.json())
.then((res) => console.log(res))
.catch((err) => console.log(err));
};
// Krok 2: pobieramy informacje o pogodzie w naszej szerokości geograficznej i wywołujemy funkcję
// weatherInfo przekazując do niej odpowiedź z naszego fetch/then
const getWeatherByLocation = (coords) => {
  console.log(coords);
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => weatherInfo(res))
    .catch((err) => console.log(err));
};

// Krok 1: uzyskanie informacji na temat współrzędnych geograficznych i przekazanie ich
// do funkcji getWeatherByLocation, a następnie wywołanie jej
const getMyLocation = () => {
  return navigator.geolocation.getCurrentPosition((position) =>
    getWeatherByLocation(position.coords)
  );
};
getMyLocation();

const getSearchResult = () => {
  if(citySearch.value !== ""){
    return getWeatherBySearch(citySearch.value);
  }else {

  console.log("Nic nie wpisano");
};


searchBtn.addEventListener("click", getSearchResult)};
