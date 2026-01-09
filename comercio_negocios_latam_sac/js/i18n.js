// Sistema de internacionalización (i18n)
class I18n {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.translations = {};
    this.init();
  }

  // Detectar idioma del navegador o localStorage
  detectLanguage() {
    // 1. Verificar localStorage (preferencia guardada)
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
      return savedLang;
    }

    // 2. Detectar idioma del navegador
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Si es español (es, es-ES, es-MX, etc.) -> 'es'
    if (browserLang.startsWith('es')) {
      return 'es';
    }
    
    // Si es inglés (en, en-US, en-GB, etc.) -> 'en'
    if (browserLang.startsWith('en')) {
      return 'en';
    }
    
    // Por defecto español
    return 'es';
  }

  // Inicializar
  async init() {
    await this.loadTranslations();
    this.translatePage();
    this.setupLanguageSelector();
  }

  // Cargar traducciones
  async loadTranslations() {
    try {
      const response = await fetch(`../js/translations/${this.currentLang}.json`);
      this.translations = await response.json();
    } catch (error) {
      console.error('Error cargando traducciones:', error);
      // Fallback a español si falla
      if (this.currentLang !== 'es') {
        this.currentLang = 'es';
        await this.loadTranslations();
      }
    }
  }

  // Traducir página
  translatePage() {
    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      
      if (translation) {
        // Si tiene placeholder, traducirlo
        if (element.placeholder !== undefined) {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Actualizar atributos alt, title, aria-label
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
      const key = element.getAttribute('data-i18n-alt');
      const translation = this.getTranslation(key);
      if (translation) element.alt = translation;
    });

    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      const translation = this.getTranslation(key);
      if (translation) element.title = translation;
    });
  }

  // Obtener traducción por clave (soporta claves anidadas como "header.menu.home")
  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Retornar clave si no encuentra traducción
      }
    }
    
    return value;
  }

  // Cambiar idioma
  async changeLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('preferred-language', lang);
    await this.loadTranslations();
    this.translatePage();
    this.updateLanguageSelector();
  }

  // Configurar selector de idioma
  setupLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (!selector) return;

    // Establecer idioma actual
    selector.value = this.currentLang;

    // Listener para cambio de idioma
    selector.addEventListener('change', (e) => {
      this.changeLanguage(e.target.value);
    });
  }

  // Actualizar selector visual
  updateLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.value = this.currentLang;
    }
  }
}

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
});
