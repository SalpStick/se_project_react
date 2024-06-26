import avatar from "../../assets/profile image.svg";
import "./SideBar.css";
function SideBar() {
  return (
    <div className="sidebar-page">
      <img src={avatar} alt="App Profile Image" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}
export default SideBar;
