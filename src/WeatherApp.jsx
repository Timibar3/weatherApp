import React, { useState } from 'react'

const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = import.meta.env.VITE_API_KEY

    const [ ciudad, setCiudad ] = useState('')
    const [ dataClima, setDataClima ] = useState(null)
    const difKelvin = 273.15

    const handleCityChange = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
            console.log(dataClima)
        }
        catch(error){
            console.error('Ocurrio el siguiente problema:' + error)
        }
    }

    return (
        <div className='container'>
            <h1>Aplicacion de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={ciudad} onChange={handleCityChange}/>
                <button type='submit'>Buscar</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C </p>
                        <p>Sensación Térmica: {parseInt(dataClima?.main?.feels_like - difKelvin)}°C </p>
                        <p>Condición meteorologíca: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="Sin Imagen" />
                    </div>
                )
            }
        </div>
    )
}

export default WeatherApp
