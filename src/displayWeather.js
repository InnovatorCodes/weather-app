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
import rainyBG from "./images/rainy.jpg";
import rainyNightBG from "./images/rain-night.jpg";
import clearDayBG from "./images/clear-day.jpg";
import clearNightBG from "./images/clear-night.jpg";
import partlyCloudyDayBG from "./images/partly-cloudy-day.jpg";
import partlyCloudyNightBG from "./images/partly-cloudy-night.jpg";
import snowBG from "./images/snow.jpg";
import cloudyBG from "./images/cloudy.jpg";
import windyBG from "./images/windy.jpg";
import fogBG from "./images/fog.jpg";
export { displayCurrentConditions, displayWeekWeather };

function displayCurrentConditions(processedWeather, tempUnit, speedUnit) {
  const currentPrimary = document.querySelector(".currentweather .primary");
  const currentSecondary = document.querySelector(".currentweather .secondary");
  currentPrimary.querySelector(".location").textContent =
    processedWeather.address;
  currentPrimary.querySelector(".time").textContent = processedWeather.time;
  currentPrimary.querySelector(".temp").innerHTML =
    processedWeather.temperature + `&deg;${tempUnit}`;
  currentPrimary.querySelector(".date").textContent = processedWeather.date;
  currentPrimary.querySelector(".conditions").textContent =
    processedWeather.conditions;
  currentPrimary.querySelector(".desc").textContent =
    processedWeather.description;
  currentSecondary.querySelector(".feelslike .data").innerHTML =
    processedWeather.feelsLike + `&deg;${tempUnit}`;
  currentSecondary.querySelector(".humidity .data").textContent =
    processedWeather.humidity + " %";
  currentSecondary.querySelector(".sunrise .data").textContent =
    processedWeather.sunrise;
  currentSecondary.querySelector(".sunset .data").textContent =
    processedWeather.sunset;
  let windUnit = document.createElement("span");
  windUnit.textContent = " " + speedUnit;
  windUnit.style.fontSize = "1rem";
  let windValue = document.createElement("span");
  windValue.textContent = processedWeather.windSpeed;
  const windSpeedDiv = currentSecondary.querySelector(".windspeed .data");
  while (windSpeedDiv.hasChildNodes()) windSpeedDiv.firstChild.remove();
  windSpeedDiv.append(windValue, windUnit);
  currentSecondary.querySelector(".uvindex .data").textContent =
    processedWeather.uvIndex;
  currentSecondary.querySelector(".mintemp .data").innerHTML =
    processedWeather.mintemp + `&deg;${tempUnit}`;
  currentSecondary.querySelector(".maxtemp .data").innerHTML =
    processedWeather.maxtemp + `&deg;${tempUnit}`;
  currentSecondary.querySelector(".precipchance .data").textContent =
    processedWeather.precipchance + " %";
  setConditionIcon(
    processedWeather.icon,
    currentPrimary.querySelector(".icon"),
  );
  setBGImage(processedWeather.icon);
}

function displayWeekWeather(processedWeather, tempUnit) {
  document
    .querySelector(".nextweek")
    .removeChild(document.querySelector(".days"));
  const days = document.createElement("div");
  days.classList.add("days");
  processedWeather.next7Days.forEach((day) => {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    let date = new Date(day.datetime);
    dateDiv.textContent = date.getDate() + "/" + (date.getMonth() + 1);
    const img = document.createElement("img");
    setConditionIcon(day.icon, img);
    const temp = document.createElement("div");
    temp.classList.add("temp");
    temp.innerHTML = day.temp + `&deg;${tempUnit}`;
    const maxtemp = document.createElement("div");
    maxtemp.classList.add("maxtemp");
    maxtemp.innerHTML = "Max: " + day.tempmax + `&deg;${tempUnit}`;
    const mintemp = document.createElement("div");
    mintemp.classList.add("mintemp");
    mintemp.innerHTML = "Min: " + day.tempmin + `&deg;${tempUnit}`;
    const precip = document.createElement("div");
    precip.classList.add("precipitation");
    const icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src = precipitationsvg;
    const data = document.createElement("div");
    data.classList.add("data");
    data.textContent = day.precipprob + " %";
    precip.append(icon, data);
    dayDiv.append(dateDiv, img, temp, maxtemp, mintemp, precip);
    days.append(dayDiv);
  });
  document.querySelector(".nextweek").appendChild(days);
}

function setConditionIcon(icon, imgElem) {
  switch (icon) {
    case "rain":
      imgElem.src = rainsvg;
      break;
    case "rain-night":
      imgElem.src = rainsvg;
      break;
    case "snow":
      imgElem.src = snowsvg;
      break;
    case "fog":
      imgElem.src = fogsvg;
      break;
    case "wind":
      imgElem.src = windysvg;
      break;
    case "cloudy":
      imgElem.src = cloudysvg;
      break;
    case "partly-cloudy-day":
      imgElem.src = partlycloudydaysvg;
      break;
    case "partly-cloudy-night":
      imgElem.src = partlycloudynightsvg;
      break;
    case "clear-day":
      imgElem.src = cleardaysvg;
      break;
    case "clear-night":
      imgElem.src = clearnightsvg;
      break;
    default:
      break;
  }
}

function setBGImage(icon) {
  switch (icon) {
    case "rain":
      document.body.style.backgroundImage = `url(${rainyBG})`;
      break;
    case "rain-night":
      document.body.style.backgroundImage = `url(${rainyNightBG})`;
      break;
    case "snow":
      document.body.style.backgroundImage = `url(${snowBG})`;
      break;
    case "fog":
      document.body.style.backgroundImage = `url(${fogBG})`;
      break;
    case "wind":
      document.body.style.backgroundImage = `url(${windyBG})`;
      break;
    case "cloudy":
      document.body.style.backgroundImage = `url(${cloudyBG})`;
      break;
    case "partly-cloudy-day":
      document.body.style.backgroundImage = `url(${partlyCloudyDayBG})`;
      break;
    case "partly-cloudy-night":
      document.body.style.backgroundImage = `url(${partlyCloudyNightBG})`;
      break;
    case "clear-day":
      document.body.style.backgroundImage = `url(${clearDayBG})`;
      break;
    case "clear-night":
      document.body.style.backgroundImage = `url(${clearNightBG})`;
      break;
    default:
      break;
  }
}
