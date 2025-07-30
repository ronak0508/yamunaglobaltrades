// Google Translate Language Switcher
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'en';
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Load saved language from localStorage
        this.loadSavedLanguage();
        
        // Initialize Google Translate
        this.initGoogleTranslate();
        
        // Hide Google Translate banner on load
        this.hideGoogleBanner();
        
        // Listen for language changes
        this.listenForLanguageChanges();
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang && savedLang !== 'en') {
            this.currentLanguage = savedLang;
        } else {
            // Auto-detect browser language
            const browserLang = navigator.language || navigator.userLanguage;
            const shortLang = browserLang.split('-')[0];
            
            // Check if browser language is supported
            const supportedLanguages = ['hi', 'gu', 'ta', 'te', 'kn', 'ml', 'pa', 'bn', 'mr', 'ur', 'ar', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'pt', 'it', 'ru'];
            if (supportedLanguages.includes(shortLang)) {
                this.currentLanguage = shortLang;
            }
        }
    }

    initGoogleTranslate() {
        // Check if Google Translate is already loaded
        if (window.google && window.google.translate) {
            this.createTranslateElement();
        } else {
            // Load Google Translate API
            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.onerror = () => {
                console.warn('Google Translate failed to load');
                this.hideSwitcher();
            };
            document.head.appendChild(script);
            
            // Define the callback function
            window.googleTranslateElementInit = () => {
                this.createTranslateElement();
            };
        }
    }

    createTranslateElement() {
        if (this.isInitialized) return;
        
        try {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'hi,gu,ta,te,kn,ml,pa,bn,mr,ur,ar,zh,ja,ko,fr,de,es,pt,it,ru,th,vi,id,ms,tr,pl,cs,sk,hu,ro,bg,hr,sl,et,lv,lt,fi,sv,da,no,nl,el,he,fa,tr,uk,be,ka,hy,az,kk,ky,uz,tk,tm,mn,ne,si,my,km,lo,bo,dv,ti,am,or,as,ml,kn,ta,te,gu,pa,hi,bn,mr,ne,ur,fa,ps,sd,ku,ar,he,yi,lad,arc,syc',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
                multilanguagePage: true
            }, 'google_translate_element');
            
            this.isInitialized = true;
            
            // Apply saved language after initialization
            setTimeout(() => {
                this.applySavedLanguage();
            }, 1000);
            
        } catch (error) {
            console.error('Error initializing Google Translate:', error);
            this.hideSwitcher();
        }
    }

    applySavedLanguage() {
        if (this.currentLanguage !== 'en') {
            const select = document.querySelector('#google_translate_element select');
            if (select) {
                select.value = this.currentLanguage;
                select.dispatchEvent(new Event('change'));
            }
        }
    }

    hideGoogleBanner() {
        // Hide Google Translate banner
        const hideBanner = () => {
            const banner = document.querySelector('.goog-te-banner-frame');
            if (banner) {
                banner.style.display = 'none';
            }
            
            // Remove Google Translate attribution
            const attribution = document.querySelector('.goog-te-gadget');
            if (attribution) {
                const text = attribution.textContent;
                if (text.includes('Google Translate')) {
                    attribution.innerHTML = attribution.innerHTML.replace(/Google Translate/g, '');
                }
            }
        };

        // Run immediately and also on DOM changes
        hideBanner();
        
        // Use MutationObserver to catch dynamically added elements
        const observer = new MutationObserver(hideBanner);
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Also run periodically for the first few seconds
        let attempts = 0;
        const interval = setInterval(() => {
            hideBanner();
            attempts++;
            if (attempts > 10) clearInterval(interval);
        }, 500);
    }

    listenForLanguageChanges() {
        // Listen for changes in the Google Translate select element
        document.addEventListener('change', (e) => {
            if (e.target.closest('#google_translate_element')) {
                const select = e.target;
                if (select.tagName === 'SELECT') {
                    const newLang = select.value;
                    this.saveLanguage(newLang);
                }
            }
        });

        // Also listen for Google Translate iframe messages
        window.addEventListener('message', (e) => {
            if (e.data && typeof e.data === 'string' && e.data.includes('translate')) {
                // Extract language from Google Translate message
                const langMatch = e.data.match(/lang=([a-z]{2})/);
                if (langMatch) {
                    this.saveLanguage(langMatch[1]);
                }
            }
        });
    }

    saveLanguage(language) {
        if (language && language !== this.currentLanguage) {
            this.currentLanguage = language;
            localStorage.setItem('selectedLanguage', language);
            
            // Trigger custom event for other parts of the app
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: language }
            }));
        }
    }

    hideSwitcher() {
        const switcher = document.querySelector('.translate-container');
        if (switcher) {
            switcher.style.display = 'none';
        }
    }

    // Public method to get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Public method to change language programmatically
    changeLanguage(language) {
        const select = document.querySelector('#google_translate_element select');
        if (select) {
            select.value = language;
            select.dispatchEvent(new Event('change'));
        }
    }
}

// Initialize the language switcher when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitcher;
} 