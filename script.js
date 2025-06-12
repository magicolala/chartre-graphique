// Script principal pour la charte graphique AK-Solutions
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialisation des composants
    initializeNavigation();
    initializeColorCopy();
    initializeAnimations();
    initializeTooltips();
    initializeScrollEffects();
    initializeResponsiveDemo();
    
    console.log('🎨 Charte graphique AK-Solutions initialisée');
});

// Navigation fluide
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Fermer le menu mobile si ouvert
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
    
    // Mise en surbrillance du lien actif
    window.addEventListener('scroll', updateActiveNavLink);
}

// Mise à jour du lien de navigation actif
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Copie des codes couleur
function initializeColorCopy() {
    const colorCards = document.querySelectorAll('.color-card');
    
    colorCards.forEach(card => {
        card.addEventListener('click', function() {
            const colorCode = this.querySelector('code');
            if (colorCode) {
                const text = colorCode.textContent;
                
                // Copier dans le presse-papiers
                navigator.clipboard.writeText(text).then(() => {
                    showToast('Code couleur copié !', `${text} copié dans le presse-papiers`);
                    
                    // Animation de feedback
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                }).catch(err => {
                    console.error('Erreur lors de la copie:', err);
                    showToast('Erreur', 'Impossible de copier le code couleur', 'error');
                });
            }
        });
        
        // Ajouter un curseur pointer pour indiquer la cliquabilité
        card.style.cursor = 'pointer';
        card.title = 'Cliquer pour copier le code couleur';
    });
}

// Affichage des toasts
function showToast(title, message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        console.warn('Container de toast non trouvé');
        return;
    }
    
    const toastId = 'toast-' + Date.now();
    const iconClass = type === 'success' ? 'bi-check-circle text-success' : 'bi-exclamation-triangle text-warning';
    
    const toastHTML = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi ${iconClass} me-2"></i>
                <strong class="me-auto">${title}</strong>
                <small class="text-muted">maintenant</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Fermer"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 3000
    });
    
    toast.show();
    
    // Nettoyer le DOM après fermeture
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// Animations d'apparition
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Ajouter une classe d'animation basée sur la position
                if (element.classList.contains('color-card')) {
                    element.style.animationDelay = Math.random() * 0.5 + 's';
                    element.classList.add('animate-bounce-in');
                } else if (element.classList.contains('service-card')) {
                    element.classList.add('animate-slide-left');
                } else {
                    element.classList.add('animate-fade-in');
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observer les éléments animables
    const animatableElements = document.querySelectorAll('.color-card, .service-card, .breakpoint-card');
    animatableElements.forEach(el => observer.observe(el));
}

// Tooltips Bootstrap
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Effets de scroll
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.scrollY;
        const navbar = document.querySelector('.navbar-custom');
        
        // Effet de transparence sur la navbar
        if (scrolled > 50) {
            navbar.style.backgroundColor = 'rgba(0, 127, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-blue)';
            navbar.style.backdropFilter = 'none';
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Démonstration responsive
function initializeResponsiveDemo() {
    const breakpointCards = document.querySelectorAll('.breakpoint-card');
    
    function updateBreakpointHighlight() {
        const width = window.innerWidth;
        
        breakpointCards.forEach((card, index) => {
            card.classList.remove('active-breakpoint');
            
            if ((width < 576 && index === 0) ||
                (width >= 576 && width < 768 && index === 0) ||
                (width >= 768 && width < 992 && index === 1) ||
                (width >= 992 && width < 1200 && index === 2) ||
                (width >= 1200 && index === 3)) {
                card.classList.add('active-breakpoint');
                card.style.borderColor = 'var(--secondary-orange)';
                card.style.transform = 'scale(1.02)';
            } else {
                card.style.borderColor = '';
                card.style.transform = '';
            }
        });
    }
    
    // Mise à jour initiale et sur redimensionnement
    updateBreakpointHighlight();
    window.addEventListener('resize', debounce(updateBreakpointHighlight, 250));
}

// Fonction utilitaire de debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonctions pour les boutons du footer
function downloadPDF() {
    showToast('Téléchargement', 'Génération du PDF en cours...', 'info');
    
    // Simulation du téléchargement
    setTimeout(() => {
        // En production, ici on générerait vraiment un PDF
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'charte-graphique-ak-solutions.pdf';
        
        showToast('Succès', 'PDF généré avec succès !');
    }, 2000);
}

function shareCharte() {
    if (navigator.share) {
        navigator.share({
            title: 'Charte Graphique AK-Solutions',
            text: 'Découvrez notre charte graphique officielle',
            url: window.location.href
        }).then(() => {
            showToast('Partagé', 'Charte partagée avec succès !');
        }).catch(err => {
            console.log('Erreur de partage:', err);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // Copier l'URL dans le presse-papiers
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Lien copié', 'URL copiée dans le presse-papiers');
    }).catch(() => {
        showToast('Erreur', 'Impossible de copier le lien', 'error');
    });
}

// Gestion des formulaires (si présents)
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
            
            if (isValid) {
                showToast('Succès', 'Formulaire envoyé avec succès !');
                form.reset();
                inputs.forEach(input => {
                    input.classList.remove('is-valid');
                });
            } else {
                showToast('Erreur', 'Veuillez remplir tous les champs requis', 'error');
            }
        });
    });
}

// Gestion du mode sombre (optionnel)
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // Vérifier la préférence sauvegardée
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
        
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    showToast('Erreur', 'Une erreur inattendue s\'est produite', 'error');
});

// Performance monitoring
function initializePerformanceMonitoring() {
    // Mesurer le temps de chargement
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`⚡ Page chargée en ${Math.round(loadTime)}ms`);
        
        // Envoyer les métriques en production
        if (loadTime > 3000) {
            console.warn('⚠️ Temps de chargement élevé détecté');
        }
    });
    
    // Observer les changements de layout
    if ('LayoutShift' in window) {
        let clsValue = 0;
        let clsEntries = [];
        
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    clsEntries.push(entry);
                }
            }
        });
        
        observer.observe({ type: 'layout-shift', buffered: true });
    }
}

// Utilitaires pour les développeurs
const AKSolutions = {
    // Palette de couleurs
    colors: {
        primary: '#007FFF',
        primaryDark: '#0059B2',
        primaryVeryDark: '#003366',
        primaryLight: '#CCE5FF',
        secondary: '#FF8C00',
        secondaryDark: '#D97700',
        secondaryLight: '#FFE0B2'
    },
    
    // Fonctions utilitaires
    utils: {
        showToast: showToast,
        debounce: debounce,
        
        // Générer une couleur aléatoire de la palette
        getRandomColor() {
            const colorKeys = Object.keys(this.colors);
            const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
            return this.colors[randomKey];
        },
        
        // Vérifier si une couleur est sombre
        isColorDark(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness < 128;
        },
        
        // Convertir hex en rgba
        hexToRgba(hex, alpha = 1) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
    },
    
    // Informations sur la charte
    info: {
        version: '1.0.0',
        lastUpdate: '2024',
        author: 'AK-Solutions'
    }
};

// Exposer l'objet AKSolutions globalement pour les développeurs
window.AKSolutions = AKSolutions;

// Initialisation des fonctionnalités optionnelles
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
    initializeDarkMode();
    initializePerformanceMonitoring();
});

// Messages de console pour les développeurs
console.log(`
🎨 Charte Graphique AK-Solutions v${AKSolutions.info.version}
📚 Documentation: Consultez les sections de cette page
🛠️ Utilitaires: window.AKSolutions.utils
🎯 Support: contact@ak-solutions.com

Couleurs principales:
• Bleu primaire: ${AKSolutions.colors.primary}
• Orange secondaire: ${AKSolutions.colors.secondary}
`);

// Service Worker pour la mise en cache (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ Service Worker enregistré');
            })
            .catch(function(error) {
                console.log('❌ Échec d\'enregistrement du Service Worker');
            });
    });
}

// Gestion des raccourcis clavier
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K pour ouvrir l'aide
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const helpModal = new bootstrap.Modal(document.getElementById('helpModal'));
        helpModal.show();
    }
    
    // Échap pour fermer les modales
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        });
    }
    
    // Flèches pour naviguer entre les sections
    if (e.altKey) {
        const sections = document.querySelectorAll('section[id]');
        const currentSection = getCurrentSection();
        const currentIndex = Array.from(sections).findIndex(s => s.id === currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            scrollToSection(sections[currentIndex + 1].id);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            scrollToSection(sections[currentIndex - 1].id);
        }
    }
});

// Obtenir la section actuellement visible
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    return currentSection;
}

// Faire défiler vers une section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Gestion de la recherche dans la page
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                clearSearchHighlights();
                return;
            }
            
            performSearch(query);
        }, 300);
    });
}

// Effectuer la recherche
function performSearch(query) {
    clearSearchHighlights();
    
    const searchableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td');
    let matchCount = 0;
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query)) {
            highlightText(element, query);
            matchCount++;
        }
    });
    
    showToast('Recherche', `${matchCount} résultat(s) trouvé(s) pour "${query}"`);
}

// Surligner le texte trouvé
function highlightText(element, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    const originalHTML = element.innerHTML;
    
    if (!element.dataset.originalHTML) {
        element.dataset.originalHTML = originalHTML;
    }
    
    element.innerHTML = originalHTML.replace(regex, '<mark class="search-highlight">$1</mark>');
    element.classList.add('search-result');
}

// Effacer les surlignages de recherche
function clearSearchHighlights() {
    const highlightedElements = document.querySelectorAll('.search-result');
    
    highlightedElements.forEach(element => {
        if (element.dataset.originalHTML) {
            element.innerHTML = element.dataset.originalHTML;
            delete element.dataset.originalHTML;
        }
        element.classList.remove('search-result');
    });
    
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// Gestion des favoris/bookmarks
function initializeBookmarks() {
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    const savedBookmarks = JSON.parse(localStorage.getItem('ak-bookmarks') || '[]');
    
    // Restaurer les favoris sauvegardés
    savedBookmarks.forEach(sectionId => {
        const button = document.querySelector(`[data-bookmark="${sectionId}"]`);
        if (button) {
            button.classList.add('bookmarked');
            button.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
        }
    });
    
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.dataset.bookmark;
            toggleBookmark(sectionId, this);
        });
    });
}

// Basculer un favori
function toggleBookmark(sectionId, button) {
    let bookmarks = JSON.parse(localStorage.getItem('ak-bookmarks') || '[]');
    
    if (bookmarks.includes(sectionId)) {
        bookmarks = bookmarks.filter(id => id !== sectionId);
        button.classList.remove('bookmarked');
        button.innerHTML = '<i class="bi bi-bookmark"></i>';
        showToast('Favori retiré', 'Section retirée des favoris');
    } else {
        bookmarks.push(sectionId);
        button.classList.add('bookmarked');
        button.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
        showToast('Favori ajouté', 'Section ajoutée aux favoris');
    }
    
    localStorage.setItem('ak-bookmarks', JSON.stringify(bookmarks));
}

// Système de notation/feedback
function initializeFeedback() {
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.feedback;
            const section = this.closest('section').id;
            
            submitFeedback(section, type);
        });
    });
}

// Soumettre un feedback
function submitFeedback(section, type) {
    // En production, envoyer à un service d'analytics
    const feedback = {
        section: section,
        type: type,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    console.log('Feedback soumis:', feedback);
    
    const message = type === 'helpful' ? 'Merci pour votre retour positif !' : 'Merci, nous prendrons en compte votre retour';
    showToast('Feedback enregistré', message);
    
    // Sauvegarder localement pour éviter les doublons
    const feedbackKey = `feedback-${section}-${type}`;
    localStorage.setItem(feedbackKey, 'true');
    
    // Désactiver le bouton
    const button = document.querySelector(`[data-feedback="${type}"]`);
    if (button) {
        button.disabled = true;
        button.classList.add('opacity-50');
    }
}

// Système de progression de lecture
function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(0, 127, 255, 0.1);
            z-index: 9999;
        }
        .reading-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-blue), var(--secondary-orange));
            width: 0%;
            transition: width 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.reading-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBarFill.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Détection de la vitesse de connexion
function initializeConnectionAwareness() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        function updateForConnection() {
            const effectiveType = connection.effectiveType;
            
            if (effectiveType === 'slow-2g' || effectiveType === '2g') {
                // Réduire les animations et effets pour les connexions lentes
                document.body.classList.add('reduced-motion');
                console.log('🐌 Connexion lente détectée - Animations réduites');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        }
        
        updateForConnection();
        connection.addEventListener('change', updateForConnection);
    }
}

// Gestion des erreurs d'images
function initializeImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Remplacer par une image de placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
            this.alt = 'Image non disponible';
            console.warn('Erreur de chargement d\'image:', this.dataset.originalSrc || 'URL inconnue');
        });
        
        // Sauvegarder l'URL originale
        if (img.src) {
            img.dataset.originalSrc = img.src;
        }
    });
}

// Analytics et métriques (version simplifiée)
function initializeAnalytics() {
    const analytics = {
        pageViews: 0,
        timeOnPage: Date.now(),
        interactions: 0,
        
        track(event, data = {}) {
            const eventData = {
                event: event,
                timestamp: new Date().toISOString(),
                page: window.location.pathname,
                ...data
            };
            
            console.log('📊 Analytics:', eventData);
            
            // En production, envoyer à votre service d'analytics
            // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(eventData) });
        },
        
        trackInteraction(element, action) {
            this.interactions++;
            this.track('interaction', {
                element: element.tagName.toLowerCase(),
                action: action,
                text: element.textContent?.substring(0, 50) || '',
                totalInteractions: this.interactions
            });
        }
    };
    
    // Tracker les clics sur les éléments importants
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, .btn, .nav-link, .color-card')) {
            analytics.trackInteraction(e.target, 'click');
        }
    });
    
    // Tracker le temps passé sur la page
    window.addEventListener('beforeunload', function() {
        const timeSpent = Date.now() - analytics.timeOnPage;
        analytics.track('page_exit', {
            timeSpent: Math.round(timeSpent / 1000),
            interactions: analytics.interactions
        });
    });
    
    // Tracker les vues de page
    analytics.track('page_view');
    
    // Exposer pour usage externe
    window.AKSolutions.analytics = analytics;
}

// Initialisation de toutes les fonctionnalités avancées
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeBookmarks();
    initializeFeedback();
    initializeReadingProgress();
    initializeConnectionAwareness();
    initializeImageErrorHandling();
    initializeAnalytics();
    
    console.log('🚀 Toutes les fonctionnalités avancées initialisées');
});

// Export des fonctions pour usage externe
window.AKSolutions.functions = {
    showToast,
    scrollToSection,
    getCurrentSection,
    performSearch,
    clearSearchHighlights,
    toggleBookmark,
    submitFeedback
};

// Version et informations de debug
console.log(`
🔧 Mode Debug AK-Solutions
Version: ${AKSolutions.info.version}
Fonctionnalités chargées: ✅
Performance: ${performance.now().toFixed(2)}ms
Navigateur: ${navigator.userAgent.split(' ').pop()}
Résolution: ${screen.width}x${screen.height}
Viewport: ${window.innerWidth}x${window.innerHeight}
`);


