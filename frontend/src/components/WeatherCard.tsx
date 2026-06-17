import React from 'react';

interface WeatherProps {
  data: {
    temp: number;
    locationName: string;
    time: string;
    condition: string;
    icon: string;
  }
}

export const WeatherCard = ({ data }: WeatherProps) => {
  return (
    <div className="weather-card glass-panel">
      <div className="temp-display">{data.temp}°</div>
      <div className="location-display">{data.locationName}</div>
      <div className="time-display">{data.time}</div>
      <div className="condition-display">
        <img src={data.icon} alt={data.condition} className="condition-icon" />
        <span>{data.condition}</span>
      </div>
    </div>
  );
};
