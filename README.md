# Centro de Control Orion

![Dashboard Screenshot](https://elpocitano.github.io/centro-control-orion/)

Dashboard en tiempo real para la misión **Artemis II** de la NASA. Monitorea la posición de la cápsula Orion, el clima solar, el estado de la Red de Espacio Profundo (DSN) y las últimas noticias de la misión.

## 🚀 Características

| Característica | Descripción |
|----------------|-------------|
| **Telemetría de Orion** | Distancia a la Tierra y a la Luna, velocidad radial y retardo de señal |
| **Clima solar** | Datos en tiempo real de NOAA SWPC (viento solar, temperatura, densidad) |
| **Red DSN** | Información de las 3 estaciones de la Red de Espacio Profundo de la NASA |
| **Noticias** | Feed filtrado de Artemis II desde SpaceNews |
| **Fases de la misión** | Reloj circular interactivo con las 10 fases o etapas de la misión |
| **Trayectoria** | Visualización SVG de la posición de Orion entre la Tierra y la Luna |
| **Hora local** | Reloj con zona horaria del usuario |

## 📡 Fuentes de datos

| Fuente | Datos | Estado |
|--------|-------|--------|
| [NASA JPL Horizons](https://ssd.jpl.nasa.gov/horizons/) | Posición/velocidad de Orion | Simulación científica |
| [NOAA SWPC](https://services.swpc.noaa.gov/products/solar-wind/plasma-1-day.json) | Viento solar, temperatura, densidad | ✅ En vivo |
| [SpaceNews RSS](https://spacenews.com/feed/) | Noticias de Artemis II | ✅ En vivo |
| [NASA DSN](https://eyes.nasa.gov/apps/dsn-now/) | Configuración de antenas | Datos fijos oficiales |

## 🛠️ Tecnologías utilizadas

- HTML5 / CSS3 (Glassmorphism, Gradientes espaciales)
- JavaScript (ES6+)
- [Chart.js](https://www.chart.js/) - Gráficos en vivo
- [FontAwesome](https://fontawesome.com/) - Iconos
- [GitHub Pages](https://pages.github.com/) - Hosting gratuito

## 📸 Captura de pantalla

![Dashboard Preview](https://elpocitano.github.io/centro-control-orion/)

## 🎯 Estado del dashboard

| Métrica | Valor |
|---------|-------|
| Tamaño | ~25 KB |
| APIs simultáneas | 3-4 |
| Actualización telemetría | 30 segundos |
| Actualización clima solar | 5 minutos |
| Actualización noticias | 10 minutos |
| Diseño | 100% responsive |

## 👤 Autor

**elpocitano@gmail.com**

## 📄 Licencia

MIT

## 🙏 Créditos

- **Ryan Fox** - Inspiración en el uso de JPL Horizons ([artemis-ii-cli](https://github.com/ryanfoxeth/artemis-ii-cli), MIT License)
- **NASA** - Datos públicos y APIs
- **NOAA** - Clima solar en tiempo real
- **SpaceNews** - Noticias sobre el espacio

## 🔗 Enlaces

- [Dashboard en vivo](https://elpocitano.github.io/centro-control-orion/)
- [Repositorio GitHub](https://github.com/elpocitano/centro-control-orion)

---

*Desarrollado durante la misión Artemis II - Abril 2026*