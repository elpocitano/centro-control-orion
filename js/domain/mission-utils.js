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

// Progreso de la misión
export function getMissionProgress() {
    const splashdown = new Date('2026-04-11T00:17:00Z');
    const now = new Date();
    if (now < LAUNCH_DATE) return 0;
    if (now > splashdown) return 1;
    return (now - LAUNCH_DATE) / (splashdown - LAUNCH_DATE);
}

// Obtener etapa actual
export function getCurrentPhase(progress) {
    for (let i = PHASES.length - 1; i >= 0; i--) {
        if (progress >= PHASES[i].start) return PHASES[i];
    }
    return PHASES[0];
}

// Dibujar reloj de etapas o fases
export function drawPhaseClock(progress) {
    const size = 200;
    const radius = 80;
    const center = 100;
    
    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
    svg += `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="#1E2A4A" stroke-width="20"/>`;
    
    PHASES.forEach(phase => {
        const startAngle = phase.start * 2 * Math.PI - Math.PI/2;
        const endAngle = phase.end * 2 * Math.PI - Math.PI/2;
        const large = (phase.end - phase.start) > 0.5 ? 1 : 0;
        const x1 = center + radius * Math.cos(startAngle);
        const y1 = center + radius * Math.sin(startAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);
        svg += `<path d="M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}" fill="none" stroke="${phase.color}" stroke-width="20"/>`;
    });
    
    const angle = progress * 2 * Math.PI - Math.PI/2;
    const needleX = center + (radius - 15) * Math.cos(angle);
    const needleY = center + (radius - 15) * Math.sin(angle);
    svg += `<circle cx="${center}" cy="${center}" r="10" fill="#FFB800"/>`;
    svg += `<line x1="${center}" y1="${center}" x2="${needleX}" y2="${needleY}" stroke="#00FF88" stroke-width="4" stroke-linecap="round"/>`;
    svg += `</svg>`;
    
    document.getElementById('phaseClock').innerHTML = svg;
}

// Generar indicadores visuales de fases
export function updatePhaseIndicators(progress) {
    const container = document.getElementById('phaseContainer');
    if (!container) return;
    
    let html = '';
    for (let i = 0; i < MISSION_PHASES.length; i++) {
        const phase = MISSION_PHASES[i];
        const isActive = progress >= phase.start && progress <= phase.end;
        const isCompleted = progress > phase.end;
        const activeClass = isActive ? 'active' : '';
        const completedClass = isCompleted ? 'completed' : '';
        
        html += `
            <div class="phase-item ${activeClass} ${completedClass}" style="border-bottom-color: ${phase.color};">
                <div class="phase-icon">${phase.icon}</div>
                <div class="phase-name" style="color: ${phase.color};">${phase.name}</div>
                <div class="phase-desc">${phase.desc}</div>
            </div>
        `;
    }
    container.innerHTML = html;
}