# Git Workflow & Convenciones

## Ramas (Branching)
- `main`: Versión estable en producción.
- `refactor/`: Para cambios de estructura sin nuevas funciones.
- `feat/`: Para nuevas funcionalidades o secciones.
- `fix/`: Para corrección de errores.

## Formato de Commits
Usaremos **Conventional Commits** (versión simplificada):
`tipo(scope): descripción corta en minúsculas`

### Tipos permitidos:
- `feat`: Nueva funcionalidad.
- `fix`: Corrección de un bug.
- `refactor`: Cambio de código que no añade funciones ni corrige bugs.
- `docs`: Cambios solo en la documentación.
- `style`: Cambios de formato o CSS (estética).

### Scopes sugeridos:
`structure`, `css`, `data`, `ui`, `mission`, `docs`, `config`, `domain`, `telemetry`, `solar`, `geomagnetic`, `dsn`, `news`, `theme`, `app`

### Ejemplos para el Sprint 02:
```bash
feat(config): add global configuration constants
feat(domain): add mission events and phases modules
feat(data): add telemetry and solar weather modules
feat(ui): add telemetry display and theme modules
feat(app): initialize modular JavaScript architecture
refactor(index): replace inline script with module imports


---

## 4. Crear nuevo archivo: `docs/sprint-02-checklist.md`

Este archivo te ayudará a seguir el progreso:

```markdown
# Sprint 02 Checklist - Modularización JavaScript

## Preparación
- [ ] Crear rama `refactor/js-modules`
- [ ] Verificar que el Sprint 01 esté completo y pusheado

## Archivos a crear (orden sugerido)

### Fase 1: Configuración y constantes
- [ ] `js/config.js`
- [ ] `js/domain/mission-events.js`
- [ ] `js/domain/mission-phases.js`

### Fase 2: Dominio (lógica de misión)
- [ ] `js/domain/trajectory-model.js`
- [ ] `js/domain/mission-utils.js`

### Fase 3: Datos (APIs)
- [ ] `js/data/telemetry.js`
- [ ] `js/data/solar.js`
- [ ] `js/data/geomagnetic.js`
- [ ] `js/data/dsn.js`
- [ ] `js/data/news.js`

### Fase 4: UI (renderizado)
- [ ] `js/ui/telemetry-ui.js`
- [ ] `js/ui/theme.js`

### Fase 5: Aplicación principal
- [ ] `js/app.js`

### Fase 6: Integración
- [ ] Modificar `index.html` (agregar `<script type="module" src="./js/app.js">`)
- [ ] Eliminar el bloque `<script>` original del `index.html`
- [ ] Probar que todo funciona

## Verificación final
- [ ] `git status` muestra solo los archivos esperados
- [ ] `git log --oneline -5` muestra commits claros
- [ ] El dashboard carga sin errores en consola
- [ ] Los datos (KPIs, clima, noticias, DSN) se muestran correctamente
- [ ] El tema oscuro/claro funciona
- [ ] La trayectoria y el punto de Orion se actualizan

## Commits sugeridos
```bash
git commit -m "feat(config): add global configuration constants"
git commit -m "feat(domain): add mission events and phases modules"
git commit -m "feat(domain): add trajectory model and mission utilities"
git commit -m "feat(data): add telemetry module"
git commit -m "feat(data): add solar weather module"
git commit -m "feat(data): add geomagnetic storms module"
git commit -m "feat(data): add DSN status module"
git commit -m "feat(data): add news module"
git commit -m "feat(ui): add telemetry display module"
git commit -m "feat(ui): add theme module"
git commit -m "feat(app): initialize modular architecture"
git commit -m "refactor(index): replace inline script with module imports"


---

## 📁 Resumen de archivos de documentación actualizados

| Archivo | Cambio |
|---------|--------|
| `roadmap.md` | Actualizar estado Sprint 01, agregar detalle Sprint 02 |
| `decisiones-arquitectura.md` | Agregar ADR 03 y ADR 04 |
| `git-workflow.md` | Agregar scopes y ejemplos para Sprint 02 |
| `sprint-02-checklist.md` | **Nuevo archivo** para seguimiento |
