<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Prepara el **Sprint 01 convertido en una guía operativa exacta**, con:

- contenido inicial para cada archivo de `docs/`,
- ejemplo de `index.html` después de mover el CSS,
- y una lista de commits sugeridos en orden.

Perfecto. Acá tenés el **Sprint 01 convertido en una guía operativa exacta**, listo para ejecutar sobre tu proyecto actual. La guía sigue la planificación propuesta: crear estructura base, agregar documentación mínima, extraer el CSS inline a `css/base.css` y dejar un historial Git claro con commits pequeños y semánticos.[^1][^2]

## Alcance del Sprint 01

En este sprint **no** vas a rediseñar la app ni separar todavía toda la lógica JavaScript.  El objetivo es dejar una base más profesional: estructura de carpetas, documentos iniciales, convención de Git y un `index.html` que ya no tenga CSS inline, porque hoy el proyecto mezcla HTML, estilos y lógica en un mismo archivo.[^2][^1]

## Estructura objetivo

La estructura mínima propuesta para este sprint es esta, porque separa visual, datos, dominio y documentación sin obligarte todavía a una modularización completa del código.[^1]

```text
centro-control-orion/
├── index.html
├── README.md
├── docs/
│   ├── roadmap.md
│   ├── git-workflow.md
│   └── decisiones-arquitectura.md
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── sections.css
├── js/
│   ├── app.js
│   ├── config.js
│   ├── state.js
│   ├── utils.js
│   ├── data/
│   │   ├── telemetry.js
│   │   ├── solar.js
│   │   ├── dsn.js
│   │   ├── news.js
│   │   └── geomagnetic.js
│   ├── domain/
│   │   ├── mission-events.js
│   │   ├── mission-phases.js
│   │   ├── trajectory-model.js
│   │   └── fallback.js
│   └── ui/
│       ├── render-home.js
│       ├── render-mission.js
│       ├── render-trajectory.js
│       ├── render-environment.js
│       ├── render-news.js
│       └── render-sources.js
└── assets/
    └── icons/
```


## Paso a paso operativo

### 1. Crear la rama de trabajo

El flujo recomendado para este sprint arranca desde `main` y continúa en una rama dedicada, porque la planificación propone una rama por tarea o bloque de trabajo.[^1]

```bash
git checkout main
git pull origin main
git checkout -b refactor/project-structure
```


### 2. Crear carpetas y archivos base

La planificación indica crear `docs`, `css`, `js/data`, `js/domain`, `js/ui` y los archivos vacíos base para comenzar el ordenamiento estructural.[^1]

```bash
mkdir -p docs css js/data js/domain js/ui assets/icons
touch docs/roadmap.md docs/git-workflow.md docs/decisiones-arquitectura.md
touch css/base.css css/layout.css css/components.css css/sections.css
touch js/app.js js/config.js js/state.js js/utils.js
touch js/data/telemetry.js js/data/solar.js js/data/dsn.js js/data/news.js js/data/geomagnetic.js
touch js/domain/mission-events.js js/domain/mission-phases.js js/domain/trajectory-model.js js/domain/fallback.js
touch js/ui/render-home.js js/ui/render-mission.js js/ui/render-trajectory.js js/ui/render-environment.js js/ui/render-news.js js/ui/render-sources.js
```


### 3. Escribir la documentación inicial

El Sprint 01 pide explícitamente crear `docs/roadmap.md`, `docs/git-workflow.md` y `docs/decisiones-arquitectura.md`, integrando la documentación al trabajo del sprint y no como tarea separada.[^1]

## Contenido inicial de `docs/roadmap.md`

Este archivo sirve para dejar claro el estado actual del proyecto, el foco del sprint y los siguientes pasos del refactor.[^1]

```md
# Roadmap del proyecto

## Proyecto
Centro de Control Orion

## Propósito
Construir un dashboard educativo sobre la misión Artemis II y la cápsula Orion, con foco en visualización clara, curiosidad científica y mejora progresiva de arquitectura frontend.

## Estado actual
El proyecto parte de un único `index.html` que mezcla:
- estructura HTML,
- estilos CSS inline,
- lógica de datos,
- lógica de dominio de misión,
- renderizado de interfaz.

## Sprint 01
### Objetivo
Crear una base inicial de trabajo ordenada, manteniendo el comportamiento actual lo más estable posible.

### Alcance
- Crear estructura base de carpetas.
- Definir convención de ramas y commits.
- Agregar documentación mínima del proyecto.
- Extraer el CSS inline a `css/base.css`.

### Entregables
- Estructura inicial de proyecto.
- Carpeta `docs/` con documentación base.
- `index.html` enlazado a hoja de estilos externa.
- Historial Git con commits pequeños y temáticos.

## Próximos sprints
- Sprint 02: separar configuración y dominio de misión en archivos JS.
- Sprint 03: extraer lógica de datos por fuente.
- Sprint 04: reorganizar render UI por secciones.
- Sprint 05: mejora de accesibilidad, mobile first y rigor de estados de datos.
```


## Contenido inicial de `docs/git-workflow.md`

Este documento fija la convención de ramas, commits y checklist antes de guardar cambios, siguiendo el formato `type(scope): resumen corto` recomendado en la planificación.[^1]

```md
# Git workflow

## Objetivo
Mantener un historial de cambios claro, pequeño y comprensible.

## Reglas de trabajo
- Una rama por tarea o bloque de trabajo.
- Commits pequeños y temáticos.
- No mezclar refactor, UI y documentación en un solo commit si se pueden separar.
- Revisar siempre el estado antes de commitear.

## Flujo base
```bash
git checkout main
git pull origin main
git checkout -b refactor/project-structure
```


## Formato de commits

```bash
type(scope): resumen corto
```


## Tipos permitidos

- `feat`: nueva funcionalidad.
- `fix`: corrección de errores.
- `refactor`: reorganización sin cambiar comportamiento visible.
- `docs`: documentación.
- `style`: cambios visuales o CSS sin alterar lógica.
- `chore`: mantenimiento.
- `test`: pruebas.


## Scopes sugeridos

- `structure`
- `docs`
- `css`
- `ui`
- `data`
- `theme`
- `mission`
- `trajectory`
- `sources`


## Ejemplos

- `refactor(structure): create initial project folders`
- `docs(project): add roadmap and git workflow`
- `refactor(css): move inline styles to base stylesheet`
- `fix(theme): remove localStorage dependency`


## Checklist antes de commitear

- `git status`
- `git diff --staged`
- ¿El commit representa una sola idea?
- ¿El mensaje explica claramente el cambio?


## Checklist después de commitear

- `git log --oneline -5`
- ¿Se entiende la secuencia de trabajo?

```

## Contenido inicial de `docs/decisiones-arquitectura.md`

Este archivo registra por qué estás reorganizando el proyecto, algo que la planificación considera parte del aprendizaje y del sprint mismo.[^1]

```md
# Decisiones de arquitectura

## Sprint 01

### Decisión 1
Separar el proyecto en carpetas `docs`, `css`, `js/data`, `js/domain`, `js/ui` y `assets/icons`.

#### Razón
El proyecto actual está concentrado en un solo archivo, lo que dificulta mantenimiento, lectura y evolución por responsabilidades.

#### Beneficio esperado
Tener una base más clara para futuros sprints sin rediseñar todavía toda la aplicación.

---

### Decisión 2
Mover el CSS inline de `index.html` a `css/base.css`.

#### Razón
Separar estructura y presentación como primer paso real de refactor.

#### Beneficio esperado
Reducir tamaño y complejidad del archivo principal, facilitando pruebas y mantenimiento.

---

### Decisión 3
Mantener por ahora la lógica JavaScript dentro de `index.html` o pendiente de extracción gradual.

#### Razón
El Sprint 01 busca una refactorización inicial sin cambiar drásticamente el producto.

#### Beneficio esperado
Reducir riesgo de romper funcionalidades mientras se ordena la base del proyecto.
```


## Ejemplo de `index.html` después de mover el CSS

```
Tu archivo actual tiene un bloque `<style>` muy grande embebido en el `<head>`, junto con librerías como Chart.js, Font Awesome y Leaflet.  En este sprint, el cambio esperado es **sacar solo ese bloque CSS** y enlazar `./css/base.css`, manteniendo por ahora el resto del HTML y del `<script>` casi igual.[^2][^1]
```

Este es un ejemplo correcto de cómo debería quedar la parte principal del archivo:

```html
<!DOCTYPE html>
<html lang="es-419">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="elpocitano@gmail.com">
    <title>Centro de Control Orion | Datos Reales NASA JPL</title>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

    <!-- Leaflet CSS y JS para el mapa DSN -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <!-- Hoja de estilos del proyecto -->
    <link rel="stylesheet" href="./css/base.css">
</head>
<body>
    <div class="dashboard">
        <!-- Encabezado de pagina -->
        <div class="header">
            <div class="title-section">
                <h1><i class="fas fa-space-shuttle"></i> CENTRO DE CONTROL ORION</h1>
                <p>Datos REALES · NASA JPL Horizons · Misión Artemis II</p>
            </div>

            <div class="header-actions">
                <button id="themeToggle">
                    <i class="fas fa-sun"></i>
                    <span id="themeText">Modo Claro</span>
                </button>

                <div class="live-badge">
                    <i class="fas fa-circle"></i>
                    <span id="connectionStatus">DATOS JPL EN VIVO</span>
                </div>
            </div>
        </div>

        <!-- KPIs principales -->
        <div class="grid-2">
            <div class="card">
                <div class="card-header"><i class="fas fa-globe"></i> DISTANCIA A LA TIERRA</div>
                <div class="kpi-value" id="distanceEarth">--</div>
                <div class="trend" id="trendEarth"></div>
                <div class="data-source" id="sourceEarth">Fuente: JPL Horizons</div>
            </div>

            <div class="card">
                <div class="card-header"><i class="fas fa-moon"></i> DISTANCIA A LA LUNA</div>
                <div class="kpi-value" id="distanceMoon">--</div>
                <div class="data-source" id="sourceMoon">Estimación científica</div>
            </div>

            <div class="card">
                <div class="card-header"><i class="fas fa-tachometer-alt"></i> VELOCIDAD RADIAL</div>
                <div class="kpi-value" id="velocity">--</div>
                <div>⚡ <span id="speedMs">--</span> km/s</div>
                <div class="data-source">Velocidad respecto a la Tierra</div>
            </div>

            <div class="card">
                <div class="card-header"><i class="fas fa-satellite-dish"></i> RETARDO DE SEÑAL</div>
                <div class="kpi-value" id="signalDelay">--</div>
                <div>Ida y vuelta: <span id="roundTrip">--</span> s</div>
            </div>
        </div>

        <!-- El resto del contenido puede mantenerse igual en Sprint 01 -->

        <div class="footer">
            <i class="fab fa-github"></i> Dashboard: elpocitano@gmail.com · Datos: NASA JPL Horizons · Clima: NOAA SWPC · Noticias: SpaceNews
            <br><small>Basado en el trabajo de Ryan Fox (artemis-ii-cli, MIT License)</small>
        </div>
    </div>

    <script>
        /* En Sprint 01, el bloque JS actual puede seguir aquí sin modularizar todavía.
           La extracción del JavaScript queda para el siguiente sprint. */
    </script>
</body>
</html>
```


## Qué poner en `css/base.css`

En este sprint, `css/base.css` debe recibir todo el contenido del bloque `<style>` original, sin intentar todavía una clasificación fina entre `layout.css`, `components.css` y `sections.css`.  Eso es importante porque la planificación propone primero una extracción segura y luego una separación más detallada en sprints posteriores.[^2][^1]

En otras palabras:

- copiás todo el contenido del `<style>` original,[^2]
- lo pegás en `css/base.css`,[^1]
- borrás el `<style>` del HTML,[^2]
- y verificás que la página se vea igual.[^1]


## Lista de commits sugeridos en orden

La guía del sprint recomienda commits semánticos, pequeños y temáticos, usando el formato `type(scope): summary`.  Este orden es el más limpio para este Sprint 01:[^1]

```bash
refactor(structure): create initial project folders
docs(project): add roadmap git workflow and architecture notes
refactor(css): move inline styles to base stylesheet
docs(css): record initial stylesheet extraction decision
```


## Secuencia completa de trabajo con commits

Acá tenés la ejecución completa, en orden real:

### Commit 1: estructura inicial

```bash
git add .
git commit -m "refactor(structure): create initial project folders"
```

Este commit representa solo la creación de carpetas y archivos base, algo que la planificación sugiere registrar por separado.[^1]

### Commit 2: documentación inicial

```bash
git add docs/
git commit -m "docs(project): add roadmap git workflow and architecture notes"
```

Este commit deja asentadas las reglas de trabajo, el roadmap y las decisiones iniciales del sprint.[^1]

### Commit 3: extracción de CSS

```bash
git add index.html css/base.css
git commit -m "refactor(css): move inline styles to base stylesheet"
```

Este commit registra el primer refactor técnico real: sacar estilos inline del HTML y llevarlos a un archivo externo.[^2][^1]

### Commit 4: nota técnica posterior al cambio

```bash
git add docs/decisiones-arquitectura.md
git commit -m "docs(css): record initial stylesheet extraction decision"
```

Este commit deja trazada la decisión metodológica de mover primero todo el CSS junto y no repartirlo aún entre varios archivos.[^1]

## Verificación final del Sprint 01

Al cerrar el sprint, la comprobación mínima debería ser esta:

- existe la rama `refactor/project-structure`,[^1]
- existe la estructura de carpetas inicial,[^1]
- existen los tres documentos de `docs/`,[^1]
- `index.html` enlaza `./css/base.css`,[^2]
- el bloque `<style>` ya no está en el HTML,[^2]
- la interfaz sigue renderizando sin cambios visuales graves,[^2][^1]
- y `git log --oneline -5` muestra una secuencia clara de commits.[^1]


## Comando de cierre recomendado

Para revisar el historial:

```bash
git log --oneline -5
```

Y para subir la rama:

```bash
git push -u origin refactor/project-structure
```

Eso coincide con el flujo básico recomendado en la planificación del sprint.[^1]

En el siguiente paso puedo prepararte el **Sprint 02** con código base real para:

- `js/config.js`,
- `js/domain/mission-events.js`,
- `js/domain/mission-phases.js`,
- y un `app.js` mínimo para empezar a sacar lógica del HTML.

<div align="center">⁂</div>

[^1]: Sprint-01.md

[^2]: paste.txt

