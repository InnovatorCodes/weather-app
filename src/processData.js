export { getWeather };

async function getWeather(location = "bangalore", unit) {
  let response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${unit}&key=LJJ8KJ9LQY5TCRFLW2PUPSTD9`,
  );
  if (!response.ok) throw new Error(response.status);
  let weatherData = await response.json();
  let processedWeather = processWeatherData(weatherData);
  return processedWeather;
}

function processWeatherData(weatherJSON) {
  let date = new Date(weatherJSON.days[0].datetime);
  let formattedDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  let sunsetTime = new Date();
  sunsetTime.setHours(
    weatherJSON.currentConditions.sunset.slice(0, 2),
    weatherJSON.currentConditions.sunset.slice(3, 5),
    weatherJSON.currentConditions.sunset.slice(6),
  );
  let today = new Date();
  if (today > sunsetTime && weatherJSON.currentConditions.icon == "rain")
    weatherJSON.currentConditions.icon = "rain-night";
  let currentTime = "";
  if (today.getHours() < 10) currentTime += "0";
  currentTime += today.getHours() + ":";
  if (today.getMinutes() < 10) currentTime += "0";
  currentTime += today.getMinutes() + ":";
  if (today.getSeconds() < 10) currentTime += "0";
  currentTime += today.getSeconds();
  return {
    address: weatherJSON.resolvedAddress,
    time: currentTime,
    date: formattedDate,
    conditions: weatherJSON.currentConditions.conditions,
    temperature: weatherJSON.currentConditions.temp,
    mintemp: weatherJSON.days[0].tempmin,
    maxtemp: weatherJSON.days[0].tempmax,
    humidity: weatherJSON.currentConditions.humidity,
    feelsLike: weatherJSON.currentConditions.feelslike,
    sunrise: weatherJSON.currentConditions.sunrise.slice(0, 5),
    sunset: weatherJSON.currentConditions.sunset.slice(0, 5),
    uvIndex: weatherJSON.currentConditions.uvindex,
    windSpeed: weatherJSON.currentConditions.windspeed,
    precipchance: weatherJSON.currentConditions.precipprob,
    icon: weatherJSON.currentConditions.icon,
    description: weatherJSON.description,
    next7Days: weatherJSON.days.slice(1),
  };
}
