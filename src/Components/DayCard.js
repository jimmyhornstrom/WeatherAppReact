import React from 'react'

export default function DayCard(props) {

    const {minTemp, maxTemp, img, date} = props.weatherData;

    return (
        <div>
            <p>{date}</p>
            <img src={img} alt="weather-img"/>
            <p>Min - Max</p>
            <p>{minTemp}°C - {maxTemp}°C</p>

        </div>
    )
}
