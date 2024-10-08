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
  let today = new Date();
  let formattedDate =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  let sunsetTime = new Date();
  sunsetTime.setHours(
    weatherJSON.currentConditions.sunset.slice(0, 2),
    weatherJSON.currentConditions.sunset.slice(3, 5),
    weatherJSON.currentConditions.sunset.slice(6),
  );
  let sunriseTime = new Date();
  sunriseTime.setHours(
    weatherJSON.currentConditions.sunrise.slice(0, 2),
    weatherJSON.currentConditions.sunrise.slice(3, 5),
    weatherJSON.currentConditions.sunrise.slice(6),
  );
  let locationTime = calculateTimeOffset(today, weatherJSON.tzoffset);
  if (
    (locationTime > sunsetTime || locationTime < sunriseTime) &&
    weatherJSON.currentConditions.icon == "rain"
  )
    weatherJSON.currentConditions.icon = "rain-night";
  let currentTime = "";
  if (locationTime.getHours() < 10) currentTime += "0";
  currentTime += locationTime.getHours() + ":";
  if (locationTime.getMinutes() < 10) currentTime += "0";
  currentTime += locationTime.getMinutes() + ":";
  if (locationTime.getSeconds() < 10) currentTime += "0";
  currentTime += locationTime.getSeconds();
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

function calculateTimeOffset(currentLocalTime, offset) {
  // Convert the user's timezone offset from decimal hours to milliseconds
  const offsetInMilliseconds = offset * 60 * 60 * 1000;
  // Get the local timezone offset in milliseconds
  const localOffsetInMilliseconds =
    currentLocalTime.getTimezoneOffset() * 60 * 1000;
  // Calculate the time adjusted to the provided timezone offset
  const adjustedTime = new Date(
    currentLocalTime.getTime() +
      localOffsetInMilliseconds +
      offsetInMilliseconds,
  );
  return adjustedTime;
}
