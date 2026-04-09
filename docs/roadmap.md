# Roadmap del Proyecto: Centro de Control Orion

## Propósito
Construir un dashboard educativo sobre la misión Artemis II y la cápsula Orion, enfocado en la visualización clara, rigor científico y con arquitectura modular.

## Estado actual
- **Fase 0 (Completada):** Prototipo funcional en un único archivo HTML.
- **Sprint 01 (Completado):** Refactorización estructural y limpieza de estilos.
  - Estructura de carpetas creada
  - CSS extraído a `css/base.css`
  - Documentación inicial establecida
- **Sprint 02 (En curso):** Modularización de JavaScript

## Próximos Sprints
- **Sprint 02:** Modularización de JavaScript (Configuración, Dominio, Datos, UI)
- **Sprint 03:** Extracción de lógica de datos (APIs NASA, NOAA, DONKI) - *Nota: parte del Sprint 02*
- **Sprint 04:** Reorganización de UI por componentes (Cards, Mapas, Gráficos)
- **Sprint 05:** Accesibilidad, Mobile First y optimización de carga

## Detalle Sprint 02 - Modularización JavaScript

### Objetivo
Separar el bloque `<script>` del `index.html` en archivos modulares con responsabilidades claras.

### Archivos a crear
| Archivo | Responsabilidad |
|---------|-----------------|
| `js/config.js` | Constantes globales |
| `js/domain/mission-events.js` | Eventos de la misión |
| `js/domain/mission-phases.js` | Fases del reloj circular |
| `js/domain/trajectory-model.js` | Trayectoria y posición de Orion |
| `js/domain/mission-utils.js` | Utilidades de misión |
| `js/data/telemetry.js` | Telemetría Orion |
| `js/data/solar.js` | Clima solar |
| `js/data/geomagnetic.js` | Tormentas geomagnéticas |
| `js/data/dsn.js` | Red DSN |
| `js/data/news.js` | Noticias |
| `js/ui/telemetry-ui.js` | Actualización de UI |
| `js/ui/theme.js` | Tema oscuro/claro |
| `js/app.js` | Inicialización |

### Criterios de aceptación
- [ ] El dashboard sigue funcionando igual que antes
- [ ] No hay errores en consola relacionados con módulos
- [ ] Los scripts se cargan como `type="module"`
- [ ] Cada archivo tiene una responsabilidad clara y única