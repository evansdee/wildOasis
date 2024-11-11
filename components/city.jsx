import { useParams, useSearchParams } from "react-router-dom";
import { useCity } from "../src/cityprovider";
import { useEffect } from "react";
import styles from './city.module.css'
import BackButton from "./BackButton";

function City() {
  const {idx} = useParams();

  const { getCity, currentCity,isLoading } = useCity();

  useEffect(()=>{getCity(idx)}, [idx]);

  const {cityName,date,note} = currentCity

//   console.log(currentCity)
if(isLoading) return <p>...Losding</p>
  return (
   <div className={styles.city}>
    <div className={styles.row}>
        <h6>
            City Name
        </h6>
        <h3>
            {cityName}
        </h3>
    </div>
    <div className={styles.row}>
        <h6>
            You went to visit {cityName} on
        </h6>
        <h3>
            {date}
        </h3>
    </div>
    <div className={styles.row}>
        <h6>
            Your notes
        </h6>
        <h3>
            {note}
        </h3>
    </div>

    <BackButton/>
   </div>
  );
}

export default City;
