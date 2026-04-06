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
`structure`, `css`, `data`, `ui`, `mission`, `docs`.