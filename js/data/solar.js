/**
 * Servicio de datos de clima espacial (NASA DONKI)
 * @module data/solar
 */
import { NASA_API_KEY } from '../config.js';

/**
 * Obtiene y renderiza tormentas geomagnéticas de los últimos 30 días
 * @param {string} elementId - ID del elemento DOM donde se volcarán los datos
 */
export async function fetchGeomagneticStorms(elementId = 'geomagneticStorms') {
    const stormsDiv = document.getElementById(elementId);
    if (!stormsDiv) return;

    stormsDiv.innerHTML = '<p class="loading">Consultando satélites...</p>';
    
    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        
        const formatDate = (d) => d.toISOString().split('T')[0];
        
        const url = `https://api.nasa.gov/DONKI/GST?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&api_key=${NASA_API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        if (!data || data.length === 0) {
            stormsDiv.innerHTML = 'No se detectaron tormentas recientes.';
            return;
        }
        
        // Obtener la tormenta más reciente
        const latestStorm = data[data.length - 1];
        
        // Encontrar el Kp máximo
        let maxKp = 0;
        if (latestStorm.allKpIndex) {
            latestStorm.allKpIndex.forEach(kp => {
                if (kp.kpIndex > maxKp) maxKp = kp.kpIndex;
            });
        }
        
        // Lógica de Escala G (Clima Espacial)
        const { level, color } = getGScale(maxKp);
        
        const stormDate = new Date(latestStorm.startTime);
        const fechaFormateada = stormDate.toLocaleString('es-419', { hour12: false });
        
        // Renderizado del HTML
        stormsDiv.innerHTML = `
            <div class="solar-data"><strong>Último evento:</strong> ${fechaFormateada}</div>
            <div class="solar-data"><strong>Kp máximo:</strong> ${maxKp.toFixed(2)}</div>
            <div class="solar-data"><strong>Nivel:</strong> <span style="color: ${color}; font-weight: bold;">${level}</span></div>
            <div class="solar-data">
                <a href="${latestStorm.link}" target="_blank" style="color: #0088FF; text-decoration: none;">
                    <i class="fas fa-external-link-alt"></i> Detalles NASA →
                </a>
            </div>
        `;
        
    } catch (error) {
        console.error('Error fetching geomagnetic storms:', error);
        stormsDiv.innerHTML = '<p class="error">⚠️ Datos DONKI no disponibles</p>';
    }
}

/**
 * Obtiene y renderiza Clima Solar (Flare/CME)
 * Mueve aquí la lógica de fetchSolarWeather que tienes en el index.html
 */
export async function fetchSolarWeather(elementId = 'solarWeather') {
    const solarDiv = document.getElementById(elementId);
    if (!solarDiv) return;

    try {
        const url = `https://api.nasa.gov/DONKI/FLR?startDate=${new Date().toISOString().split('T')[0]}&api_key=${NASA_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Aquí puedes simplificar el mensaje para el dashboard
        solarDiv.innerHTML = data.length > 0 
            ? `<div class="solar-data" style="color: #FFB800;">⚠️ ${data.length} Fulguraciones detectadas hoy</div>`
            : `<div class="solar-data" style="color: #00FF88;">✅ Actividad solar estable</div>`;
    } catch (e) {
        solarDiv.innerHTML = '⚠️ Clima solar no disponible';
    }
}

/**
 * Función auxiliar para obtener nivel y color según el índice Kp
 * @param {number} kp 
 * @returns {object} {level, color}
 */
function getGScale(kp) {
    if (kp >= 9) return { level: 'G5 (Extrema)', color: '#FF3366' };
    if (kp >= 8) return { level: 'G4 (Severa)', color: '#FF6600' };
    if (kp >= 7) return { level: 'G3 (Fuerte)', color: '#FFB800' };
    if (kp >= 6) return { level: 'G2 (Moderada)', color: '#FFD700' };
    if (kp >= 5) return { level: 'G1 (Menor)', color: '#FFEB3B' };
    return { level: 'Sin tormenta (Normal)', color: '#00FF88' };
}

/**
 * Procesa y dibuja los datos en el DOM
 * @param {Array} data - Lista de eventos de la NASA
 * @param {HTMLElement} container - Div donde se insertarán los datos
 */
function renderStorms(data, container) {
    if (!data || data.length === 0) {
        container.innerHTML = '<p class="no-data">No se detectaron tormentas recientes.</p>';
        return;
    }

    // Tomamos las últimas 3 tormentas para no saturar el dashboard
    const latestStorms = data.slice(-3).reverse();
    
    let html = '<div class="storms-list">';
    latestStorms.forEach(storm => {
        const date = new Date(storm.startTime).toLocaleDateString();
        // Lógica de color según kpIndex (intensidad)
        const kp = storm.allObservations?.[0]?.kpIndex || 'N/A';
        const alertClass = kp >= 5 ? 'alert-high' : 'alert-normal';

        html += `
            <div class="storm-item ${alertClass}">
                <span class="storm-date">${date}</span>
                <span class="storm-msg">KP Index: ${kp}</span>
                <small>ID: ${storm.gstID}</small>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

