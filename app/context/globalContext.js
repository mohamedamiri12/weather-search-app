"use client"


import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();


export const GlobalContextProvider = ({ children }) => {

    const [forecast, setForecast] = useState({});

    const [airQuality, setAirQuality] = useState({});

    const [fiveDayForecast, setFiveDayForecast] = useState({});

    const [uvIndex, setUvIndex] = useState({});

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

    // five day forecast
    const fetchFiveDayForecast = async () => {
        try {
            const res = await axios.get("api/fiveday");
            setFiveDayForecast(res.data);
        } catch (error) {
            console.log("Error fetching five day forecast data", error)
        }
    }

    // fetch uv data
    const fetchUvIndex = async () => {
        try {
            const res = await axios.get("api/uv");
            setUvIndex(res.data);
        } catch (error) {
            console.log("Error fetching the forecast", error)
        }
    }

    useEffect(() => { 
        fetchForecast();
        fetchAirQuality();
        fetchFiveDayForecast();
        fetchUvIndex();
    }, [])  
    return (
        <GlobalContext.Provider value={{ forecast, airQuality, fiveDayForecast, uvIndex }}>
            <GlobalContextUpdate.Provider>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);