import { useCity } from "../src/cityprovider";
import CityItem from "./city-item";
import styles from './city-list.module.css'

function CityList() {

    const {cities,isLoading} = useCity()

    if(isLoading) return <p>...Loading</p>  
    return ( 
        <ul className={styles.ul}>
            {
                cities.map(ele=>(<CityItem key={ele.id} ele={ele}/>))
            }
        </ul>
     );
}

export default CityList;