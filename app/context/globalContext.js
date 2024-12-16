'use Client'


import { createContext, useEffect } from "react"
import { useContext , useState} from "react"
import axios from "axios";


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();


export const GlobalContextProvider = ({ children }) => {

    const [forecast, setForecast] = useState({});

    const [airQuality, setAirQuality] = useState({});

    const fetchForecast = async () => {
        try {
            const res = await axios.get("api/weather");

            setForecast(res.data);
        } catch (error) {
            console.log("Error fetching forcast data", error)
        }
    }

    // Air Quality
    const fetchAirQuality = async () => {
        try {
            const res = await axios.get("api/pollution");
            setAirQuality(res.data);
        } catch (error) {
            console.log("Error fetching air quality data", error)
        }
    }

    useEffect(() => { 
        fetchForecast();
        fetchAirQuality();
    }, [])  
    return (
        <GlobalContext.Provider value={{ forecast, airQuality }}>
            <GlobalContextUpdate.Provider>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);