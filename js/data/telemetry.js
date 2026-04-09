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
    try {
        const response = await fetch('./api/data.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        if (data.status === 'live' && data.distance_km) {
            realDistance = data.distance_km;
            realSpeed = data.velocity_kmh;
            realLightTime = data.light_time_sec;
            realDataAvailable = true;
            lastFetchTime = Date.now();
            
            document.getElementById('connectionStatus').innerHTML = 'DATOS REALES JPL';
            document.getElementById('connectionStatus').style.color = '#00FF88';
            document.getElementById('sourceEarth').innerHTML = '✅ Fuente: JPL Horizons (GitHub Actions)';
            return true;
        }
        throw new Error('Invalid data');
    } catch (e) {
        console.warn('Error loading local telemetry:', e);
        realDataAvailable = false;
        document.getElementById('connectionStatus').innerHTML = 'DATOS BASADOS EN TRAYECTORIA OFICIAL';
        document.getElementById('connectionStatus').style.color = '#FFB800';
        document.getElementById('sourceEarth').innerHTML = '⚠️ Fuente: Trayectoria oficial Artemis II (NASA)';
        return false;
    }
}

// Valores de respaldo
export function getBackupValues(progress) {
    let distance, speed;
    if (progress < 0.15) {
        distance = 6371 + (progress / 0.15) * 1000;
        speed = 28000 * (progress / 0.15);
    } else if (progress < 0.55) {
        const t = (progress - 0.15) / 0.4;
        distance = 7371 + t * (MAX_DISTANCE - 7371);
        speed = 38000 * (1 - t * 0.3);
    } else if (progress < 0.65) {
        distance = MAX_DISTANCE;
        speed = 8000;
    } else {
        const t = (progress - 0.65) / 0.35;
        distance = MAX_DISTANCE * (1 - t) + 6371 * t;
        speed = 8000 + t * 30000;
    }
    return { distance, speed };
}

// Calcular distancia a la Luna
export function calculateMoonDistance(earthDistance) {
    const EARTH_MOON_DIST = 384400;
    const CLOSEST_APPROACH = 9650;
    
    if (earthDistance < EARTH_MOON_DIST) {
        const progress = earthDistance / EARTH_MOON_DIST;
        return EARTH_MOON_DIST - (EARTH_MOON_DIST - CLOSEST_APPROACH) * progress;
    } else {
        const returnProgress = (earthDistance - EARTH_MOON_DIST) / (432000 - EARTH_MOON_DIST);
        return CLOSEST_APPROACH + (EARTH_MOON_DIST - CLOSEST_APPROACH) * returnProgress;
    }
}
