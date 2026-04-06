<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Actua como un guia o mentor de todo el proceso, y guiame en el plan de trabajo propuesto.

Propone un mapa de navegación + wireframe textual de la mini web y además una estructura real de archivos HTML/CSS/JS para comenzar la refactorización (separacion en carpetas y archivos con sus nombres y tipo)

Perfecto. Voy a guiarte como mentor: no pensando solo en “cómo debería quedar”, sino en **cómo avanzar sin romper lo que ya tenés**, entendiendo por qué hacemos cada cambio. Tu código actual ya concentra todo en un único HTML con CSS inline, lógica de misión, render UI, fetch de APIs, trayectoria SVG, clima solar, DSN, noticias y tema; eso confirma que el primer paso correcto es desacoplar responsabilidades antes de rediseñar fuerte.[^1]

## Enfoque de mentoría

La idea no es rehacer todo desde cero, sino trabajar en capas: primero ordenar, después clarificar, después enriquecer.  Como tu producto actual ya tiene KPIs, fases, trayectoria, DSN, clima solar y noticias, vamos a convertir esos bloques existentes en módulos reutilizables dentro de una mini web más didáctica y navegable.[^1]

Tu regla de trabajo va a ser esta: **cada iteración debe dejar una versión funcional y publicable**.  Eso te permite aprender arquitectura, UI y UX sin caer en el típico “gran refactor” que rompe todo y nunca se termina.[^1]

## Mapa de navegación

Te propongo una mini web de una sola entrada HTML con navegación interna por hash o secciones, para mantener despliegue simple y conservar compatibilidad con hosting estático.[^1]

```text
[Inicio]
  ├─ Resumen de misión
  ├─ KPIs principales
  ├─ Estado del dato
  └─ Próximo evento

[Misión]
  ├─ Objetivo de Artemis II
  ├─ Fases de la misión
  ├─ Timeline de eventos
  └─ Glosario rápido

[Trayectoria]
  ├─ Visual Tierra-Luna-Tierra
  ├─ Posición actual de Orion
  ├─ Distancia / velocidad / retardo
  └─ Explicación didáctica

[Entorno espacial]
  ├─ Clima solar
  ├─ Tormentas geomagnéticas
  ├─ Red DSN
  └─ Cómo afecta a las comunicaciones

[Noticias]
  ├─ Noticias recientes
  ├─ Actualizaciones de contexto
  └─ Enlaces externos

[Fuentes]
  ├─ Origen de datos
  ├─ Calidad y estado del dato
  ├─ Metodología de simulación/fallback
  └─ Créditos
```

Este mapa aprovecha lo que ya existe en tu código —KPIs, fases, trayectoria, clima solar, DSN y noticias— pero redistribuyéndolo con mejor jerarquía y con una sección específica para explicar metodología y confianza de los datos.[^1]

## Wireframe textual

### 1. Inicio

```text
┌─────────────────────────────────────────────┐
│ Logo Orion Edu        Tema   Estado del dato│
│ “Artemis II / Orion”                         │
│ Subtítulo: seguimiento educativo y técnico  │
├─────────────────────────────────────────────┤
│ Hero principal                              │
│ Fase actual: TRÁNSITO LUNAR                 │
│ “Orion se encuentra en viaje hacia la Luna” │
│ Última actualización: fecha/hora            │
│ [Ver trayectoria] [Entender la misión]      │
├─────────────────────────────────────────────┤
│ KPI 1     KPI 2     KPI 3     KPI 4         │
│ Tierra    Luna      Velocidad Retardo       │
├─────────────────────────────────────────────┤
│ Próximo evento                              │
│ Tiempo transcurrido                         │
│ Explicación corta de qué significa          │
└─────────────────────────────────────────────┘
```

La home debe concentrar solo lo esencial.  Hoy el dashboard ya muestra estos elementos, pero distribuidos entre muchas cards con peso visual parejo; en la nueva versión la home se convierte en un panel-resumen orientado a comprensión inmediata.[^1]

### 2. Misión

```text
┌─────────────────────────────────────────────┐
│ Título: La misión Artemis II                │
│ Texto breve: qué busca demostrar la misión  │
├─────────────────────────────────────────────┤
│ Línea de tiempo visual                      │
│ Lanzamiento → TLI → SOI lunar → Sobrevuelo │
│ → Regreso → Reingreso → Amerizaje           │
├─────────────────────────────────────────────┤
│ Fases en tarjetas o acordeón                │
│ Cada fase: nombre + explicación + duración  │
├─────────────────────────────────────────────┤
│ Glosario rápido                             │
│ TLI | SOI | DSN | Reingreso | Retardo       │
└─────────────────────────────────────────────┘
```

Acá reutilizás directamente las estructuras `MISSION_EVENTS`, `PHASES` y `MISSION_PHASES`, pero cambiando el enfoque de “indicador compacto” a “explicación navegable”.[^1]

### 3. Trayectoria

```text
┌─────────────────────────────────────────────┐
│ Título: Trayectoria de Orion                │
│ Texto: recorrido simplificado Tierra-Luna   │
├─────────────────────────────────────────────┤
│ Visual principal SVG/Canvas                 │
│ Tierra -------- Luna -------- Regreso       │
│ Punto actual de Orion + hitos               │
├─────────────────────────────────────────────┤
│ Panel lateral o inferior                    │
│ - Distancia a la Tierra                     │
│ - Distancia a la Luna                       │
│ - Velocidad                                 │
│ - Retardo de señal                          │
├─────────────────────────────────────────────┤
│ “¿Qué significa esto?”                      │
│ Explicación humana de los valores técnicos  │
└─────────────────────────────────────────────┘
```

Tu SVG actual ya contiene Tierra, Luna, path, posición y progreso; la mejora consiste en volverlo más narrativo, con menos decoración y más explicación contextual.[^1]

### 4. Entorno espacial

```text
┌─────────────────────────────────────────────┐
│ Título: Entorno espacial y comunicaciones   │
│ Texto: cómo el ambiente afecta la misión    │
├─────────────────────────────────────────────┤
│ Clima solar                                 │
│ Viento solar / temperatura / densidad       │
│ Explicación breve                           │
├─────────────────────────────────────────────┤
│ Tormentas geomagnéticas                     │
│ Índice Kp / nivel G                         │
│ Qué implica para radio y operaciones        │
├─────────────────────────────────────────────┤
│ Red DSN                                     │
│ Mapa + estaciones + explicación             │
└─────────────────────────────────────────────┘
```

Esto toma tres partes ya existentes: NOAA SWPC, DONKI y DSN.  La diferencia es que dejan de ser “cards accesorias” y pasan a ser una sección temática coherente: entorno y comunicaciones.[^1]

### 5. Noticias

```text
┌─────────────────────────────────────────────┐
│ Título: Noticias y novedades                │
│ Texto: contexto reciente sobre Artemis/Orion│
├─────────────────────────────────────────────┤
│ Lista de noticias                           │
│ Titular + fecha + fuente + enlace externo   │
├─────────────────────────────────────────────┤
│ Nota: no reemplaza fuentes técnicas         │
└─────────────────────────────────────────────┘
```

Tu feed actual filtrado desde SpaceNews puede seguir, pero siempre rotulado como contenido editorial complementario, no como fuente primaria de telemetría.[^1]

### 6. Fuentes

```text
┌─────────────────────────────────────────────┐
│ Título: Fuentes y metodología               │
├─────────────────────────────────────────────┤
│ Tabla de fuentes                            │
│ JPL | NOAA | DONKI | DSN | Noticias         │
├─────────────────────────────────────────────┤
│ Estado del dato                             │
│ Real / derivado / estimado / simulado       │
├─────────────────────────────────────────────┤
│ Cómo funciona el fallback                   │
│ Si falla API pública → proyección educativa │
│ con marca de tiempo y aviso visible         │
└─────────────────────────────────────────────┘
```

Esta sección es importante porque resuelve la mezcla actual entre telemetría real, trayectorias interpoladas y valores de respaldo.[^1]

## Estructura real de archivos

Para empezar la refactorización, te conviene una estructura simple, realista y mantenible.[^1]

```text
orion-miniweb/
│
├── index.html
├── README.md
├── docs/
│   ├── roadmap.md
│   ├── decisiones-arquitectura.md
│   └── fuentes-y-metodologia.md
│
├── assets/
│   ├── icons/
│   │   ├── logo-orion.svg
│   │   ├── moon.svg
│   │   ├── earth.svg
│   │   └── signal.svg
│   ├── images/
│   │   ├── hero-orion.webp
│   │   └── dsn-bg.webp
│   └── favicons/
│
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── sections.css
│   └── utilities.css
│
├── js/
│   ├── app.js
│   ├── router.js
│   ├── state.js
│   ├── config.js
│   │
│   ├── data/
│   │   ├── nasa-horizons.js
│   │   ├── solar-weather.js
│   │   ├── geomagnetic.js
│   │   ├── dsn.js
│   │   ├── news.js
│   │   └── adapters.js
│   │
│   ├── domain/
│   │   ├── mission-model.js
│   │   ├── mission-events.js
│   │   ├── mission-phases.js
│   │   ├── fallback-engine.js
│   │   ├── units-format.js
│   │   └── data-quality.js
│   │
│   ├── ui/
│   │   ├── render-shell.js
│   │   ├── render-home.js
│   │   ├── render-mission.js
│   │   ├── render-trajectory.js
│   │   ├── render-environment.js
│   │   ├── render-news.js
│   │   ├── render-sources.js
│   │   └── components.js
│   │
│   ├── visualizations/
│   │   ├── trajectory-svg.js
│   │   ├── phase-timeline.js
│   │   ├── dsn-map.js
│   │   └── charts.js
│   │
│   └── utils/
│       ├── dom.js
│       ├── time.js
│       ├── theme.js
│       ├── fetch-json.js
│       └── logger.js
│
└── data/
    ├── fallback/
    │   ├── sample-telemetry.json
    │   ├── mission-reference.json
    │   └── glossary.json
    └── cache/
```


## Qué hace cada archivo

### HTML

- `index.html`: shell principal, layout base, navegación, contenedor de secciones y carga de CSS/JS.[^1]

No empieces con múltiples HTML todavía.  Con un solo `index.html` y secciones internas ya tenés mini web suficiente, menos complejidad y mejor control para el refactor.[^1]

### CSS

- `tokens.css`: colores, tipografía, spacing, radios, sombras y temas.[^1]
- `base.css`: reset, body, headings, enlaces, focus, accesibilidad básica.[^1]
- `layout.css`: grid general, contenedores, header, nav, responsive.[^1]
- `components.css`: cards, badges, botones, timeline items, accordions, KPI blocks.[^1]
- `sections.css`: reglas específicas de Home, Misión, Trayectoria, Entorno, Noticias, Fuentes.[^1]
- `utilities.css`: helpers mínimos, por ejemplo `.sr-only`, `.hidden`, `.flow`, `.stack`.[^1]


### JS principal

- `app.js`: inicializa la aplicación, arranca fetch, render y refrescos.[^1]
- `router.js`: navegación por hash (`#inicio`, `#mision`, etc.).[^1]
- `state.js`: estado global en memoria, sin `localStorage`, para datos, tema y vista actual.[^1]
- `config.js`: endpoints, intervalos de refresh, flags de entorno.[^1]


### JS de datos

- `nasa-horizons.js`: obtiene telemetría/efemérides.[^1]
- `solar-weather.js`: NOAA SWPC.[^1]
- `geomagnetic.js`: DONKI.[^1]
- `dsn.js`: metadata de estaciones DSN.[^1]
- `news.js`: noticias filtradas.[^1]
- `adapters.js`: convierte todas las fuentes a un formato uniforme.[^1]


### JS de dominio

- `mission-model.js`: calcula estado de misión, progreso, siguiente evento.[^1]
- `mission-events.js`: eventos clave.[^1]
- `mission-phases.js`: catálogo de fases y copy didáctico.[^1]
- `fallback-engine.js`: decide cuándo usar simulación y cómo avisarlo.[^1]
- `units-format.js`: formato de km, km/h, s, UTC/local.[^1]
- `data-quality.js`: etiquetas `live`, `derived`, `simulated`, `stale`, `error`.[^1]


### JS de UI

- `render-shell.js`: header, nav, footer, estructura general.[^1]
- `render-home.js`: hero, KPIs, próximo evento.[^1]
- `render-mission.js`: timeline y fases.[^1]
- `render-trajectory.js`: panel explicativo de posición y trayectoria.[^1]
- `render-environment.js`: clima solar, tormentas y DSN.[^1]
- `render-news.js`: noticias.[^1]
- `render-sources.js`: metodología y fuentes.[^1]
- `components.js`: funciones reutilizables para card, badge, notice, source-chip, etc.[^1]


## Cómo empezar la refactorización

Yo te guiaría en este orden exacto:

1. Crear la estructura de carpetas vacía.
2. Mover el CSS inline a `css/base.css`, aunque al principio quede “feo pero igual”.[^1]
3. Mover constantes de misión (`MISSION_EVENTS`, `PHASES`, puntos de trayectoria) a `js/domain/`.[^1]
4. Mover funciones de fetch a `js/data/`.[^1]
5. Mover funciones de render a `js/ui/`.[^1]
6. Dejar `app.js` solo como orquestador.[^1]
7. Recién después redibujar navegación y secciones.[^1]

Ese orden es importante porque primero ganás claridad estructural y después mejorás UX.  Si invertís el orden, terminás decorando un monolito difícil de mantener.[^1]

## Primer entregable concreto

Tu primer milestone debería ser este:

- `index.html` limpio con header, nav, main y secciones vacías.[^1]
- CSS separado en 4 o 5 archivos.[^1]
- JS separado en `app.js`, `state.js`, `data/`, `domain/`, `ui/`.[^1]
- La home renderizando solo:
    - estado de misión,
    - 4 KPIs,
    - próximo evento,
    - badge de calidad del dato.[^1]

Eso ya te deja una versión más profesional sin perder funcionalidad.[^1]

## Mi guía práctica como mentor

Tu foco de aprendizaje por etapa debería ser:

- Etapa 1: aprender separación de responsabilidades.
- Etapa 2: aprender jerarquía visual y mobile-first.[^1]
- Etapa 3: aprender arquitectura UI basada en componentes.
- Etapa 4: aprender diseño de datos y fallbacks honestos.[^1]
- Etapa 5: aprender visualización didáctica.[^1]
- Etapa 6: aprender accesibilidad y robustez.[^1]

Mi consejo metodológico: no abras diez frentes.  En cada sprint, elegí una sola victoria clara y visible.

### Sprint 1 recomendado

Objetivo: “pasar del HTML monolítico a estructura modular mínima”.[^1]

Tareas:

- Crear carpetas.
- Extraer CSS.
- Extraer config y constantes.
- Extraer fetch de APIs.
- Mantener aún la misma visual general.[^1]

Criterio de aceptación:

- La web sigue funcionando.
- Ya no hay lógica grande inline en el HTML.
- El tema ya no depende de `localStorage`.[^1]

Si querés, en el siguiente paso te preparo algo todavía más práctico: un **esqueleto inicial real** de `index.html` + nombres de secciones + pseudocódigo de `app.js` y `router.js`, para que ya puedas empezar a refactorizar con una base concreta.

<div align="center">⁂</div>

[^1]: paste.txt

