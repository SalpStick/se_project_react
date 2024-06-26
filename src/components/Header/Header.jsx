import "./Header.css";
import logo from "../../images/Logo.png";
import avatar from "../../images/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const DateComponent = () => {
    const currentDate = new Date();
    const options = {
      month: "long",
      day: "numeric",
    };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    return (
      <h2 className="date">
        {formattedDate}, {weatherData.city}
      </h2>
    );
  };

  return (
    <header>
      <nav className="header">
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="App Logo" />
        </NavLink>
        <DateComponent />

        <div className="header__user-container">
          <ToggleSwitch />
          <button
            className="header__add-btn"
            type="button"
            onClick={handleAddClick}
          >
            +Add Clothes
          </button>

          <p className="header__username">Terrence Tegegne</p>
          <NavLink to="/profile">
            <img
              src={avatar}
              alt="App Profile Image"
              className="header__avatar"
            />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
