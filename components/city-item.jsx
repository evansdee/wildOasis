import { Link } from "react-router-dom";
import styles from "./city-list.module.css";
import { useCity } from "../src/cityprovider";

function CityItem({ ele }) {

  const {currentCity,removeCity} = useCity()
  const {id,position,date} = ele

  const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  function handleClick(e){
    e.preventDefault()
    removeCity(id)
    console.log('lover')
  }

  return (
    <li>
      <Link
        className={`${id === currentCity.id ? styles.cur : ''}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <h3>{ele.cityName}</h3>
        <p>{formatDate(date)}</p>

        <p className={styles.xx} onClick={handleClick}>x</p>
      </Link>
    </li>
  );
}

export default CityItem;
