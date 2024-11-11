import { createContext, useContext, useEffect, useReducer, useState } from "react";

const Cities = createContext();

const initialState={
  cities:[],
  isLoading:'',
  currentCity:[],
  error:''
}

function reducer(state,action){
  switch(action.type){
    case "loading":
      return {...state,isLoading:true}
    case "cities/loaded":
      return {...state, isLoading:false,cities:action.payload}
    case "city/loaded":
      return {...state,isLoading:false,currentCity:action.payload}
    case "city/created":
      return {...state,isLoading:false,cities:[...state.cities,action.payload],currentCity:action.payload}
    case "city/deleted":
      return {...state,isLoading:false,cities:state.cities.filter(ele=>{
        return ele.id !== action.payload
       })}
    case "rejected":
      return {...state,isLoading:false,error:action.payload}
    default:
    return state
  }

}

function CitiesProvider({ children }) {
  const url = "http://localhost:8000";

 const [state,dispatch] = useReducer(reducer,initialState)
  const [mapPosition, setMapPosition] = useState([9.073264, 7.491302]);

  const {isLoading,currentCity,cities} = state
  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({type:'loading'})

        const res = await fetch(`${url}/data`);
        const data = await res.json();

       dispatch({type:'cities/loaded',payload:data})
      } catch {
        dispatch({type:'rejected',payload:"Error in code cities"})
      } 
    }

    fetchData();
  }, []);

  
  async function getCity(id) {

    console.log(id,currentCity.id)

    if(Number(id) === currentCity.id) return
    dispatch({type:'loading'})

    try {

      const res = await fetch(`${url}/data/${id}`);
      const data = await res.json();

      dispatch({type:"city/loaded",payload:data})
      // console.log(data)
    } catch {
      dispatch({type:'rejected',payload:"Error in code city"})

    } 
  }

  async function createCity(newCity) {
    try {
      dispatch({type:'loading'})

      const res = await fetch(`${url}/data`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

     dispatch({type:'city/created',payload:data})
    } catch {
      dispatch({type:'rejected',payload:"Error in code created"})

      // alert("error in code");
  
  }}

  async function removeCity(id){
    try {
      dispatch({type:'loading'})
      await fetch(`${url}/data/${id}`, {
        method: "DELETE"
      });

     dispatch({type:"city/deleted",payload:id})
    } catch {
      dispatch({type:'rejected',payload:"Error in code deleted"})

      // alert("error deleting item");
    } 
  }

  return (
    <Cities.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        getCity,
        mapPosition,
        setMapPosition,
        createCity,
        removeCity
      }}
    >
      {children}
    </Cities.Provider>
  );
}

function useCity() {
  const context = useContext(Cities);
  return context;
}
export { CitiesProvider, useCity };
