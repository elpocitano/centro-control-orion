/**
 * telemetry-ui.js
 * 
 * Actualizacion de UI.
 * Centraliza URLs, IDs y parámetros fijos de la misión.
 * 
 * @module config
 */

import { LAUNCH_DATE } from '../config.js';
import { MISSION_EVENTS } from '../domain/mission-events.js';
import { getMissionProgress, getCurrentPhase, drawPhaseClock, updatePhaseIndicators } from '../domain/mission-utils.js';
import { updateTrajectory } from '../domain/trajectory-model.js';
import { fetchRealTelemetry, realDistance, realSpeed, realLightTime, realDataAvailable, lastFetchTime, getBackupValues, calculateMoonDistance } from '../data/telemetry.js';

// Obtener Tiempo transcurrido
export function getElapsedTime() {
    const now = new Date();
    const elapsedMs = now - LAUNCH_DATE;
    if (elapsedMs < 0) return "Pre-lanzamiento";
    
    const days = Math.floor(elapsedMs / 86400000);
    const hours = Math.floor((elapsedMs % 86400000) / 3600000);
    const minutes = Math.floor((elapsedMs % 3600000) / 60000);
    const seconds = Math.floor((elapsedMs % 60000) / 1000);
    
    return `${days}d ${hours.toString().padStart(2,'0')}h ${minutes.toString().padStart(2,'0')}m ${seconds.toString().padStart(2,'0')}s`;
}

// Actualizar Reloj con hora local
export function updateLocalTime() {
    const now = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = -now.getTimezoneOffset() / 60;
    const offsetStr = offset >= 0 ? `GMT+${offset}` : `GMT${offset}`;
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('localTime').innerHTML = `${hours}:${minutes}:${seconds}`;
    document.getElementById('timezone').innerHTML = `${offsetStr} (${timezone})`;
}

// Actualizar todo el dashboard
export async function updateAll() {
    const progress = getMissionProgress();
    const currentPhase = getCurrentPhase(progress);
    
    const now = Date.now();
    if (!realDataAvailable || (now - lastFetchTime) > 3600000) {
        await fetchRealTelemetry();
    }
    
    let earthDist, speedKmh, lightTime;
    
    if (realDataAvailable && realDistance) {
        earthDist = realDistance;
        speedKmh = realSpeed;
        lightTime = realLightTime || (earthDist / 299792.458);
    } else {
        const backup = getBackupValues(progress);
        earthDist = backup.distance;
        speedKmh = backup.speed;
        lightTime = earthDist / 299792.458;
    }
    
    const moonDist = calculateMoonDistance(earthDist);
    const delaySec = lightTime.toFixed(3);

    const MIN_DIST = 6371;
    const MAX_DIST = 432000;
    let realProgress = (earthDist - MIN_DIST) / (MAX_DIST - MIN_DIST);
    realProgress = Math.min(0.98, Math.max(0, realProgress));
    
    if (moonDist < earthDist && earthDist > 300000) {
        const returnProgress = (earthDist - 300000) / (432000 - 300000);
        realProgress = 0.5 + returnProgress * 0.48;
    }
    
    realProgress = Math.min(0.99, Math.max(0, realProgress));
    
    document.getElementById('distanceEarth').innerHTML = Math.round(earthDist).toLocaleString('es-419') + ' km';
    document.getElementById('distanceMoon').innerHTML = Math.round(moonDist).toLocaleString('es-419') + ' km';
    document.getElementById('velocity').innerHTML = Math.round(speedKmh).toLocaleString('es-419') + ' km/h';
    document.getElementById('speedMs').innerHTML = (speedKmh / 3600).toFixed(1);
    document.getElementById('signalDelay').innerHTML = delaySec + ' s';
    document.getElementById('roundTrip').innerHTML = (parseFloat(delaySec) * 2).toFixed(3);
    document.getElementById('trendEarth').innerHTML = earthDist < 300000 ? 'Alejándose de la Tierra' : 'Regresando a la Tierra';
    document.getElementById('phaseName').innerHTML = currentPhase.name;
    document.getElementById('missionElapsed').innerHTML = `⏱${getElapsedTime()}`;
    
    const nowDate = new Date();
    let next = MISSION_EVENTS.find(e => new Date(e.time) > nowDate);
    document.getElementById('nextEvent').innerHTML = next ? `Próximo: ${next.event}` : 'Misión completada';
    
    drawPhaseClock(progress);
    updatePhaseIndicators(progress);
    updateTrajectory(realProgress);
}