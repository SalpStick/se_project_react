import React from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTempUnitContext.js";

const ToggleSwitch = () => {
    // const [currentTempUnit, handleToggleSwitch] = useState("C")

    // const handleChange = (e) => {
    //     if(currentTempUnit === "C") handleToggleSwitch("F")
    //     if(currentTempUnit === "F") handleToggleSwitch("C")
    // }
    const { handleToggleSwitchChange, currentTemperatureUnit } = React.useContext(
        CurrentTemperatureUnitContext
      );
      return (
        <>
          <label className="switch-label" htmlFor="temp__type">
            <input
              className="switch-checkbox"
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
        </>
      );
    };
export default ToggleSwitch;
