import SideBar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import react from "react";
import "./Profile.css";

function Profile({ weatherData, handleCardClick, clothingItems, handleAddClick, handleCardLike, handleLogout, handleEditProfile }) {
  return (
    <div className="profile__page">
      <SideBar 
      weatherData={weatherData} 
      handleLogout={handleLogout}
      handleEditProfile={handleEditProfile}
      />

      <ClothesSection
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        clothingItems = {clothingItems}
        handleAddClick={handleAddClick}
        handleCardlike={handleCardLike}
      />
    </div>
  );
}
export default Profile;