import React from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/Constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOption = filteredOptions[0];

  const defaultImageUrl = "../images/day/default.png";

  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {
        currentTemperatureUnit === "C"
          ? weatherData.temp.C + "°C"
          : weatherData.temp.F + "°F"}
      </p>
      <img
        src={weatherOption ? weatherOption.url : defaultImageUrl}
        alt={`card showing ${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
        onError={(e) => {
          e.target.src = defaultImageUrl;
        }}
      />
    </section>
  );
}

export default WeatherCard;
