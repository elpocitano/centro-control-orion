/**
 * Eventos clave de la trayectoria de Artemis II (Hitos)
 * @module domain/mission-events
 */

export const MISSION_EVENTS = [
    { name: 'Lanzamiento', distance: 0, icon: '🚀', desc: 'Despegue desde el Centro Espacial Kennedy.' },
    { name: 'Órbita Terrestre', distance: 300, icon: '🌍', desc: 'Establecimiento de órbita baja.' },
    { name: 'TLI (Inyección)', distance: 3000, icon: '🔥', desc: 'Encendido para rumbo lunar.' },
    { name: 'Distancia Media', distance: 200000, icon: '✨', desc: 'Punto medio del trayecto.' },
    { name: 'Apogeo Lunar', distance: 400171, icon: '🌕', desc: 'Máxima distancia de la Tierra.' },
    { name: 'Reentrada', distance: 120, icon: '☄️', desc: 'Inicio de entrada atmosférica.' },
    { name: 'Amerizaje', distance: 0, icon: '🌊', desc: 'Llegada al Océano Pacífico.' }
];
