/**
 * 
 * Fases de la misión para dos usos:
 * - PHASES: reloj circular (start/end en 0-1, color)
 * - MISSION_PHASES: indicadores visuales (iconos, descripciones)
 * 
 * @module domain/mission-phases
 */


// Fases para el reloj circular
export const PHASES = [
    { name: 'PRE-LANZAMIENTO', start: 0, end: 0.02, color: '#6B8CBF' },
    { name: 'ASCENSO', start: 0.02, end: 0.08, color: '#FFB800' },
    { name: 'ÓRBITA', start: 0.08, end: 0.15, color: '#0088FF' },
    { name: 'TLI', start: 0.15, end: 0.22, color: '#FF6600' },
    { name: 'TRÁNSITO', start: 0.22, end: 0.45, color: '#00FF88' },
    { name: 'APROXIMACIÓN', start: 0.45, end: 0.55, color: '#FFB800' },
    { name: 'SOBREVUELO', start: 0.55, end: 0.62, color: '#E8F0FF' },
    { name: 'RETORNO', start: 0.62, end: 0.85, color: '#0088FF' },
    { name: 'REINGRESO', start: 0.85, end: 0.95, color: '#FF6600' },
    { name: 'AMERIZAJE', start: 0.95, end: 1.0, color: '#00FF88' }
];

// Indicadores visuales de fases
export const MISSION_PHASES = [
    { name: 'PRE-LANZAMIENTO', icon: '🚀', start: 0.00, end: 0.02, color: '#6B8CBF', desc: 'Esperando despegue desde LC-39B' },
    { name: 'ASCENSO', icon: '⬆️', start: 0.02, end: 0.08, color: '#FFB800', desc: 'SLS impulsando Orion hacia el espacio' },
    { name: 'ÓRBITA TERRESTRE', icon: '🌍', start: 0.08, end: 0.15, color: '#0088FF', desc: 'Orbitando Tierra para ajustes' },
    { name: 'TLI', icon: '🔥', start: 0.15, end: 0.22, color: '#FF6600', desc: 'Inyección translunar hacia la Luna' },
    { name: 'TRÁNSITO', icon: '🌕', start: 0.22, end: 0.45, color: '#00FF88', desc: 'Viaje de 4 días hacia la Luna' },
    { name: 'APROXIMACIÓN', icon: '📍', start: 0.45, end: 0.55, color: '#FFB800', desc: 'Acercándose a la Luna' },
    { name: 'SOBREVUELO', icon: '🌙', start: 0.55, end: 0.62, color: '#E8F0FF', desc: 'Paso detrás de la Luna (9,650 km)' },
    { name: 'RETORNO', icon: '🔄', start: 0.62, end: 0.85, color: '#0088FF', desc: 'Regreso a la Tierra' },
    { name: 'REINGRESO', icon: '🔥', start: 0.85, end: 0.95, color: '#FF6600', desc: 'Entrada atmosférica a 25,000 mph' },
    { name: 'AMERIZAJE', icon: '🪂', start: 0.95, end: 1.00, color: '#00FF88', desc: 'Final de misión en el Pacífico' }
];