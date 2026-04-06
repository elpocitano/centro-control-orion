# Registro de Decisiones de Arquitectura (ADR)

## ADR 01: Separación por Responsabilidades
- **Fecha:** 2024-XX-XX
- **Estatus:** Aceptado
- **Contexto:** El proyecto original era un archivo monolítico de +2000 líneas.
- **Decisión:** Dividir el proyecto en carpetas especializadas (`css`, `js/data`, `js/domain`, `js/ui`).
- **Consecuencia:** Mayor facilidad para encontrar errores y escalar el proyecto sin romper funciones existentes.

## ADR 02: Extracción de CSS a Hoja Externa
- **Fecha:** 2024-XX-XX
- **Estatus:** En curso
- **Decisión:** Mover el bloque `<style>` del HTML a `css/base.css`.
- **Razón:** Separar la estructura (HTML) de la presentación (CSS) para mejorar la mantenibilidad.