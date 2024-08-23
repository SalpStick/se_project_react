import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/Constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTempUnitContext.js";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import { getItems, addItems, deleteItems } from "../../utils/api";
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
  const isOpen = activeModal !== null;
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCreateClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditClick = () => setActiveModal("edit-profile");
  const handleAddClick = () => setActiveModal("add-garment");
  const closeActiveModal = () => setActiveModal("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleWeatherChange = (event) => {
    setSelectedWeather(event.target.value);
  };

  const deleteCard = (id) => {
    deleteItems(id)
      .then(() => {
        setClothingItems(clothingItems.filter((card) => id !== card._id));
        closeActiveModal();
      })

      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddItemModalSubmit = ( name, link, weather ) => {
      addItems( name, link, weather )
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
        return fetchUserData(token);
      })
      .then((userData) => {
        closeActiveModal();
        setCurrentUser(userData);
        setIsLoggedIn(true);
        history.push("/profile");
      })
      .catch((err) => {
        console.log("Error in handlelogin");
      });
  };

  const handleLogOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setIsLoggedIn(false);
    history.push("/");
  };

  const handleRegisterSubmit = (values) => {
    console.log("Register values: ", values);
    signup(values.name, values.avatar, values.email, values.password)
      .then((data) => {
        console.log("Signup response data", data);
        const { token } = data;
        if (!token) {
          throw new Error("No token found in signup response");
        }
        localStorage.setItem("jwt", token);
        return fetchUserData(token);
      })
      .then((userData) => {
        console.log("User data: ", userData);
        closeActiveModal();
        setCurrentUser(userData);
        setIsLoggedIn(true);
        console.log("From handle register");
        history.push("profile");
      })
      .catch((err) => {
        console.log("Error in handlelRegister: ", err.message);
      });
  };

  const handleEditProfileSubmit = (values) => {
    editProfile(values)
      .then((userData) => {
        setCurrentUser(userData.data);
        closeActiveModal();
        console.log(userData);
        history.push("/profile");
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
    <div className="page">
      <div className="page__content">
      <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
        <Header 
          handleAddClick={handleAddClick}
          onLoginClick={handleLoginClick}
          onRegisterClick={handleCreateClick} 
          weatherData={weatherData} 
          isLoggedIn={isLoggedIn}/>
        <Switch>
          <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
            <Profile
              weatherData={weatherData}
              handleCardClick={handleCardClick}
              clothingItems={clothingItems}
              handleAddClick={handleAddClick}
              onLogOut={handleLogOut}
              onEditProfile={handleEditClick}
              onProfileChange={handleEditProfileSubmit}
              onCardLIke={handleCardLike}
            ></Profile>
          </ProtectedRoute>
          <Route exact path="/">
            <Main
              weatherData={weatherData}
              handleCardClick={handleCardClick}
              clothingItems={clothingItems}
              onCardLIke={handleCardLike}
            />
          </Route>
        </Switch>

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
          />
          <RegisterModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "register"}
            onRegister={handleRegisterSubmit} 
          />
        <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
