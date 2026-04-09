/**
 * Configuración global del Dashboard Orion.
 * Centraliza URLs, constantes de misión y gestión de credenciales.
 * @module config
 */

// Intentamos obtener la clave privada del archivo ignorado por Git.
// config.js
let privateKey = null;

try {
    // Usamos await import. Si falla, el catch lo captura.
    const secrets = await import('./env.js'); 
    if (secrets && secrets.PRIVATE_API_KEY) {
        privateKey = secrets.PRIVATE_API_KEY;
        console.log("✅ Clave privada detectada.");
    }
} catch (e) {
    // ESTO TE DIRÁ EL ERROR REAL EN LA CONSOLA:
    console.warn("⚠️ No se pudo cargar env.js, usando DEMO_KEY. Error:", e.message);
}

export const NASA_API_KEY = privateKey || 'DEMO_KEY';

/** @constant {string} URL base para la API Horizons de JPL */
export const HORIZONS_API = 'https://ssd.jpl.nasa.gov/api/horizons.api';

/** @constant {string} Identificador oficial de la nave Orion para JPL */
export const ORION_ID = '-1024';

/** @constant {Date} Fecha estimada de lanzamiento de la misión Artemis II */
export const LAUNCH_DATE = new Date('2026-04-01T22:35:00Z');

/** @constant {number} Distancia máxima prevista en el apogeo (km) */
export const MAX_DISTANCE = 432000;