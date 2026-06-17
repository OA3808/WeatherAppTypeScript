import React, { useState, useEffect } from 'react';
import './index.css';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { SearchHistory } from './components/SearchHistory';

interface WeatherData {
  temp: number;
  locationName: string;
  time: string;
  condition: string;
  icon: string;
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/history');
      const json = await res.json();
      setHistory(json.data || []);
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  const saveHistory = async (location: string) => {
    try {
      await fetch('http://localhost:3001/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location })
      });
      fetchHistory();
    } catch (err) {
      console.error("Error saving history", err);
    }
  };

  const fetchWeather = async (target: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:3001/api/weather?q=${target}`);
      if (!res.ok) throw new Error("Could not fetch weather data");
      const data = await res.json();
      
      const timeStr = data.location.localtime;
      const splitDate = timeStr.split(" ")[0];
      const splitTime = timeStr.split(" ")[1];
      const dateObj = new Date(splitDate);
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const currentDay = days[dateObj.getDay()];

      setWeather({
        temp: data.current.temp_c,
        locationName: data.location.name,
        time: `${splitDate} ${currentDay} ${splitTime}`,
        condition: data.current.condition.text,
        icon: `https:${data.current.condition.icon}`
      });
      saveHistory(target);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Lucknow");
    fetchHistory();
  }, []);

  return (
    <div className="app-container">
      <SearchBar onSearch={fetchWeather} />
      {error && <div style={{ color: '#fca5a5', textAlign: 'center' }}>{error}</div>}
      {loading && !weather && <div style={{ textAlign: 'center' }}>Loading...</div>}
      {weather && <WeatherCard data={weather} />}
      <SearchHistory history={history} onSelect={fetchWeather} />
    </div>
  );
}

export default App;
