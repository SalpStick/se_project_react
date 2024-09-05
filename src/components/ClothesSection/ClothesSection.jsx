import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick, handleCardlike }) {
  const currentUser = useContext(CurrentUserContext);
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
  return (
    <div className="clothes-section">
      <div className="clothes__button">
        <p className="clothes-section_your-itemsText">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothing-section_addBtn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userClothingItems.map((item) => {
          return(
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={handleCardlike}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
