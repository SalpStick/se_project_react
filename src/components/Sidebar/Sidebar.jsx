import avatar from "../../images/Avatar.png"
import "./Sidebar.css";

function SideBar() {
  return (
    <div className="sidebar-page">
      <img src={avatar} alt="App Profile Image" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}
export default SideBar;
