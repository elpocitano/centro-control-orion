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
    { progress: 0.10, x: 210, y: 170, desc: "Órbita terrestre" },
    { progress: 0.15, x: 245, y: 155, desc: "Inyección translunar" },
    { progress: 0.20, x: 285, y: 140, desc: "Rumbo a la Luna" },
    { progress: 0.25, x: 330, y: 125, desc: "Costa de salida" },
    { progress: 0.30, x: 380, y: 115, desc: "Mitad del viaje" },
    { progress: 0.35, x: 430, y: 108, desc: "Aproximación" },
    { progress: 0.40, x: 480, y: 105, desc: "Cerca de la Luna" },
    { progress: 0.45, x: 525, y: 115, desc: "Entrando en SOI lunar" },
    { progress: 0.48, x: 555, y: 135, desc: "Acercamiento rápido" },
    { progress: 0.50, x: 585, y: 160, desc: "Máximo acercamiento" },
    { progress: 0.52, x: 615, y: 185, desc: "Sobrevolando Luna" },
    { progress: 0.48, x: 650, y: 200, desc: "LUNA - Closest approach"},
    { progress: 0.58, x: 625, y: 220, desc: "Detrás de la Luna" },
    { progress: 0.60, x: 590, y: 245, desc: "Saliendo de SOI lunar" },
    { progress: 0.65, x: 535, y: 275, desc: "Regreso iniciado" },
    { progress: 0.70, x: 470, y: 295, desc: "Costa de retorno" },
    { progress: 0.75, x: 405, y: 305, desc: "Mitad del regreso" },
    { progress: 0.80, x: 340, y: 300, desc: "Acercándose a Tierra" },
    { progress: 0.85, x: 280, y: 285, desc: "Reingreso atmosférico" },
    { progress: 0.90, x: 225, y: 260, desc: "Frenado aerodinámico" },
    { progress: 0.95, x: 180, y: 230, desc: "Despliegue de paracaídas" },
    { progress: 1.00, x: 150, y: 200, desc: "Tierra - Amerizaje" }
];

// Puntos de la trayectoria real de Orion (basados en JPL Horizons)
export const REAL_TRAJECTORY_POINTS = [
    { progress: 0.00, x: 150, y: 200, desc: "Tierra - Lanzamiento" },
    { progress: 0.20, x: 250, y: 150, desc: "Inyección translunar" },
    { progress: 0.40, x: 450, y: 120, desc: "Rumbo a la Luna" },
    { progress: 0.48, x: 600, y: 160, desc: "Entrando en SOI lunar" },
    // Rodeando la Luna (ubicada en 650, 200)
    { progress: 0.50, x: 650, y: 170, desc: "Máximo acercamiento" }, 
    { progress: 0.52, x: 685, y: 200, desc: "LUNA - Sobrevolando" },
    { progress: 0.55, x: 650, y: 230, desc: "Iniciando Retorno" },
    // Regreso a Tierra
    { progress: 0.75, x: 400, y: 300, desc: "Mitad del regreso" },
    { progress: 0.91, x: 200, y: 240, desc: "Cerca de la Tierra" }, // Tu progreso actual
    { progress: 1.00, x: 150, y: 200, desc: "Tierra - Amerizaje" }
];

// Actualizar trayectoria con interpolación suave
export function updateTrajectory(progress) {
    const t = Math.min(1, Math.max(0, progress)); // Forzamos rango 0-1
    
    // 1. Buscamos los puntos de control (p1 y p2)
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
    
    // 2. Cálculo de interpolación con Easing
    const diff = p2.progress - p1.progress;
    // Si la diferencia es 0 (estamos al final), evitamos división por cero
const segmentProgress = (t - p1.progress) / (p2.progress - p1.progress || 1);
    
    const easeProgress = segmentProgress < 0.5 
        ? 2 * segmentProgress * segmentProgress 
        : 1 - Math.pow(-2 * segmentProgress + 2, 2) / 2;
    
    const cx = p1.x + (p2.x - p1.x) * easeProgress;
    const cy = p1.y + (p2.y - p1.y) * easeProgress;
    
    // 3. Actualización del DOM (Punto y Brillo)
    const orion = document.getElementById('orionPosition');
    const glow = document.getElementById('orionGlow');
    
    if (orion) {
        orion.setAttribute('cx', cx);
        orion.setAttribute('cy', cy);
    }
    if (glow) {
        glow.setAttribute('cx', cx);
        glow.setAttribute('cy', cy);
    }
    
    // 4. Lógica de Etapa para el texto descriptivo
    let etapa = '';
    if (t <= 0.05) etapa = '🚀 LANZAMIENTO';
    else if (t <= 0.20) etapa = '🌍 ÓRBITA TERRESTRE';
    else if (t <= 0.45) etapa = '🌕 RUMBO A LA LUNA';
    else if (t <= 0.55) etapa = '🌙 SOBREVUELO LUNAR';
    else if (t <= 0.85) etapa = '🏠 REGRESO A TIERRA';
    else if (t <= 0.96) etapa = '🔥 REINGRESO';
    else etapa = '✅ AMERIZAJE';

    return { etapa, percent: Math.round(t * 100) };
}