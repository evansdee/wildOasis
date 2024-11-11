import { NavLink,Link } from "react-router-dom";
import styles from "./nav-page.module.css";
import Logo from "./logo";

function Nav() {
  return (
    <main className={styles.nav}>
      <Logo sty={styles.imgIcon}/>
      <ul>
        <li>
        <NavLink to="/product">Product</NavLink>

        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.cta}>Login</NavLink>
        </li>
      </ul>
    </main>
  );
}

export default Nav;
