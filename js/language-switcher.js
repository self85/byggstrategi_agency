// Get user's preferred language from localStorage or browser
function getBrowserLanguage() {
    return navigator.language.split('-')[0] || 'sv';
}

// Get the stored language preference or use browser language
function getCurrentLanguage() {
    return localStorage.getItem('preferredLanguage') || getBrowserLanguage();
}

document.addEventListener('DOMContentLoaded', () => {
    // Alltid använd svenska som standard om ingen preferens är satt
    const currentLang = localStorage.getItem('preferredLanguage') || 'sv';
    
    setLanguage(currentLang);
    updateCurrentFlag(currentLang);
    
    // Uppdatera den aktiva flaggan i menyn
    document.querySelectorAll('.flag-item').forEach(f => {
        f.classList.remove('active');
        if (f.dataset.lang === currentLang) {
            f.classList.add('active');
        }
    });
    
    document.querySelectorAll('.flag-item').forEach(flag => {
        flag.addEventListener('click', () => {
            const lang = flag.dataset.lang;
            setLanguage(lang);
            updateCurrentFlag(lang);
            
            document.querySelectorAll('.flag-item').forEach(f => f.classList.remove('active'));
            flag.classList.add('active');
        });
    });
});

function updateCurrentFlag(lang) {
    const currentFlag = document.getElementById('currentFlag');
    const flagMap = {
        'en': 'gb',
        'es': 'es',
        'sv': 'se'
    };
    currentFlag.src = `https://flagcdn.com/w40/${flagMap[lang]}.png`;
}

function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translations[lang][key];
            } else if (element.tagName === 'A' && element.hasAttribute('href')) {
                // För länkar, uppdatera bara texten, inte href-attributet
                element.innerHTML = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    document.documentElement.lang = lang;
}