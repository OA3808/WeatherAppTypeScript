import { Request, Response } from 'express';
import { WeatherService } from '../services/WeatherService';

export class WeatherController {
    static async getHistory(req: Request, res: Response) {
        try {
            const history = await WeatherService.getHistory();
            res.json({ data: history });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async saveSearch(req: Request, res: Response) {
        try {
            const { location } = req.body;
            if (!location) {
                res.status(400).json({ error: 'Location is required' });
                return;
            }
            const result = await WeatherService.saveSearch(location);
            res.json(result);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getWeather(req: Request, res: Response) {
        try {
            const q = req.query.q as string;
            if (!q) {
                res.status(400).json({ error: "City is required" });
                return;
            }
            const data = await WeatherService.fetchWeather(q);
            res.json(data);
        } catch (err: any) {
            console.error("Error fetching weather:", err);
            res.status(500).json({ error: "Not able to fetch weather data" });
        }
    }
}
