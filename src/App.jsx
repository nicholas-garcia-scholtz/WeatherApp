import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('Auckland');
  const [weatherData, setWeatherData] = useState(null);
  async function getWeather(){
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
    if (!res.ok){
      return;
    }
    const data = await res.json();
    console.log(data);
    setWeatherData(data);
  }

  useEffect(() => {
    getWeather();
  }, [])

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap:'10px'}}>
        <h1>Weather App</h1>
        <img 
          className='logo'
          style={{height: '60px'}}
          src='/sun.webp'
        />
      </div>
      <div className="weatherDisplay">
        <div style={{display: 'flex', gap: '10px'}}>
          <input 
            className="inputBox" placeholder='Enter a city or suburb' 
            type = "text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter'){
                getWeather();
              }
            }}
          />
          <button className="submitBtn"
            onClick={getWeather}
          >Search</button>
        </div>
        {weatherData && (
          <div>
            <h1 className="city">{weatherData.location.name}</h1>
            <h2 className='today'>Today</h2>
            <h1 className="degrees">{weatherData.current.heatindex_c}°C</h1>
            <h2>{weatherData.current.condition.text}</h2>
            <img
              src ={`https:${weatherData.current.condition.icon}`} 
              alt = {`${weatherData.current.condition.text}`}
              style={{height: '140px'}}
            />
          </div>
        )}
        

      </div>
    </>
  )
}

export default App
