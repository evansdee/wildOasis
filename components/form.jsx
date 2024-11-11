import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "./useUrlPosition";
import styles from "./form.module.css";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { useCity } from "../src/cityprovider";

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [isErrorGeo, setIsErrorGeo] = useState("");

  const {createCity} = useCity()

  const navigate = useNavigate();
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  useEffect(() => {
    // if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeo(true);
        setIsErrorGeo("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        console.log(res)

        if (!res.ok) throw new Error("Check your network connection");

        const data = await res.json();
        // console.log(data);

        if (!data.countryCode)
          throw new Error(
            "Nigga click somewhere else. Who you know lives there"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
      } catch (err) {
        setIsErrorGeo(err.message);
      } finally {
        setIsLoadingGeo(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

 async function handleSubmit(e) {
    e.preventDefault();

    if(!cityName || !date) return 

    const newCity ={
      cityName,
      country,
      date,
      note,
      position:{lat,lng}
    }

    await createCity(newCity);
    navigate("/applayout/city");
  }
  if (isLoadingGeo) return <Loader />;

  if (!lat && !lng)
    return <Message msg="Start by clicking somewhere on the map" />;

  if (isErrorGeo) return <Message msg={isErrorGeo} />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="">City name</label>
        <br />
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </div>
      <div className="row">
        <label htmlFor="">When did you visit {cityName}?</label>
        <br />
        <ReactDatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>
      <div className="row">
        <label htmlFor="">Note about your trip to {cityName}</label>
        <br />
        <textarea
          cols="10"
          rows="1"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.btn}>
        <button>Add</button>
        <button
          onClick={() => {
            navigate("/applayout/city");
          }}
        >
          &larr; back
        </button>
      </div>
    </form>
  );
}

export default Form;

function Message({ msg }) {
  return <p>{msg}</p>;
}

function Loader() {
  return <p>...Loading</p>;
}
