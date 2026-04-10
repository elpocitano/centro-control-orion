/**
 * mission-utils.js
 * 
 * Utilidades de mision
 * getMissionProgress(), getCurrentPhase(), drawPhaseClock(), updatePhaseIndicators()
 * 
 * @module mission-utils
 */

import { PHASES, MISSION_PHASES } from './mission-phases.js';
import { LAUNCH_DATE } from '../config.js';

const SPLASHDOWN_DATE = new Date('2026-04-11T00:17:00Z');

// Progreso de la misión
export function getMissionProgress() {
    const now = new Date();
    if (now < LAUNCH_DATE) return 0;
    if (now > SPLASHDOWN_DATE) return 1;
    return (now - LAUNCH_DATE) / (SPLASHDOWN_DATE - LAUNCH_DATE);
}

// Obtener etapa actual
export function getCurrentPhase(progress) {
    for (let i = PHASES.length - 1; i >= 0; i--) {
        if (progress >= PHASES[i].start) return PHASES[i];
    }
    return PHASES[0];
}

/**
 * Genera el string SVG del reloj. 
 * Ya no toca el DOM, ahora RETORNA el código.
 */
export function generatePhaseClockSVG(progress) {
    const size = 200;
    const radius = 80;
    const center = 100;
    
    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Reloj de fases de misión">`;
    
    // 1. Círculo de fondo
    svg += `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--bg-card)" stroke-width="20"/>`;
    
    // 2. Arcos de las fases
    PHASES.forEach(phase => {
        const startAngle = phase.start * 2 * Math.PI - Math.PI/2;
        const endAngle = phase.end * 2 * Math.PI - Math.PI/2;
        const large = (phase.end - phase.start) > 0.5 ? 1 : 0;
        const x1 = center + radius * Math.cos(startAngle);
        const y1 = center + radius * Math.sin(startAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);
        svg += `<path d="M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}" fill="none" stroke="${phase.color}" stroke-width="20" opacity="0.8"/>`;
    });
    
    // 3. Cálculos de la aguja (91% de progreso según tu consola)
    const angle = progress * 2 * Math.PI - Math.PI/2;
    // Reducimos un poco el largo para que no toque el borde exterior
    const needleX = center + (radius - 10) * Math.cos(angle);
    const needleY = center + (radius - 10) * Math.sin(angle);
    
    // 4. DIBUJO DE LA AGUJA (Debe ir después de las fases para estar encima)
    // Cambiamos var(--text-main) por un color explícito o var(--accent-color) para asegurar visibilidad
    svg += `<line x1="${center}" y1="${center}" x2="${needleX}" y2="${needleY}" 
                  stroke="var(--accent-color, #FFB800)" 
                  stroke-width="5" 
                  stroke-linecap="round" 
                  style="filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.5));"/>`;
    
    // 5. Centro del reloj (encima de la aguja)
    svg += `<circle cx="${center}" cy="${center}" r="8" fill="var(--accent-color, #FFB800)"/>`;
    svg += `<circle cx="${center}" cy="${center}" r="4" fill="white"/>`;
    
    svg += `</svg>`;
    return svg;
}

/**
 * Genera el HTML de los indicadores.
 * Usa Template Literals limpios.
 */
export function generatePhaseIndicatorsHTML(progress) {
    return MISSION_PHASES.map(phase => {
        const isActive = progress >= phase.start && progress <= phase.end;
        const isCompleted = progress > phase.end;
        const statusClass = isActive ? 'active' : (isCompleted ? 'completed' : '');
        
        return `
            <div class="phase-item ${statusClass}" style="border-bottom: 3px solid ${phase.color}44;">
                <div class="phase-icon">${phase.icon}</div>
                <div class="phase-info">
                    <div class="phase-name" style="color: ${phase.color};">${phase.name}</div>
                    <div class="phase-desc">${phase.desc}</div>
                </div>
            </div>
        `;
    }).join('');
}

