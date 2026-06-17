import db from '../database';

export class WeatherService {
    static async getHistory(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM searches ORDER BY timestamp DESC LIMIT 10`;
            db.all(query, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static async saveSearch(location: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO searches (location) VALUES (?)`;
            // Using type assertion for function context inside sqlite callback
            db.run(query, [location], function (this: sqlite3.RunResult, err: Error | null) {
                if (err) reject(err);
                else resolve({ id: this.lastID, location });
            });
        });
    }

    static async fetchWeather(city: string): Promise<any> {
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    }
}
