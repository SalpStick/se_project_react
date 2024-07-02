import React from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTempUnitContext.js";

const ToggleSwitch = () => {
    const { handleToggleSwitchChange, currentTemperatureUnit } = React.useContext(
        CurrentTemperatureUnitContext
      );
      return (
          <label className="switch" htmlFor="temp__type">
            <input
              className="switch__box"
              type="checkbox"
              onChange={handleToggleSwitchChange}
            />
            <span
              className={
                currentTemperatureUnit === "F"
                  ? "switch__slider switch__slider-F"
                  : "switch__slider switch__slider-C"
              }
            />
            <p
              className={`switch__temp-F ${
                currentTemperatureUnit === "F" && "switch__active"
              }`}
            >
              F
            </p>
            <p
              className={`switch__temp-C ${
                currentTemperatureUnit === "C" && "switch__active"
              }`}
            >
              C
            </p>
          </label>
      );
    };
export default ToggleSwitch;
