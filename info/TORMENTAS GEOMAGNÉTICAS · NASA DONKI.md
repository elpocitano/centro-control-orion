# TORMENTAS GEOMAGNÉTICAS · NASA DONKI

## 📊 Lo que vamos a agregar

Un nuevo panel **"TORMENTAS GEOMAGNÉTICAS · NASA DONKI"** que mostrará:

- Última tormenta detectada (fecha y hora)
- Índice Kp máximo (escala de intensidad)
- Nivel de tormenta (G1 a G5)
- Si hay una tormenta en curso

---

## 🔧 Código para agregar al dashboard

### 1. Agregar el panel en el HTML (dentro del segundo `<div class="grid-2">`)

Reemplazá el segundo `<div class="grid-2">` (el que contiene CLIMA SOLAR y FASES DE LA MISIÓN) por este:

```html
    <div class="grid-2">
        <div class="card">
            <div class="card-header"><i class="fas fa-sun"></i> CLIMA SOLAR · NOAA SWPC</div>
            <div id="solarWeather">Cargando datos solares...</div>
        </div>

        <div class="card">
            <div class="card-header"><i class="fas fa-chart-pie"></i> FASES DE LA MISIÓN</div>
            <div class="phase-clock" id="phaseClock"></div>
            <div id="phaseName" style="text-align: center; font-weight: bold; margin-top: 10px;">--</div>
            <div id="missionElapsed" style="text-align: center; font-size: 0.8rem; margin-top: 5px;"></div>
            <div id="nextEvent" style="text-align: center; font-size: 0.7rem; color: #FFB800; margin-top: 5px;"></div>
        </div>
    </div>

    <div class="grid-2">
        <div class="card">
            <div class="card-header"><i class="fas fa-meteor"></i> TORMENTAS GEOMAGNÉTICAS · NASA DONKI</div>
            <div id="geomagneticStorms">Cargando datos...</div>
        </div>

        <div class="card">
            <div class="card-header"><i class="fas fa-newspaper"></i> NOTICIAS · ARTEMIS II</div>
            <div id="newsFeed">Cargando noticias...</div>
        </div>
    </div>
```

---

### 2. Agregar la función `fetchGeomagneticStorms()` en el JavaScript

Agregá esta función antes de `fetchNews()`:

```javascript
    // Tormentas geomagnéticas desde NASA DONKI
    async function fetchGeomagneticStorms() {
        const stormsDiv = document.getElementById('geomagneticStorms');
        stormsDiv.innerHTML = 'Cargando datos...';
        
        try {
            // Calcular fechas: últimos 30 días hasta hoy
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            
            const formatDate = (d) => d.toISOString().split('T')[0];
            
            const url = `https://api.nasa.gov/DONKI/GST?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&api_key=DEMO_KEY`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            
            if (!data || data.length === 0) {
                stormsDiv.innerHTML = 'No se detectaron tormentas geomagnéticas en los últimos 30 días.';
                return;
            }
            
            // Obtener la tormenta más reciente
            const latestStorm = data[data.length - 1];
            
            // Encontrar el Kp máximo de esta tormenta
            let maxKp = 0;
            if (latestStorm.allKpIndex) {
                for (const kp of latestStorm.allKpIndex) {
                    if (kp.kpIndex > maxKp) maxKp = kp.kpIndex;
                }
            }
            
            // Determinar nivel de tormenta (G-scale)
            let gLevel = '';
            let gColor = '#00FF88';
            if (maxKp >= 9) { gLevel = 'G5 (Extrema)'; gColor = '#FF3366'; }
            else if (maxKp >= 8) { gLevel = 'G4 (Severa)'; gColor = '#FF6600'; }
            else if (maxKp >= 7) { gLevel = 'G3 (Fuerte)'; gColor = '#FFB800'; }
            else if (maxKp >= 6) { gLevel = 'G2 (Moderada)'; gColor = '#FFB800'; }
            else if (maxKp >= 5) { gLevel = 'G1 (Menor)'; gColor = '#FFB800'; }
            else { gLevel = 'Sin tormenta'; gColor = '#00FF88'; }
            
            // Formatear fecha
            const stormDate = new Date(latestStorm.startTime);
            const fechaFormateada = stormDate.toLocaleString('es-419', { hour12: false });
            
            stormsDiv.innerHTML = `
                <div class="solar-data"><strong>Última tormenta:</strong> ${fechaFormateada}</div>
                <div class="solar-data"><strong>Kp máximo:</strong> ${maxKp.toFixed(2)}</div>
                <div class="solar-data"><strong>Nivel:</strong> <span style="color: ${gColor};">${gLevel}</span></div>
                <div class="solar-data"><strong>Más información:</strong> <a href="${latestStorm.link}" target="_blank" style="color: #0088FF;">Ver en DONKI →</a></div>
            `;
            
        } catch (error) {
            console.error('Error fetching geomagnetic storms:', error);
            stormsDiv.innerHTML = '⚠️ Datos de tormentas no disponibles';
        }
    }
```

---

### 3. Llamar a la función en `init()`

Agregá esta línea dentro de `async function init()`:

```javascript
        await fetchGeomagneticStorms();
```

Y también en los intervalos (opcional, para actualizar cada hora):

```javascript
        setInterval(fetchGeomagneticStorms, 3600000); // cada 1 hora
```

---

## 📋 Código completo de la función `init()` actualizada

```javascript
    async function init() {
        await updateAll();
        await fetchSolarWeather();
        await fetchGeomagneticStorms();
        await fetchNews();
        updateLocalTime();
        setInterval(updateLocalTime, 1000);
        setInterval(updateAll, 30000);
        setInterval(fetchSolarWeather, 300000);
        setInterval(fetchGeomagneticStorms, 3600000);
        setInterval(fetchNews, 600000);
    }
```

---

## ✅ Resultado esperado

El nuevo panel mostrará algo como:

```
┌─────────────────────────────────────────┐
│ TORMENTAS GEOMAGNÉTICAS · NASA DONKI    │
├─────────────────────────────────────────┤
│ Última tormenta: 04/04/2026 00:00:00    │
│ Kp máximo: 6.67                         │
│ Nivel: G3 (Fuerte)                      │
│ Más información: Ver en DONKI →         │
└─────────────────────────────────────────┘
```

---

## 📝 Commit

```bash
git add index.html
git commit -m "feat: agregar panel de tormentas geomagnéticas desde NASA DONKI"
git push origin main
```