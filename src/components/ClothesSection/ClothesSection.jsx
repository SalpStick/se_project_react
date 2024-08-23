import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick, handleCardlike }) {
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
        {clothingItems.map((item) => {
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
