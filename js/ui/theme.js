/**
 * theme.js
 * 
 * Gestión del tema oscuro/claro.
 * Persiste la preferencia del usuario en localStorage.
 * 
 * @module theme
 */

// Dark / Light mode toggle
export function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeText) themeText.innerHTML = 'Modo Oscuro';
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span id="themeText">Modo Oscuro</span>';
    } else {
        document.body.classList.remove('light-theme');
        if (themeText) themeText.innerHTML = 'Modo Claro';
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-sun"></i> <span id="themeText">Modo Claro</span>';
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            const newTheme = isLight ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            
            if (isLight) {
                toggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span id="themeText">Modo Oscuro</span>';
            } else {
                toggleBtn.innerHTML = '<i class="fas fa-sun"></i> <span id="themeText">Modo Claro</span>';
            }
        });
    }
}