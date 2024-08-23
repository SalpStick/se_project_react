import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTempUnitContext.js";
import React , { useContext } from 'react';

function Main({ weatherData, handleCardClick, clothingItems, handleCardLike }) {
  const { currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="card__text">
          Today is {currentTemperatureUnit === "C"
            ? weatherData.temp.C + "°C"
            : weatherData.temp.F + "°F"} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            }).map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  handleCardLike={handleCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
