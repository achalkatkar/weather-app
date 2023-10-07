import React, { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';
import CloudeSun from "../../cloud-sun.png";


 //c24e30026df7426c005d296d04578127
function Home(){
    const [city, setCity] = useState('pune');
    const [temperature, setTemperature] = useState(0);
    const [message, setMessage] = useState('')

    async function loadWeatherTnfo() {
        try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)

        setTemperature((response.data.main.temp -273).toFixed(2))
        setMessage('✅ Data fetched successfully....')
          }
          catch(err){
            setTemperature(0)
            setMessage('city not found')
          }
        }
    useEffect(()=>{
        loadWeatherTnfo()
    }, [city])

    return (
        <div className="weather-app">
           <h1 className="app-title">Weather for {city}  </h1>

           <img src={CloudeSun} className="cloud-img" alt="cloud-img"/>

           <input 
           className="search-bar" 
           type="text" 
           placeholder="enter city ..." 
           value={city}
           onChange={(e)=>{
            setCity(e.target.value)
            } }
           />   
           <p className="message-text"> {message}</p>

           <h1 className="temperature-text">Temperature :{temperature} °C</h1>
           

         </div>
    )
}

export default Home