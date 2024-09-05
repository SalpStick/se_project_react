import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ closeActiveModal, onEditProfile, isOpen }) => {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title={"Change profile data"}
      closeActiveModal={closeActiveModal}
      modalType={"edit_profile"}
      buttonText={"Save changes"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Name *{" "}
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="100"
            placeholder="Name"
            className="modal__input"
            value={name}
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Avatar URL *{" "}
          <input
            type="url"
            name="avatar"
            minLength="5"
            maxLength="100"
            placeholder="Avatar URL"
            className="modal__input"
            value={avatar}
            onChange={handleAvatarChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
