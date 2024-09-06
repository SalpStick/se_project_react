import React, { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/Constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTempUnitContext.js";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItems,
  deleteItems,
  getUserInfo,
  likeCard,
  dislikeCard,
} from "../../utils/api";
import { signin, signup, fetchUserData, editProfile } from "../../utils/auth";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: {
      F: 999,
      C: 999,
    },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleCreateClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditClick = () => setActiveModal("edit-profile");
  const handleAddClick = () => setActiveModal("add-garment");
  const closeActiveModal = () => setActiveModal("");

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleWeatherChange = (event) => {
    setSelectedWeather(event.target.value);
  };

  const deleteCard = (item) => {
    const token = localStorage.getItem("jwt");
    const id = item._id;

    deleteItems(id, token)
      .then(() => {
        setClothingItems(clothingItems.filter((card) => id !== card._id));
        closeActiveModal();
      })

      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddItemModalSubmit = (name, link, weather) => {
    const owner = currentUser;
    addItems(name, link, weather, owner)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // const handleOutsideClick = (event) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target)) {
  //     closeActiveModal();
  //   }
  // };

  const handleLoginSubmit = (values) => {
    signin(values.email, values.password)
      .then((data) => {
        const { token } = data;
        localStorage.setItem("jwt", token);
        return getUserInfo(token);
      })
      .then((userData) => {
        closeActiveModal();
        setCurrentUser(userData);
        setIsLoggedIn(true);
        navigate("/profile");
      })
      .catch((err) => {
        console.log("Error in handlelogin");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleRegisterSubmit = (values) => {
    console.log("Register values: ", values);
    signup(values.name, values.avatar, values.email, values.password)
      .then(() => {
        return signin(values.email, values.password);
      })
      .then((data) => {
        console.log("Signup response data", data);
        const { token } = data;
        console.log({ token });
        if (!token) {
          throw new Error("No token found in signup response");
        }
        localStorage.setItem("jwt", token);
        return getUserInfo(token);
      })
      .then((userData) => {
        console.log("User data: ", userData);
        closeActiveModal();
        setCurrentUser(userData);
        setIsLoggedIn(true);
        console.log("From handle register");
        navigate("/profile");
      })
      .catch((err) => {
        console.log("Error in handleRegister: ", err.message);
      });
  };

  const handleEditProfileSubmit = (values) => {
    editProfile(values)
      .then((userData) => {
        setCurrentUser(userData.data);
        closeActiveModal();
        console.log(userData);
        navigate("/profile");
      })
      .catch((err) => {
        console.log("Error in handleEditProfile");
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      likeCard(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log("Error adding like:", err));
    } else {
      dislikeCard(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log("Error removing like:", err));
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      return;
    }

    getUserInfo(localStorage.getItem("jwt"))
      .then(({ name, email, avatar, _id }) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, email, avatar, _id });
        navigate("/");
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
        console.log(data);
      })
      .catch(console.err);
  }, []);

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              handleProfileClick={() => Navigate("/profile")}
              handleAddClick={handleAddClick}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleCreateClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    children={
                      <Profile
                        weatherData={weatherData}
                        handleCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                        handleLogout={handleLogout}
                        handleEditProfile={handleEditClick}
                        handleProfileChange={handleEditProfileSubmit}
                        handleCardLike={handleCardLike}
                      />
                    }
                    loggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                  />
                }
              />
            </Routes>

            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemModalSubmit}
            />
            <ItemModal
              closeActiveModal={closeActiveModal}
              activeModal={activeModal}
              card={selectedCard}
              deleteCard={deleteCard}
            />
            <EditProfileModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "edit-profile"}
              onEditProfile={handleEditProfileSubmit}
            />
            <LoginModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "login"}
              onLogin={handleLoginSubmit}
              handleOpenRegisterModal={handleCreateClick}
            />
            <RegisterModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "register"}
              onRegister={handleRegisterSubmit}
              handleOpenLoginModal={handleLoginClick}
            />
            <Footer />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
