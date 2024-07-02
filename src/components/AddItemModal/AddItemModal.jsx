import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import App from "../App/App.jsx";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ isOpen, onAddItem, closeActiveModal }) => {
  const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [weather, setWeather] = useState('');

    useEffect(()=>{
      if(isOpen){
          setName('');
          setLink('');
          setWeather('');
      }
  }, [isOpen]);

  const handleNameChange = (event) => {
      setName(event.target.value);
  };

  const handleLinkChange = (event) => {
      setLink(event.target.value);
  };

  const handleWeatherChange = (event) => {
      setWeather(event.target.value);
      console.log(weather);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      onAddItem( name, link, weather );
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      title="New garmet"
      buttonText="Add Garment"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="name">
        Name
      </label>
      <input
        className="modal__input"
        type="text"
        name="name"
        id="name"
        value={name}
        placeholder="Name"
        onChange={handleNameChange}
      />
      <label className="modal__label" htmlFor="link">
        Image
      </label>
      <input
        className="modal__input"
        type="url"
        name="link"
        id="link"
        placeholder="Image URL"
        value={link}
        onChange={handleLinkChange}
      />
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-container">
          <label
            htmlFor="hot"
            className="modal__input modal__input_type_radio modal__input_type_radio-hot"
          >
            <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            id="hot"
            value="hot"
            onChange={handleWeatherChange}
          />
          Hot
          </label>
        </div>
        <div className="modal__radio-container">
          <label
            htmlFor="warm"
            className="modal__input modal__input_type_radio"
          >
             <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="warm"
            value="warm"
            onChange={handleWeatherChange}
          />

             Warm
          </label>
        </div>
        <div className="modal__radio-container">
          <label
            htmlFor="cold"
            className="modal__input modal__input_type_radio"
          >
            <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="cold"
            value="cold"
            onChange={handleWeatherChange}
          />

             Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;