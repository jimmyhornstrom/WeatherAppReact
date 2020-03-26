import React from 'react'

export default function DisplayWeather(props) {


    const {location, time, temperature, description, img} = props.weatherData;

    return (
        <div className="weatherInfo">
            <h3>{location}</h3>
            <img src={img} alt="weather-img"/>
            <p>Weather description: "{description}"</p>
            <p>Temperature: {temperature}°C</p> 
            <p>Local time: {time}</p>
                       
        </div>
    )
}
