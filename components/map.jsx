import { useNavigate } from "react-router-dom";
import styles from "./map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCity } from "../src/cityprovider";
import { useGeolocation } from "./GeoLocation";
import { useUrlPosition } from "./useUrlPosition";

function Map() {
  
  const [lat,lng] = useUrlPosition()
  const { cities, mapPosition, setMapPosition } = useCity();
  
  const {
    isLoading: isLoadingPosition,
    position: positionGeo,
    getPosition,
  } = useGeolocation();
  
  // console.log(position)
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (positionGeo) setMapPosition([positionGeo.lat, positionGeo.lng]);
  }, [positionGeo]);

  return (
    <div className={styles.mapContainer}>
      {!positionGeo && <button onClick={getPosition} className={styles.btn}>
        {isLoadingPosition ? "Loading..." : "Use am or lose am"}
      </button>}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.note}</Popup>
          </Marker>
        ))}

        {/* <Marker position={mapPosition}>
          <Popup>Love</Popup>
        </Marker> */}

        <DetectClick />
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();

  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
