import "./styles.css";
import rainsvg from "./images/rain.svg";


let tempUnit='c';

async function getWeather(location="vellore") {
  let weatherData = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&key=LJJ8KJ9LQY5TCRFLW2PUPSTD9`,
  );
  let weatherJSON = await weatherData.json();
  let processedWeather= processWeatherData(weatherJSON);
  displayWeatherData(processedWeather);
  console.log(processedWeather);
}

function processWeatherData(weatherJSON){
  console.log(weatherJSON);
  let date=new Date(weatherJSON.days[0].datetime);
  let formattedDate=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
  return {
    address: weatherJSON.resolvedAddress,
    time: weatherJSON.currentConditions.datetime,
    date: formattedDate,
    conditions: weatherJSON.currentConditions.conditions,
    temperature: weatherJSON.currentConditions.temp,
    mintemp: weatherJSON.days[0].tempmin,
    maxtemp: weatherJSON.days[0].tempmax,
    humidity: weatherJSON.currentConditions.humidity,
    feelsLike: weatherJSON.currentConditions.feelslike,
    sunrise: weatherJSON.currentConditions.sunrise.slice(0,5),
    sunset: weatherJSON.currentConditions.sunset.slice(0,5),
    uvIndex: weatherJSON.currentConditions.uvindex,
    windSpeed: weatherJSON.currentConditions.windspeed,
    precipchance: weatherJSON.currentConditions.precipprob,
    icon: weatherJSON.currentConditions.icon,
    description: weatherJSON.description,
    alerts: weatherJSON.alerts,
    next7Days: weatherJSON.days.slice(1),
  }
}

function displayWeatherData(processedWeather){
  const currentPrimary=document.querySelector('.currentweather .primary');
  const currentSecondary=document.querySelector('.currentweather .secondary');
  currentPrimary.querySelector('.location').textContent=processedWeather.address;
  currentPrimary.querySelector('.time').textContent=processedWeather.time;
  currentPrimary.querySelector('.temp').innerHTML=processedWeather.temperature+`&deg;${tempUnit}`;
  currentPrimary.querySelector('.date').textContent=processedWeather.date;
  currentPrimary.querySelector('.conditions').textContent=processedWeather.conditions;
  currentPrimary.querySelector('.desc').textContent=processedWeather.description;
  currentPrimary.querySelector('.alerts').textContent=processedWeather.alerts;
  currentSecondary.querySelector('.feelslike .data').innerHTML=processedWeather.feelsLike+'&deg;c';
  currentSecondary.querySelector('.humidity .data').textContent=processedWeather.humidity+' %';
  currentSecondary.querySelector('.sunrise .data').textContent=processedWeather.sunrise;
  currentSecondary.querySelector('.sunset .data').textContent=processedWeather.sunset;
  let windUnit=document.createElement('span');
  windUnit.textContent=' km/hr';
  windUnit.style.fontSize='1rem';
  let windValue=document.createElement('span');
  windValue.textContent=processedWeather.windSpeed
  currentSecondary.querySelector('.windspeed .data').append(windValue,windUnit);
  currentSecondary.querySelector('.uvindex .data').textContent=processedWeather.uvIndex;
  currentSecondary.querySelector('.mintemp .data').innerHTML=processedWeather.mintemp+'&deg;c';
  currentSecondary.querySelector('.maxtemp .data').innerHTML=processedWeather.maxtemp+'&deg;c';
  currentSecondary.querySelector('.precipchance .data').textContent=processedWeather.precipchance+' %';
  switch (processedWeather.icon) {
    case "rain":
      currentPrimary.querySelector('.icon').src=rainsvg;
      break;
  
    default:
      break;
  }
}

getWeather('bangalore');
