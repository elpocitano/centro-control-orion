/**
 * trajectory-model.js
 * 
 * Define los puntos de control de la trayectoria de Orion
 * y la función que actualiza su posición en el SVG.
 * 
 * @module trajectory-model
 */

// Puntos de control para la trayectoria completa (ida + vuelta)
export const TRAJECTORY_POINTS = [
    { progress: 0.00, x: 150, y: 200, desc: "Tierra - Inicio" },
    { progress: 0.05, x: 180, y: 185, desc: "Ascenso inicial" },
    // ... (todos los puntos hasta el final)
    { progress: 1.00, x: 150, y: 200, desc: "Tierra - Amerizaje" }
];

// Puntos de la trayectoria real de Orion (basados en JPL Horizons)
export const REAL_TRAJECTORY_POINTS = [
    { progress: 0.00, x: 150, y: 200, desc: "Tierra - Lanzamiento" },
    // ... (todos los puntos hasta el final)
    { progress: 1.00, x: 150, y: 200, desc: "Tierra - Amerizaje" }
];

// Actualizar trayectoria con interpolación suave
export function updateTrajectory(progress) {
    const t = Math.min(1, Math.max(0, progress));
    
    let p1 = REAL_TRAJECTORY_POINTS[0];
    let p2 = REAL_TRAJECTORY_POINTS[REAL_TRAJECTORY_POINTS.length - 1];
    
    for (let i = 0; i < REAL_TRAJECTORY_POINTS.length - 1; i++) {
        const point = REAL_TRAJECTORY_POINTS[i];
        const nextPoint = REAL_TRAJECTORY_POINTS[i + 1];
        if (t >= point.progress && t <= nextPoint.progress) {
            p1 = point;
            p2 = nextPoint;
            break;
        }
    }
    
    const segmentProgress = (t - p1.progress) / (p2.progress - p1.progress);
    const easeProgress = segmentProgress < 0.5 
        ? 2 * segmentProgress * segmentProgress 
        : 1 - Math.pow(-2 * segmentProgress + 2, 2) / 2;
    
    const cx = p1.x + (p2.x - p1.x) * easeProgress;
    const cy = p1.y + (p2.y - p1.y) * easeProgress;
    
    const orion = document.getElementById('orionPosition');
    if (orion) {
        orion.setAttribute('cx', cx);
        orion.setAttribute('cy', cy);
    }
    
    const glow = document.getElementById('orionGlow');
    if (glow) {
        glow.setAttribute('cx', cx);
        glow.setAttribute('cy', cy);
    }
    
    // Determinar fase actual basada en el progreso real
    let etapa = '';
    if (t <= 0.02) {
        etapa = '🚀 LANZAMIENTO';
    } else if (t <= 0.12) {
        etapa = '🌍 ÓRBITA TERRESTRE';
    } else if (t <= 0.22) {
        etapa = '✨ INYECCIÓN TRANSLUNAR';
    } else if (t <= 0.48) {
        etapa = '🌕 RUMBO A LA LUNA';
    } else if (t <= 0.55) {
        etapa = '🌙 SOBREVUELO LUNAR';
    } else if (t <= 0.78) {
        etapa = '🏠 REGRESO A LA TIERRA';
    } else if (t <= 0.95) {
        etapa = '🔥 REINGRESO';
    } else {
        etapa = '✅ AMERIZAJE';
    }
    
    const progressPercent = Math.round(t * 100);
    const progressText = document.getElementById('trajectoryProgress');
    if (progressText) {
        if (t < 0.98) {
            progressText.innerHTML = `${etapa} · ${progressPercent}% del viaje completado`;
        } else {
            progressText.innerHTML = `${etapa} · Misión completada`;
        }
    }
}