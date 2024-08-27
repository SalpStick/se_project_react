import "./Header.css";
import logo from "../../images/Logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({ handleAddClick, onLoginClick, onRegisterClick, weatherData, isLoggedIn }) {
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

  const currentUser = useContext(CurrentUserContext);

  return (
    <header>
      <nav className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="App Logo" />
        </Link>
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

          {!isLoggedIn && (
          <>
            <div>
              <button
                type="text"
                className="header__register-btn"
                onClick={onRegisterClick}
              >
                Sign Up
              </button>
            </div>
            <div>
              <button
                type="text"
                className="header__login-btn"
                onClick={onLoginClick}
              >
                Log In
              </button>
            </div>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/profile" className="header__profile-link">
              <div>{currentUser.name}</div>
            </Link>
            <div>
              <img
                src={currentUser.avatar}
                alt="logo"
                className="header__avatar-image"
              />
            </div>
          </>
        )}
      </div>
      </nav>
    </header>
  );
}

export default Header;
