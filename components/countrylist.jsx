import { Link } from "react-router-dom";
import { useCity } from "../src/cityprovider";
import styles from "./countrylist.module.css";

function CountryList() {
  const { cities } = useCity(); 

  const country = cities.reduce((arr, city) => {
    if (!arr.map((ele) => ele.country).includes(city.country))
      return [...arr, { country: city.country }];
    else return arr;
  }, []);

  console.log(country);
  return (
    <ul className={styles.countryList}>
      {country.map((ele) => {
        return <CountryItem key={ele.country} ele={ele}/>;
      })} 
    </ul>
  );
}

export default CountryList;

function CountryItem({ ele }) {
  return (
    <li>
      <Link to={`${ele.country}`}>{ele.country}</Link>
    </li>
  );
}
