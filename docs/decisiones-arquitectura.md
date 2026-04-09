# Registro de Decisiones de Arquitectura (ADR)

## ADR 01: Separación por Responsabilidades
- **Fecha:** 2026-04-06
- **Estatus:** Aceptado
- **Contexto:** El proyecto original era un archivo monolítico de +2000 líneas.
- **Decisión:** Dividir el proyecto en carpetas especializadas (`css`, `js/data`, `js/domain`, `js/ui`).
- **Consecuencia:** Mayor facilidad para encontrar errores y escalar el proyecto sin romper funciones existentes.

## ADR 02: Extracción de CSS a Hoja Externa
- **Fecha:** 2026-04-06
- **Estatus:** Aceptado
- **Decisión:** Mover el bloque `<style>` del HTML a `css/base.css`.
- **Razón:** Separar la estructura (HTML) de la presentación (CSS) para mejorar la mantenibilidad.

## ADR 03: Modularización de JavaScript
- **Fecha:** 2026-04-06
- **Estatus:** En curso / Aceptado
- **Decisión:** Dividir el bloque `<script>` del `index.html` en múltiples archivos ES modules.
- **Razón:** 
  - Separar responsabilidades (configuración, dominio, datos, UI)
  - Facilitar la localización de errores
  - Permitir reutilización de código
  - Mejorar la experiencia de aprendizaje al entender la arquitectura
- **Estructura propuesta:**
js/
├── app.js # Inicialización y orquestación
├── config.js # Constantes globales
├── domain/ # Lógica de negocio de la misión
│ ├── mission-events.js
│ ├── mission-phases.js
│ ├── mission-utils.js
│ └── trajectory-model.js
├── data/ # Obtención de datos de APIs
│ ├── telemetry.js
│ ├── solar.js
│ ├── geomagnetic.js
│ ├── dsn.js
│ └── news.js
└── ui/ # Renderizado e interacción
├── telemetry-ui.js
└── theme.js

- **Consecuencia:** El `index.html` solo contendrá `<script type="module" src="./js/app.js"></script>` y la lógica estará distribuida.

## ADR 04: Uso de ES Modules (import/export)
- **Fecha:** 2026-04-06
- **Estatus:** Aceptado
- **Decisión:** Utilizar `export` e `import` para comunicar los módulos.
- **Razón:** 
- Es el estándar moderno de JavaScript
- Permite dependencias explícitas entre archivos
- Evita contaminar el ámbito global
- Mejor compatibilidad con herramientas de desarrollo