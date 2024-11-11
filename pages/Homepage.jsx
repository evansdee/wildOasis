import { Link } from "react-router-dom";
import style from "./HomePage.module.css";
import Nav from "../components/nav-page";
function HomePage() {
  return (
    <main className={`${style.home_page} ${style.fade}`}>
      <Nav />
      <section>
        <h1>You travel the world. WorldWise keeps track of your adventures.</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla animi
          ad, vitae perspiciatis repudiandae praesentium dolorum beatae odit
          delectus dolore consequuntur pariatur fugit ratione voluptatibus iusto
          assumenda quae. Minima, saepe!
        </p>

        <Link to="/login" className="cta">
          Start Tracking
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
