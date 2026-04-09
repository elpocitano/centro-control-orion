/**
 * app.js
 * 
 * Punto de entrada principal del dashboard.
 * Orquesta la inicialización de todos los módulos.
 * 
 * @module app
 */

import { initThemeToggle } from './ui/theme.js';
import { updateAll } from './ui/telemetry-ui.js';
import { fetchSolarWeather } from './data/solar.js';
import { fetchDSNStatus } from './data/dsn.js';
import { fetchNews } from './data/news.js';
import { fetchGeomagneticStorms } from './data/geomagnetic.js';
import { updateLocalTime } from './ui/telemetry-ui.js';

// Inicializar
async function init() {
    initThemeToggle();
    await updateAll();
    await fetchSolarWeather();
    await fetchDSNStatus();
    await fetchNews();
    await fetchGeomagneticStorms();
    updateLocalTime();
    setInterval(updateLocalTime, 1000);
    setInterval(updateAll, 30000);
    setInterval(fetchSolarWeather, 300000);
    setInterval(fetchDSNStatus, 60000); 
    setInterval(fetchNews, 600000);
    setInterval(fetchGeomagneticStorms, 3600000);
}

init();