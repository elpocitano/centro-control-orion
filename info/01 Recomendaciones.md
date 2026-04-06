<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Respuestas pertinentes:

1 - Capa de simulacion educativa cuando fallen fuentes de datos publicos en tiempo real, pero indicandolo (ejemplo, proyeccion de datos con ultima actualizacion a tal dia y hora)
2 - Publico principal, entusiastas del espacio, en segundo lugar, estudiantes secundarios.
3 - Una mini web estaria bien, con secciones.
4 - Prioridad didactica, que muestre valores tecnicos pero que los explique.
5 - La idea es consumir datos en vivo desde APIs públicas en producción, mantener las fuentes lo mas fidedignas posible.
6 - Abierto a visualizacion con una arquitectura mas limpia.
7 - Revision conceptual y propone una estructura html/css/js con buenas practicas de diseño web (UI y UX), el proyecto ademas es para aprender y aplicar estos conocmimientos sobre diseño.
Desarrolla un plan dividido en etapas para la implementacion, como si fuera una metodologia agil, para ir incorporando cambios y actualizando el proyecto en forma incremental. Para permitir que el producto siga disponible pero evolucionando. Y yo vaya aprendiendo en el proceso.

Sí: con tus respuestas, la dirección más correcta no es “retocar el dashboard actual”, sino **evolucionarlo** hacia una mini web educativa con arquitectura modular, degradación elegante de datos y una UX por capas de comprensión.  Además, como querés mantener el producto disponible mientras mejora, conviene trabajar con una metodología incremental tipo roadmap ágil, donde cada etapa deje una versión usable en producción.[^1]

## Visión del producto

La mini web debería dejar de comportarse como un único panel saturado y pasar a ser una experiencia con secciones claras: inicio/resumen, misión, trayectoria, red DSN, entorno espacial, noticias y fuentes/metodología.  Esto encaja mejor con tu prioridad didáctica, porque permite mostrar datos técnicos sin abrumar, explicarlos en contexto y mantener visible cuándo un valor es real, derivado o simulado.[^1]

También conviene definir desde el inicio una regla editorial del producto: “todo dato visible debe indicar su procedencia, frescura y nivel de confianza”.  Esa regla resuelve el problema más importante del código actual, donde hay mezcla de APIs reales con valores de respaldo e interpolaciones que hoy pueden percibirse como telemetría real.[^1]

## Arquitectura propuesta

Te sugiero una arquitectura simple pero limpia, pensada para aprender y crecer sin romper lo ya publicado.[^1]


| Capa | Responsabilidad | Recomendación |
| :-- | :-- | :-- |
| `content/` | Textos didácticos, glosario, descripciones de fases | Mantener copy separado del render para que puedas mejorar explicación sin tocar lógica. [^1] |
| `data/` | Adaptadores de NASA/JPL/NOAA/DONKI/noticias | Unificar respuesta a formato común: `value`, `unit`, `source`, `updatedAt`, `status`. [^1] |
| `domain/` | Modelo de misión, fases, reglas de fallback, etiquetas de confianza | Separar simulación pedagógica de datos reales. [^1] |
| `ui/` | Componentes: KPI, timeline, badge de fuente, cards, tabs, accordions | Reutilizar patrones en vez de HTML repetido. [^1] |
| `app/` | Router, estado global, refresh, inicialización | Controlar qué sección renderizar y cuándo refrescar datos. [^1] |

Estructura sugerida:

```text
orion-edu/
  index.html
  /assets
  /styles
    tokens.css
    base.css
    layout.css
    components.css
    utilities.css
  /js
    app.js
    router.js
    state.js
    /data
      nasa.js
      noaa.js
      donki.js
      news.js
    /domain
      mission-model.js
      fallback-engine.js
      units.js
      glossary.js
    /ui
      render-home.js
      render-mission.js
      render-trajectory.js
      render-dsn.js
      render-space-weather.js
      render-sources.js
      components.js
```


## UX y contenidos

La navegación debería ser simple, con 5 o 6 secciones máximo, y con una home que responda rápido tres preguntas: “dónde está Orion”, “en qué fase está”, y “qué significa eso”.  En el código actual ya existen piezas reutilizables para esto, como KPIs, fase actual, próximo evento y trayectoria, pero necesitan reordenarse con mejor jerarquía y menos competencia visual entre tarjetas.[^1]

Te propongo esta estructura de mini web:

- Inicio: resumen de misión, fase actual, 4 KPIs y explicación corta.[^1]
- Misión: timeline, fases, objetivos y eventos.[^1]
- Trayectoria: visual principal con hitos, distancias y retardo de señal explicado.[^1]
- Entorno espacial: clima solar, DSN y por qué afectan comunicaciones.[^1]
- Noticias y fuentes: actualidad, metodología, calidad del dato y glosario.[^1]

A nivel UI/UX, el patrón ideal es “valor técnico + traducción humana”.  Por ejemplo: “Retardo de señal: 2.8 s” y debajo “un comando tardaría 2.8 segundos en llegar a la cápsula”.[^1]

## Plan incremental

### Etapa 0

Definí el contrato del dato antes de rediseñar la interfaz.  Cada bloque de información debe exponer al menos `status` (`live`, `derived`, `simulated`, `error`), `source`, `updatedAt`, `confidence` y `explanation`, para que toda la web comunique con honestidad cuándo muestra API real y cuándo usa proyección.[^1]

Entregable:

- Documento corto de alcance.
- Inventario de APIs.
- Matriz de estados de datos y fallbacks.[^1]


### Etapa 1

Hacé un refactor sin cambiar todavía el producto visible: extraé CSS, JS y constantes del HTML monolítico actual.  Esta etapa busca estabilizar el código, quitar deuda técnica y dejar el sitio disponible mientras ordenás fuentes, dominio y render.[^1]

Cambios concretos:

- Separar estilos en archivos.
- Separar render, fetch y lógica de misión.
- Eliminar dependencia de `localStorage` para el tema.
- Crear componentes reutilizables para cards, badges y mensajes de estado.[^1]

Resultado:

- Misma web, pero con base mantenible.[^1]


### Etapa 2

Rediseñá la home mobile-first.  Hoy el dashboard intenta mostrar demasiadas cosas al mismo nivel; esta etapa debe concentrarse en jerarquía, lectura rápida y accesibilidad.[^1]

Objetivos:

- Un hero técnico-didáctico.
- 4 KPIs máximos.
- Estado de misión y próximo evento.
- Badge claro de “dato en vivo” o “simulación pedagógica”.
- Tipografía mínima de 14px y cuerpo de 16px.[^1]

Resultado:

- Una home clara en móvil y más elegante en desktop.[^1]


### Etapa 3

Convertí el sitio en mini web con navegación por secciones o routing simple por hash.  Esto permite que el producto siga online, pero ya no dependa de un único scroll saturado y mejora mucho la comprensión del usuario.[^1]

Objetivos:

- `#inicio`
- `#mision`
- `#trayectoria`
- `#entorno`
- `#fuentes`[^1]

Resultado:

- Mejor organización conceptual sin romper el despliegue estático.[^1]


### Etapa 4

Implementá el sistema formal de calidad del dato.  Esta es una etapa central para rigor científico y para tu objetivo educativo.[^1]

Cada tarjeta debe mostrar:

- Fuente.
- Última actualización.
- Tipo de dato: real, derivado, proyectado, simulado.
- Explicación del cálculo si no es directo de API.[^1]

Ejemplo de copy:

- “Distancia a la Luna — derivada a partir de efemérides y geometría simplificada; última actualización 05/04/2026 17:20 UTC-3”.[^1]


### Etapa 5

Rehacé las visualizaciones más importantes con foco didáctico.  La trayectoria SVG actual ya sugiere una historia visual, pero debe pasar de “panel llamativo” a “modelo explicativo con hitos, leyenda, escala conceptual y estados”.[^1]

Prioridad:

- Trayectoria principal.
- Timeline de misión.
- Visual de retardo de señal.
- DSN con explicación de cobertura y estaciones.
- Clima solar con significado pedagógico, no solo números.[^1]

Resultado:

- Menos visualización ornamental, más visualización interpretativa.[^1]


### Etapa 6

Mejorá accesibilidad, rendimiento y estados límite.  En el código actual ya aparecen textos pequeños, tooltips por hover y mensajes de carga/error muy básicos; esta etapa los convierte en experiencia madura.[^1]

Checklist:

- Navegación por teclado.
- Tooltips reemplazados por expandibles o paneles táctiles.
- Skeleton loaders.
- Estados vacíos y errores por sección.
- Contraste AA.
- Preferencia de movimiento reducido.
- Optimización de refresco y polling.[^1]

Resultado:

- Producto usable para más gente y más robusto en producción.[^1]


### Etapa 7

Agregá capa editorial y pedagógica.  Esta fase te diferencia de un dashboard técnico común y lo vuelve realmente educativo para entusiastas y estudiantes.[^1]

Incluir:

- Glosario contextual.
- “¿Qué significa este dato?”
- “Cómo se calcula”.
- “Qué fuente lo respalda”.
- Mini cápsulas de ciencia: órbita libre retorno, DSN, retardo luz, viento solar.[^1]

Resultado:

- La web enseña, no solo informa.[^1]


### Etapa 8

Instrumentá observación y mejora continua.  Una vez que tengas una versión modular y estable, empezá a medir qué se entiende y qué no.[^1]

Podés evaluar:

- Qué secciones visita más la gente.
- Dónde abandonan.
- Qué conceptos generan más confusión.
- Qué tarjetas necesitan mejor explicación.


## Metodología de trabajo

Te propongo trabajar en sprints cortos de 1 o 2 semanas, con una regla simple: cada sprint debe dejar una versión desplegable, aunque sea pequeña.  Como querés aprender en el proceso, cada sprint debería cerrar con tres artefactos: una mejora visible, una pequeña decisión documentada y una reflexión técnica de lo aprendido.

Plantilla de sprint:

- Objetivo del sprint.
- Problema actual.
- Hipótesis de mejora.
- Tareas técnicas.
- Criterios de aceptación.
- Demo pública.
- Bitácora de aprendizaje.

Ejemplo:

- Sprint 1: extraer CSS/JS del HTML y crear sistema de estados de dato.[^1]
- Sprint 2: rediseñar home mobile-first.[^1]
- Sprint 3: crear navegación multi-sección.[^1]
- Sprint 4: rehacer trayectoria y timeline.[^1]


## Buenas prácticas para aprender

Como tu objetivo también es formarte en diseño web, no intentes rediseñar todo de una sola vez.  Lo ideal es que cada etapa te obligue a practicar una capacidad concreta: arquitectura frontend, diseño responsive, accesibilidad, visualización, manejo de datos externos o escritura UX.[^1]

Te recomiendo documentar cada incremento con esta estructura:

- Qué problema resolví.
- Qué principio de UX/UI apliqué.
- Qué deuda técnica quedó.
- Qué aprendí de HTML/CSS/JS en esta iteración.

También conviene que mantengas un archivo tipo `decisiones-arquitectura.md`, donde anotes por qué elegiste cierta visualización, cierto sistema de fallback o cierto patrón responsive.  Eso acelera tu aprendizaje y evita que el proyecto crezca de forma caótica.

## Primer backlog sugerido

| Prioridad | Ítem | Valor |
| :-- | :-- | :-- |
| Alta | Separar HTML/CSS/JS del archivo actual | Reduce deuda técnica y facilita evolución. [^1] |
| Alta | Crear modelo unificado de dato con `status/source/updatedAt` | Mejora rigor científico y transparencia. [^1] |
| Alta | Rediseñar home mobile-first | Mejora comprensión y usabilidad inicial. [^1] |
| Alta | Reemplazar `localStorage` del tema | Evita fallos en entornos restringidos. [^1] |
| Media | Implementar navegación por secciones | Convierte dashboard en mini web educativa. [^1] |
| Media | Rehacer trayectoria y fases con narrativa visual | Mejora comprensión de la misión. [^1] |
| Media | Crear glosario y explicaciones contextuales | Refuerza valor didáctico. [^1] |
| Media | Estados de carga/error/sin datos por módulo | Hace el sistema más confiable. [^1] |
| Baja | Ajustar paleta y sistema visual más sobrio | Mejora percepción de rigor. [^1] |
| Baja | Analítica básica de uso | Permite mejorar con evidencia. |

Mi recomendación concreta de arranque es: **Etapa 0 + Etapa 1 + Etapa 2** como primer bloque de trabajo, porque ahí resolvés rigor de datos, base técnica y experiencia inicial sin dejar de publicar una versión funcional.  Después de eso, ya tiene mucho sentido pasar a mini web por secciones y a una visualización más limpia.[^1]

¿Querés que en el próximo paso te proponga un **mapa de navegación + wireframe textual de la mini web** y además una **estructura real de archivos HTML/CSS/JS** para comenzar la refactorización?

<div align="center">⁂</div>

[^1]: paste.txt

