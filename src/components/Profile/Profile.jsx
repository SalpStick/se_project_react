import SideBar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import react from "react";
import "./Profile.css";

function Profile({ weatherData, handleCardClick,clothingItems,handleAddClick }) {
  return (
    <div className="profile__page">
      <SideBar weatherData={weatherData} />

      <ClothesSection
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        clothingItems = {clothingItems}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}
export default Profile;