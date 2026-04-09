/**
 * Servicio de noticias de la misión
 * @module data/news
 */

export async function fetchNews() {
    console.log("Intentando cargar noticias..."); // <-- Añade esto para debuguear
    const newsDiv = document.getElementById('missionNews');
    
    if (!newsDiv) {
        console.error("No se encontró el elemento #missionNews");
        return;
    }

    try {
        const news = [
            { date: '2026-04-09', text: 'Sistemas de soporte vital en Orion reportan estado óptimo.' },
            { date: '2026-04-08', text: 'Pruebas de acoplamiento simuladas completadas con éxito.' },
            { date: '2026-04-07', text: 'Tripulación de Artemis II finaliza entrenamiento de emergencia.' }
        ];

        newsDiv.innerHTML = news.map(item => `
            <div class="news-item" style="margin-bottom: 10px; border-left: 2px solid #0088FF; padding-left: 10px;">
                <small style="color: #888;">${item.date}</small>
                <p style="margin: 0;">${item.text}</p>
            </div>
        `).join('');
        console.log("Noticias cargadas con éxito");
    } catch (e) {
        newsDiv.innerHTML = '<p>No se pudieron cargar las noticias.</p>';
    }
}