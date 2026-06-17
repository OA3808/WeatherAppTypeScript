import { Router } from 'express';
import { WeatherController } from '../controllers/WeatherController';

const router = Router();

router.get('/history', WeatherController.getHistory);
router.post('/history', WeatherController.saveSearch);
router.get('/weather', WeatherController.getWeather);

export default router;
