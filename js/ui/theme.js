/**
 * Gestión del tema (Oscuro/Claro) del Dashboard
 * @module ui/theme
 */

export function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Aplicar tema guardado al iniciar
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span id="themeText">Modo Oscuro</span>';
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            const newTheme = isLight ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            
            toggleBtn.innerHTML = isLight 
                ? '<i class="fas fa-moon"></i> <span id="themeText">Modo Oscuro</span>' 
                : '<i class="fas fa-sun"></i> <span id="themeText">Modo Claro</span>';
        });
    }
}