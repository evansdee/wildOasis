import { NavLink } from "react-router-dom";
import styles from './app-nav.module.css'

function AppNav() {
    return (
      <nav className={`${styles.appNav} flexRow`}>
        <ul>
            <li>
                <NavLink to="city">Cities</NavLink>
                <NavLink to='country'>Countries</NavLink>
            </li>
        </ul>
      </nav>
      );
}

export default AppNav;