/**
 * Gestión de telemetría de Orion:
 * - Datos reales desde GitHub Actions (api/data.json)
 * - Valores de respaldo cuando no hay conexión
 * - Cálculo de distancia a la Luna
 * 
 * @module telemetry
 */

import { MAX_DISTANCE } from '../config.js';

// Cache de datos reales
export let realDistance = null;
export let realSpeed = null;
export let realLightTime = null;
export let lastFetchTime = 0;
export let realDataAvailable = false;

// Obtener datos reales desde GitHub Actions
export async function fetchRealTelemetry() {
    const now = Date.now();

    // 1. INTENTO PRIMARIO: API de la NASA (Directo)
    try {
        const nasaResponse = await fetch(`https://api.nasa.gov/planetary/earth/assets?api_key=${NASA_API_KEY}`); 
        // Nota: Aquí usarías la URL real de Horizons o AROW si estuviera disponible
        if (nasaResponse.ok) {
            const data = await nasaResponse.json();
            // ... procesar y retornar
            console.log("📡 Datos obtenidos directamente de NASA");
            return true;
        }
    } catch (e) {
        console.warn("⚠️ Falló conexión directa con NASA, buscando caché...");
    }

    // 2. INTENTO SECUNDARIO: Caché Local (data.json)
    try {
        const cacheResponse = await fetch('./api/data.json');
        if (cacheResponse.ok) {
            const cacheData = await cacheResponse.json();
            
            // Verificamos antigüedad
            const dataAgeMs = now - new Date(cacheData.timestamp).getTime();
            const dataAgeMin = Math.round(dataAgeMs / 60000);

            if (dataAgeMs < 86400000) { // Si tiene menos de 24h es usable
                realDistance = cacheData.distance_km;
                realSpeed = cacheData.velocity_kmh;
                realDataAvailable = true;
                
                document.getElementById('sourceEarth').innerHTML = 
                    `📦 Caché local (Antigüedad: ${dataAgeMin} min)`;
                return true;
            }
        }
    } catch (e) {
        console.error("❌ No hay caché disponible. Usando modelo matemático.");
    }

    // 3. FALLBACK: Si todo falla, indicamos que usaremos el backup
    realDataAvailable = false;
    return false;
}

// Valores de respaldo
export function getBackupValues(progress) {
    let distance, speed;
    const MAX_DIST = 400171; // Apogeo real Artemis II
    const MIN_DIST = 6371;

    if (progress < 0.5) {
        // FASE DE IDA: 0 a 0.5
        const t = progress / 0.5;
        distance = MIN_DIST + (t * (MAX_DIST - MIN_DIST));
        speed = 38000 * (1 - (t * 0.7)); // Se frena al alejarse
    } else {
        // FASE DE REGRESO: 0.5 a 1.0 (Hoy estamos aquí)
        const t = (progress - 0.5) / 0.5;
        // La distancia cae de forma cuadrática (aceleración por gravedad)
        distance = MAX_DIST - (Math.pow(t, 2) * (MAX_DIST - MIN_DIST));
        speed = 10000 + (Math.pow(t, 2) * 30000); // Acelera hasta 40,000 km/h
    }
    return { distance, speed };
}

// Calcular distancia a la Luna
export function calculateMoonDistance(earthDistance) {
    const AVG_EARTH_MOON = 384400;
    
    // Hoy, si Orion está a ~170,000 km de la Tierra (106k millas),
    // y la Luna está a ~384,000 km, la distancia Orion-Luna
    // debe ser la diferencia aproximada en el vector de regreso.
    
    // Si la distancia a la tierra es pequeña, la distancia a la luna es grande.
    return Math.abs(AVG_EARTH_MOON - earthDistance);
}