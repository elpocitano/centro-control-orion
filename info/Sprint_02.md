## 📋 Sprint 02

**~650 líneas** de JavaScript que mezclan diferentes responsabilidades. 
Division para que sea más mantenible.

---

## 🗂️ Propuesta de división del JavaScript

| Archivo | Responsabilidad | Líneas aprox | Contenido |
|---------|----------------|--------------|-----------|
| `js/config.js` | Configuración global | ~5 | `HORIZONS_API`, `ORION_ID`, `LAUNCH_DATE`, `MAX_DISTANCE` |
| `js/domain/mission-events.js` | Eventos de la misión | ~10 | `MISSION_EVENTS` |
| `js/domain/mission-phases.js` | Fases del reloj circular | ~15 | `PHASES`, `MISSION_PHASES` |
| `js/domain/trajectory-model.js` | Trayectoria y posición | ~60 | `TRAJECTORY_POINTS`, `REAL_TRAJECTORY_POINTS`, `updateTrajectory()` |
| `js/domain/mission-utils.js` | Utilidades de misión | ~30 | `getMissionProgress()`, `getCurrentPhase()`, `drawPhaseClock()`, `updatePhaseIndicators()` |
| `js/data/telemetry.js` | Telemetría Orion | ~40 | `fetchRealTelemetry()`, `getBackupValues()`, `calculateMoonDistance()` |
| `js/data/solar.js` | Clima solar | ~40 | `fetchSolarWeather()` |
| `js/data/geomagnetic.js` | Tormentas geomagnéticas | ~45 | `fetchGeomagneticStorms()` |
| `js/data/dsn.js` | Red DSN | ~60 | `fetchDSNStatus()`, `initDSNMap()` |
| `js/data/news.js` | Noticias | ~40 | `fetchNews()` |
| `js/ui/telemetry-ui.js` | Actualización de UI | ~70 | `updateAll()`, `updateLocalTime()`, `getElapsedTime()` |
| `js/ui/theme.js` | Tema oscuro/claro | ~30 | `initThemeToggle()` |
| `js/app.js` | Inicialización | ~10 | `init()` |

---

## 📁 Estructura final después de la división

```text
centro-control-orion/
├── index.html
├── css/
│   └── base.css
├── js/
│   ├── app.js
│   ├── config.js
│   ├── data/
│   │   ├── telemetry.js
│   │   ├── solar.js
│   │   ├── geomagnetic.js
│   │   ├── dsn.js
│   │   └── news.js
│   ├── domain/
│   │   ├── mission-events.js
│   │   ├── mission-phases.js
│   │   ├── trajectory-model.js
│   │   └── mission-utils.js
│   └── ui/
│       ├── telemetry-ui.js
│       └── theme.js
└── docs/
    └── ...
```

---

## 🔧 Por qué dividimos así

| Principio | Explicación |
|-----------|-------------|
| **Separación de responsabilidades** | Cada archivo tiene una sola razón para cambiar |
| **Reutilización** | Las constantes y funciones pueden importarse donde se necesiten |
| **Mantenibilidad** | Si algo falla, sabés exactamente dónde buscar |
| **Escalabilidad** | Agregar nuevas fuentes de datos es más fácil |
| **Aprendizaje** | Entendés mejor la arquitectura de una aplicación web |

---

## 📝 Contenido de cada archivo

### 1. `js/config.js`

```javascript
// Configuración global del dashboard
export const HORIZONS_API = 'https://ssd.jpl.nasa.gov/api/horizons.api';
export const ORION_ID = '-1024';
export const LAUNCH_DATE = new Date('2026-04-01T22:35:00Z');
export const MAX_DISTANCE = 432000; // km
```

### 2. `js/domain/mission-events.js`

```javascript
// Eventos clave de la misión Artemis II
export const MISSION_EVENTS = [
    { time: '2026-04-01T22:35:00Z', event: 'Lanzamiento', desc: 'Despegue del SLS desde LC-39B' },
    { time: '2026-04-02T23:49:00Z', event: 'Inyección Translunar', desc: 'Encendido hacia la Luna' },
    { time: '2026-04-06T04:43:00Z', event: 'Entrada SOI Lunar', desc: 'Orion entra en esfera lunar' },
    { time: '2026-04-06T23:06:00Z', event: 'Sobre vuelo Lunar', desc: 'Máximo acercamiento (9,650 km)' },
    { time: '2026-04-11T00:17:00Z', event: 'Amerizaje', desc: 'Océano Pacífico' }
];
```

### 3. `js/domain/mission-phases.js`

```javascript
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
```

### 4. `js/domain/trajectory-model.js`

```javascript
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
```

### 5. `js/domain/mission-utils.js`

```javascript
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
```

### 6. `js/data/telemetry.js`

```javascript
import { MAX_DISTANCE, LAUNCH_DATE } from '../config.js';

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
```

### 7. `js/ui/telemetry-ui.js`

```javascript
import { LAUNCH_DATE } from '../config.js';
import { MISSION_EVENTS } from '../domain/mission-events.js';
import { getMissionProgress, getCurrentPhase, drawPhaseClock, updatePhaseIndicators } from '../domain/mission-utils.js';
import { updateTrajectory } from '../domain/trajectory-model.js';
import { fetchRealTelemetry, realDistance, realSpeed, realLightTime, realDataAvailable, lastFetchTime, getBackupValues, calculateMoonDistance } from '../data/telemetry.js';

// Tiempo transcurrido
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

// Reloj con hora local
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
```

### 8. `js/ui/theme.js`

```javascript
// Dark / Light mode toggle
export function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeText) themeText.innerHTML = 'Modo Oscuro';
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span id="themeText">Modo Oscuro</span>';
    } else {
        document.body.classList.remove('light-theme');
        if (themeText) themeText.innerHTML = 'Modo Claro';
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-sun"></i> <span id="themeText">Modo Claro</span>';
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            const newTheme = isLight ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            
            if (isLight) {
                toggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span id="themeText">Modo Oscuro</span>';
            } else {
                toggleBtn.innerHTML = '<i class="fas fa-sun"></i> <span id="themeText">Modo Claro</span>';
            }
        });
    }
}
```

### 9. `js/app.js`

```javascript
import { initThemeToggle } from './ui/theme.js';
import { updateAll } from './ui/telemetry-ui.js';
import { fetchSolarWeather } from './data/solar.js';
import { fetchDSNStatus } from './data/dsn.js';
import { fetchNews } from './data/news.js';
import { fetchGeomagneticStorms } from './data/geomagnetic.js';
import { updateLocalTime } from './ui/telemetry-ui.js';

// Inicializar
async function init() {
    initThemeToggle();
    await updateAll();
    await fetchSolarWeather();
    await fetchDSNStatus();
    await fetchNews();
    await fetchGeomagneticStorms();
    updateLocalTime();
    setInterval(updateLocalTime, 1000);
    setInterval(updateAll, 30000);
    setInterval(fetchSolarWeather, 300000);
    setInterval(fetchDSNStatus, 60000); 
    setInterval(fetchNews, 600000);
    setInterval(fetchGeomagneticStorms, 3600000);
}

init();
```

---

## 📝 Modificación en `index.html`

Tu `index.html` debe incluir los scripts como **módulos** (con `type="module"`):

```html
    <script type="module" src="./js/app.js"></script>
```

Y **eliminar todo el contenido del `<script>`** actual, ya que ahora está distribuido en los archivos.

---

## 📋 Orden de commits sugerido

```bash
# 1. Crear rama
git checkout -b refactor/js-modules

# 2. Crear config.js
git add js/config.js
git commit -m "feat(config): add global configuration constants"

# 3. Crear domain modules
git add js/domain/
git commit -m "feat(domain): add mission events phases and trajectory modules"

# 4. Crear data modules (parcial)
git add js/data/telemetry.js js/data/solar.js
git commit -m "feat(data): add telemetry and solar weather modules"

# 5. Completar data modules
git add js/data/geomagnetic.js js/data/dsn.js js/data/news.js
git commit -m "feat(data): add geomagnetic dsn and news modules"

# 6. Crear UI modules
git add js/ui/
git commit -m "feat(ui): add telemetry display and theme modules"

# 7. Crear app.js y actualizar index.html
git add js/app.js index.html
git commit -m "feat(app): initialize modular JavaScript architecture"

# 8. Push
git push -u origin refactor/js-modules
```

---

## ✅ ¿Listo para empezar?

¿Quieres que te ayude con algún archivo específico o prefieres ir creándolos tú mismo y consultar dudas?