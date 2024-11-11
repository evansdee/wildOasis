import { Outlet } from "react-router-dom";
import AppNav from "./app-nav";
import Logo from "./logo";
import style from "./sidebar.module.css";

const ll = {
  margin: "0 auto",
};

function SideBar() {
  return (
    <div className={`${style.sidebar}`}>
      <div className="ctr">
        <Logo clss={ll} />
      </div>
      <AppNav />

      <Outlet />

      <footer>
        <p>Copyright {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default SideBar;
