import "./styles.css";
import celsius from "./images/celsius.svg";
import fahrenheit from "./images/fahrenheit.svg";
import { displayCurrentConditions, displayWeekWeather } from "./displayWeather";
import { getWeather } from "./processData";

let tempUnit = "C",
  speedUnit = "km/hr";
let metricWeather, USWeather;
let currentTime;

const unitBtn = document.querySelector(".unit");
function changeUnit() {
  if (tempUnit == "C") {
    tempUnit = "F";
    speedUnit = "mph";
    displayCurrentConditions(USWeather, tempUnit, speedUnit, currentTime);
    displayWeekWeather(USWeather, tempUnit);
    unitBtn.src = fahrenheit;
  } else {
    tempUnit = "C";
    speedUnit = "km/h";
    displayCurrentConditions(metricWeather, tempUnit, speedUnit, currentTime);
    displayWeekWeather(metricWeather, tempUnit);
    unitBtn.src = celsius;
  }
}

unitBtn.addEventListener("click", changeUnit);

async function getAndShowWeather(city) {
  loader("loading");
  try {
    [metricWeather, currentTime] = await getWeather(city, "metric");
    [USWeather, currentTime] = await getWeather(city, "us");
    if (tempUnit == "C") {
      displayCurrentConditions(metricWeather, tempUnit, speedUnit, currentTime);
      displayWeekWeather(metricWeather, tempUnit);
    } else {
      displayCurrentConditions(USWeather, tempUnit, speedUnit, currentTime);
      displayWeekWeather(USWeather, tempUnit);
    }
    loader("done");
  } catch (error) {
    if (error.message == "400")
      alert("Unable to Find Location. Please try a different Location");
    else {
      console.log(error);
      alert(
        "Sorry. We are facing technical issues at the moment. Please retry later",
      );
    }
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let city = form.querySelector("input").value;
  form.querySelector("input").value = "";
  if (!city == "") getAndShowWeather(city);
});

function loader(status) {
  if (status == "loading") {
    document.querySelector(".content").classList.add("loading");
    document.querySelector(".loaderDiv").classList.add("loading");
  }
  if (status == "done") {
    document.querySelector(".content").classList.remove("loading");
    document.querySelector(".loaderDiv").classList.remove("loading");
  }
}

getAndShowWeather("Bangalore");
document.body.classList.remove("startup");
