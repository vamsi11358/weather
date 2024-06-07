'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherDashboard = () => {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [city, setCity] = useState('raleigh');
    const [error, setError] = useState('');
    const [userGroup, setUserGroup] = useState('eventPlanners');

    const fetchWeatherData = async (city) => {
        try {
            const res = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=USA&key=2e66da7c6a60473ebced954df194c935`);
            setData(res.data.data);
            setSelectedDate(res.data.data[0].datetime);
            setError('');
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Failed to fetch data. Please check the city name and try again.');
        }
    };

    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleCitySubmit = (event) => {
        event.preventDefault();
        fetchWeatherData(city);
    };

    const handleUserGroupChange = (event) => {
        setUserGroup(event.target.value);
    };

    const selectedWeather = data.find((day) => day.datetime === selectedDate);

    return (
        <div className="space-y-16 py-16 xl:space-y-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                    Select User Group
                </h2>
                <div className="mt-6">
                    <select value={userGroup} onChange={handleUserGroupChange} className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option value="eventPlanners">Event Planners</option>
                        <option value="farmers">Farmers</option>
                        <option value="travelers">Travelers</option>
                    </select>
                </div>
                </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                    Select City
                </h2>
                <form onSubmit={handleCitySubmit} className="mt-6">
                    <input 
                        type="text" 
                        value={city} 
                        onChange={handleCityChange} 
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" 
                        placeholder="Enter city name"
                    />
                    <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md">
                        Get Weather
                    </button>
                </form>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-6">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Select Date
                    </label>
                    <select 
                        id="date" 
                        value={selectedDate} 
                        onChange={handleDateChange} 
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {data.map((day) => (
                            <option key={day.datetime} value={day.datetime}>
                                {day.datetime}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-6 overflow-hidden border-t border-gray-100">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <table className="w-full text-left">
                            <thead className="sr-only">
                                <tr>
                                    <th>Metric</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedWeather ? (
                                    <>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Temperature</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.temp}°C
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Max Temperature</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.max_temp}°C
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Min Temperature</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.min_temp}°C
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Feels Like Max Temperature</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.app_max_temp}°C
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Feels Like Min Temperature</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.app_min_temp}°C
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Humidity</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.rh}%
                                            </td>
                                        </tr>
                                        {userGroup === 'farmers' && (
                                            <tr>
                                                <td className="relative py-5 pr-6">
                                                    <div className="text-sm font-medium leading-6 text-gray-900">Soil Moisture</div>
                                                </td>
                                                <td className="relative py-5 pr-6">
                                                    {selectedWeather.soil_moisture || 'N/A'} mm
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Pressure</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.pres} mb
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Wind Speed</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.wind_spd} m/s
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Wind Direction</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.wind_cdir_full}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Cloud Coverage</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.clouds}%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Precipitation</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.precip} mm
                                            </td>
                                        </tr>
                                        {userGroup === 'eventPlanners' && (
                                            <tr>
                                                <td className="relative py-5 pr-6">
                                                    <div className="text-sm font-medium leading-6 text-gray-900">Hourly Forecast</div>
                                                </td>
                                                <td className="relative py-5 pr-6">
                                                    {selectedWeather.hourly_forecast || 'N/A'}
                                                </td>
                                            </tr>
                                        )}
                                        {userGroup === 'travelers' && (
                                            <tr>
                                                <td className="relative py-5 pr-6">
                                                    <div className="text-sm font-medium leading-6 text-gray-900">Travel Disruptions</div>
                                                </td>
                                                <td className="relative py-5 pr-6">
                                                    {selectedWeather.travel_disruptions || 'N/A'}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">UV Index</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.uv}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="relative py-5 pr-6">
                                                <div className="text-sm font-medium leading-6 text-gray-900">Weather Description</div>
                                            </td>
                                            <td className="relative py-5 pr-6">
                                                {selectedWeather.weather.description}
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="relative py-5 pr-6 text-center text-sm leading-6 text-gray-900">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherDashboard;

