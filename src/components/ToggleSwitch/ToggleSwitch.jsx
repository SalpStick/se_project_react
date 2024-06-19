import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch = () => {
    const [currentTempUnit, handleToggleSwitch] = useState("C")

    const handleChange = (e) => {
        if(currentTempUnit === "C") handleToggleSwitch("F")
        if(currentTempUnit === "F") handleToggleSwitch("C")
    }
    return (
        <label className="switch">
            <input type="checkbox"
            className="switch_box"
            onChange={handleChange}/>
            <span></span>
            <p>F</p>
            <p>C</p>
        </label>
    )
}

export default ToggleSwitch;
