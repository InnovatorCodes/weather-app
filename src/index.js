import "./styles.css";
import rainsvg from "./images/rain.svg";
import cloudysvg from "./images/cloudy.svg";
import snowsvg from "./images/snow.svg";
import windysvg from "./images/windy.svg";
import cleardaysvg from "./images/clear-day.svg";
import clearnightsvg from "./images/clear-night.svg";
import fogsvg from "./images/fog.svg";
import partlycloudydaysvg from "./images/partly-cloudy-day.svg";
import partlycloudynightsvg from "./images/partly-cloudy-night.svg";
import precipitationsvg from "./images/precipitation.svg";
import celsius from "./images/celsius.svg";
import fahrenheit from "./images/fahrenheit.svg";

let tempUnit='c', speedUnit='km/hr';
let metricWeather,USWeather;

async function getWeather(location="bangalore",unit) {
  let weatherData = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${unit}&key=LJJ8KJ9LQY5TCRFLW2PUPSTD9`,
  );
  let weatherJSON = await weatherData.json();
  console.log(weatherJSON);
  let processedWeather= processWeatherData(weatherJSON);
  console.log(processedWeather);
  return processedWeather;
}

function processWeatherData(weatherJSON){
  //console.log(weatherJSON);
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

function displayCurrentConditions(processedWeather){
  const currentPrimary=document.querySelector('.currentweather .primary');
  const currentSecondary=document.querySelector('.currentweather .secondary');
  currentPrimary.querySelector('.location').textContent=processedWeather.address;
  currentPrimary.querySelector('.time').textContent=processedWeather.time;
  currentPrimary.querySelector('.temp').innerHTML=processedWeather.temperature+`&deg;${tempUnit}`;
  currentPrimary.querySelector('.date').textContent=processedWeather.date;
  currentPrimary.querySelector('.conditions').textContent=processedWeather.conditions;
  currentPrimary.querySelector('.desc').textContent=processedWeather.description;
  if(processedWeather.alerts.length==0) currentPrimary.querySelector('.alerts').style.display='none';
  currentSecondary.querySelector('.feelslike .data').innerHTML=processedWeather.feelsLike+`&deg;${tempUnit}`;
  currentSecondary.querySelector('.humidity .data').textContent=processedWeather.humidity+' %';
  currentSecondary.querySelector('.sunrise .data').textContent=processedWeather.sunrise;
  currentSecondary.querySelector('.sunset .data').textContent=processedWeather.sunset;
  let windUnit=document.createElement('span');
  windUnit.textContent=' '+speedUnit;
  windUnit.style.fontSize='1rem';
  let windValue=document.createElement('span');
  windValue.textContent=processedWeather.windSpeed;
  const windSpeedDiv=currentSecondary.querySelector('.windspeed .data');
  while (windSpeedDiv.hasChildNodes()) windSpeedDiv.firstChild.remove()
  windSpeedDiv.append(windValue,windUnit);
  currentSecondary.querySelector('.uvindex .data').textContent=processedWeather.uvIndex;
  currentSecondary.querySelector('.mintemp .data').innerHTML=processedWeather.mintemp+`&deg;${tempUnit}`;
  currentSecondary.querySelector('.maxtemp .data').innerHTML=processedWeather.maxtemp+`&deg;${tempUnit}`;
  currentSecondary.querySelector('.precipchance .data').textContent=processedWeather.precipchance+' %';
  setConditionIcon(processedWeather.icon,currentPrimary.querySelector('.icon'));
}

function displayWeekWeather(processedWeather){
  document.querySelector('.nextweek').removeChild(document.querySelector('.days'));
  const days=document.createElement('div');
  days.classList.add('days');
  processedWeather.next7Days.forEach((day)=>{
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    const dateDiv=document.createElement('div');
    dateDiv.classList.add('date');
    let date=new Date(day.datetime);
    dateDiv.textContent=date.getDate()+'/'+(date.getMonth()+1);
    const img=document.createElement('img');
    setConditionIcon(day.icon,img);
    const temp=document.createElement('div');
    temp.classList.add('temp');
    temp.innerHTML=day.temp+`&deg;${tempUnit}`;
    const maxtemp=document.createElement('div');
    maxtemp.classList.add('maxtemp');
    maxtemp.innerHTML='Max: '+day.tempmax+`&deg;${tempUnit}`;
    const mintemp=document.createElement('div');
    mintemp.classList.add('mintemp');
    mintemp.innerHTML='Min: '+day.tempmin+`&deg;${tempUnit}`;
    const precip=document.createElement('div');
    precip.classList.add('precipitation');
    const icon=document.createElement('img');
    icon.classList.add('icon');
    icon.src=precipitationsvg;
    const data=document.createElement('div');
    data.classList.add('data');
    data.textContent=day.precipprob+' %';
    precip.append(icon,data);
    dayDiv.append(dateDiv,img,temp,maxtemp,mintemp,precip);
    days.append(dayDiv);
  })
  document.querySelector('.nextweek').appendChild(days);
}

function setConditionIcon(icon,imgElem){
  switch (icon) {
    case "rain":
      imgElem.src=rainsvg;
      break;
    case "snow":
      imgElem.src=snowsvg;
      break;
    case "fog":
      imgElem.src=fogsvg;
      break;
    case "wind":
      imgElem.src=windysvg;
      break;
    case "cloudy":
      imgElem.src=cloudysvg;
      break;
    case "partly-cloudy-day":
      imgElem.src=partlycloudydaysvg;
      break;
    case "partly-cloudy-night":
      imgElem.src=partlycloudynightsvg;
      break;
    case "clear-day":
      imgElem.src=cleardaysvg;
      break;
    case "clear-night":
      imgElem.src=clearnightsvg;
      break;
    default:
      break;
  }
}

const unitBtn=document.querySelector('.unit');
function changeUnit(){
  if(tempUnit=='c'){
    tempUnit='F';
    speedUnit='mph'
    displayCurrentConditions(USWeather);
    displayWeekWeather(USWeather);
    unitBtn.src=fahrenheit;
  } 
  else{
    tempUnit='c';
    speedUnit='km/h'
    displayCurrentConditions(metricWeather);
    displayWeekWeather(metricWeather);
    unitBtn.src=celsius;
  }
}

unitBtn.addEventListener('click',changeUnit);

async function getAndShowWeather(city){
  metricWeather=await getWeather(city,'metric');
  USWeather=await getWeather(city,'us');
  if(tempUnit=='c'){
    displayCurrentConditions(metricWeather);
    displayWeekWeather(metricWeather);
  }
  else{
    displayCurrentConditions(USWeather);
    displayWeekWeather(USWeather);
  }
  
}

const form=document.querySelector('form');
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  let city=form.querySelector('input').value;
  form.querySelector('input').value;
  getAndShowWeather(city);
})



getAndShowWeather('Bangalore')