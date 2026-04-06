# Sprint 1  
  ## Sobre los commits

Las prácticas más sólidas y simples para vos serían estas:

- Usar verbo en imperativo, por ejemplo `add`, `fix`, `refactor`, `docs`.[^4][^1]
- Escribir un resumen corto y claro, idealmente alrededor de 50 caracteres, y agregar cuerpo solo cuando haga falta contexto.[^5][^1]
- Mantener un formato consistente en todo el repositorio; incluso el idioma debería ser consistente una vez elegido.[^2][^6]

Mi recomendación concreta es adoptar una versión **junior-friendly** de Conventional Commits, sin complicarte con reglas avanzadas al principio.  Un formato ideal para este proyecto sería:[^2]

```bash
tipo(scope): resumen corto
```

Ejemplos:

```bash
feat(home): add mission hero section
fix(theme): correct dark mode toggle state
refactor(data): split telemetry fetch logic
docs(roadmap): add refactor stages
style(layout): improve mobile card spacing
```

Eso es suficiente para aprender bien y escalar después.  No hace falta empezar con footers, breaking changes o automatizaciones complejas desde el día uno.[^2]

## Buenas prácticas Git

Como mentor, te propongo estas reglas de trabajo para este repo:

- Una rama por tarea o bloque de trabajo.
- Commits pequeños y temáticos, no “mezcla de todo”.
- Antes de commitear, revisar con `git status` y `git diff`.
- Si un cambio mezcla refactor + UI + docs, separarlo en varios commits si se puede.[^7][^1]

Flujo básico recomendado:

```bash
git checkout main
git pull origin main
git checkout -b refactor/html-css-js-structure
```

Durante el trabajo:

```bash
git status
git diff
git add .
git commit -m "refactor(structure): split html css and js responsibilities"
```

Para subir la rama:

```bash
git push -u origin refactor/html-css-js-structure
```

Esto es simple, profesional y suficiente para aprender bien.[^1][^2]

## Tarea educativa Git

Sí, lo agregaría al plan como tarea educativa formal.  No como algo separado del proyecto, sino integrado a cada sprint.[^3][^2]

### Mini plan educativo Git

**Sprint 1 — fundamentos**

- Crear ramas con nombres consistentes.
- Hacer commits pequeños.
- Escribir mensajes con `type(scope): summary`.[^2]

## Git Convención recomendada

Te dejo una convención concreta para este proyecto:

### Tipos

- `feat`: nueva funcionalidad.[^2]
- `fix`: corrección de errores.[^2]
- `refactor`: reorganización sin cambiar comportamiento visible.[^2]
- `docs`: documentación.[^2]
- `style`: cambios visuales o CSS sin alterar lógica.
- `chore`: tareas de mantenimiento.
- `test`: pruebas, si luego las agregás.


### Scopes sugeridos

- `home`
- `mission`
- `trajectory`
- `environment`
- `news`
- `sources`
- `theme`
- `data`
- `ui`
- `structure`
- `docs`

Ejemplos reales para tu refactor:

- `refactor(structure): move inline styles to css files`
- `refactor(data): extract NOAA and DONKI fetch modules`
- `feat(home): add mission summary section`
- `docs(git): add commit and branch workflow`
- `fix(theme): remove localStorage dependency`[^8]


### Etapa 1 actualizada

Además de separar responsabilidades HTML/CSS/JS, agregá estas tareas:

- Definir convención de ramas y commits.
- Crear `docs/roadmap.md`.
- Crear `docs/decisiones-arquitectura.md`.
- Registrar cada cambio relevante con commits semánticos.[^2]


### Checklist de cada tarea

Antes de commitear:

- `git status`
- `git diff --staged`
- ¿El commit representa una sola idea?
- ¿El mensaje explica claramente el cambio?[^1]

Después:

- `git log --oneline -5`
- ¿Se entiende la secuencia de trabajo?[^1]


## Continuación del plan

Ahora seguimos con la parte central: **refactorización dividiendo HTML / CSS / JS**, porque ese es el paso correcto dado que hoy el proyecto está concentrado en un solo archivo con estilos inline, lógica de fetch, render y dominio mezclados.[^8]

### Objetivo del próximo bloque

Lograr una primera refactorización estructural **sin cambiar todavía el producto de forma drástica**.  La meta no es rediseñar todo ya, sino obtener una base limpia que permita seguir iterando.[^8]

## Estructura inicial real

Te propongo empezar con esta versión mínima, más simple que la estructura final completa:

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

Esta versión inicial ya separa:

- estructura visual,
- lógica de datos,
- modelo de misión,
- render de UI.[^8]


## Orden de refactor recomendado

### Paso 1

Crear rama nueva:

```bash
git checkout main
git pull origin main
git checkout -b refactor/project-structure
```

Commit sugerido:

```bash
git commit -m "refactor(structure): create base folders for css and js"
```

## Primera tarea concreta

Te recomiendo arrancar con este primer bloque hoy mismo:

1. Clonar o abrir el repo local.
2. Crear rama `refactor/project-structure`.
3. Crear carpetas `docs`, `css`, `js`, `js/data`, `js/domain`, `js/ui`.
4. Crear archivos vacíos base.
5. Mover solo el CSS inline al archivo `css/base.css`.
6. Hacer commit semántico.[^2][^8]

Comando sugerido:

```bash
mkdir -p docs css js/data js/domain js/ui assets/icons
touch docs/roadmap.md docs/git-workflow.md docs/decisiones-arquitectura.md
touch css/base.css css/layout.css css/components.css css/sections.css
touch js/app.js js/config.js js/state.js js/utils.js
touch js/data/telemetry.js js/data/solar.js js/data/dsn.js js/data/news.js js/data/geomagnetic.js
touch js/domain/mission-events.js js/domain/mission-phases.js js/domain/trajectory-model.js js/domain/fallback.js
touch js/ui/render-home.js js/ui/render-mission.js js/ui/render-trajectory.js js/ui/render-environment.js js/ui/render-news.js js/ui/render-sources.js
```

Primer commit:

```bash
git add .
git commit -m "refactor(structure): create initial project folders"
```

Segundo commit:

```bash
git add .
git commit -m "refactor(css): move inline styles to base stylesheet"
```

En el próximo paso puedo darte un **esqueleto real de `index.html`** ya adaptado a esta estructura, junto con el contenido inicial de `app.js`, `config.js` y `mission-events.js`, para que empieces la refactorización con código base en vez de solo con el plan.