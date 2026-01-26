/**
 * VIJALES - SVG ANIMATIONS
 * Animações iniciais para todos os SVGs do site
 * Estilo TRON com efeito de materialização digital
 */

class VijalesSVGAnimator {
    constructor() {
        this.duration = 2000; // Duração em ms
        this.initialized = false;
    }

    /**
     * Inicializa todas as animações SVG
     */
    init() {
        if (this.initialized) return;

        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startAnimations());
        } else {
            this.startAnimations();
        }

        this.initialized = true;
    }

    /**
     * Inicia todas as animações
     */
    startAnimations() {
        // Animar logo principal do hero
        this.animateHeroLogo();

        // Animar logo do menu
        this.animateNavLogo();

        // Animar ícones dos cards de features
        this.animateFeatureIcons();

        // Animar V do header de portfolio
        this.animatePortfolioHeader();

        // Animar V's nos cards de portfolio
        this.animatePortfolioCards();

        // Animar V's flutuantes
        this.animateFloatingVs();

        // Animar geometrias flutuantes
        this.animateFloatingGeometry();

        // Animar logo do footer
        this.animateFooterLogo();

        // Animar ícone de contato (se existir)
        this.animateContactIcon();
    }

    /**
     * Anima o logo principal do hero
     */
    animateHeroLogo() {
        const logo = document.querySelector('.tron-logo svg');
        if (!logo) return;

        const paths = logo.querySelectorAll('line, circle, rect, path');

        paths.forEach((element, index) => {
            // Configurar para animação de desenho
            if (element.tagName === 'line' || element.tagName === 'path') {
                const length = element.getTotalLength ? element.getTotalLength() : 100;
                element.style.strokeDasharray = length;
                element.style.strokeDashoffset = length;
                element.style.opacity = '0';

                // Animar com delay escalonado
                setTimeout(() => {
                    element.style.transition = `stroke-dashoffset ${this.duration * 0.8}ms ease-out, opacity ${this.duration * 0.5}ms ease-out`;
                    element.style.strokeDashoffset = '0';
                    element.style.opacity = '1';
                }, index * 150);
            } else if (element.tagName === 'circle') {
                element.style.opacity = '0';
                element.style.transform = 'scale(0)';
                element.style.transformOrigin = 'center';

                setTimeout(() => {
                    element.style.transition = `opacity ${this.duration * 0.6}ms ease-out, transform ${this.duration * 0.6}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                }, index * 150 + 300);
            } else if (element.tagName === 'rect') {
                element.style.opacity = '0';

                setTimeout(() => {
                    element.style.transition = `opacity ${this.duration * 0.5}ms ease-out`;
                    element.style.opacity = element.getAttribute('opacity') || '1';
                }, index * 150);
            }
        });

        // Efeito de brilho final
        setTimeout(() => {
            logo.style.filter = 'drop-shadow(0 0 60px rgba(255, 69, 0, 1))';
            setTimeout(() => {
                logo.style.transition = 'filter 800ms ease-out';
                logo.style.filter = 'drop-shadow(0 0 40px rgba(255, 69, 0, 0.9))';
            }, 200);
        }, paths.length * 150 + 500);
    }

    /**
     * Anima o logo do menu
     */
    animateNavLogo() {
        const navLogo = document.querySelector('.logo-v svg');
        if (!navLogo) return;

        const elements = navLogo.querySelectorAll('line, circle');

        elements.forEach((element, index) => {
            if (element.tagName === 'line') {
                const length = element.getTotalLength();
                element.style.strokeDasharray = length;
                element.style.strokeDashoffset = length;

                setTimeout(() => {
                    element.style.transition = `stroke-dashoffset 800ms ease-out`;
                    element.style.strokeDashoffset = '0';
                }, 500 + index * 100);
            } else if (element.tagName === 'circle') {
                element.style.opacity = '0';
                element.style.transform = 'scale(0)';
                element.style.transformOrigin = 'center';

                setTimeout(() => {
                    element.style.transition = `opacity 500ms ease-out, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                }, 900 + index * 80);
            }
        });
    }

    /**
     * Anima ícones dos cards de features
     */
    animateFeatureIcons() {
        const icons = document.querySelectorAll('.feature-icon svg');

        icons.forEach((icon, iconIndex) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const elements = icon.querySelectorAll('line, circle, rect, path, polygon');

                        elements.forEach((element, index) => {
                            element.style.opacity = '0';

                            if (element.tagName === 'line' || element.tagName === 'path') {
                                const length = element.getTotalLength ? element.getTotalLength() : 100;
                                element.style.strokeDasharray = length;
                                element.style.strokeDashoffset = length;

                                setTimeout(() => {
                                    element.style.transition = `stroke-dashoffset 1000ms ease-out, opacity 500ms ease-out`;
                                    element.style.strokeDashoffset = '0';
                                    element.style.opacity = '1';
                                }, index * 100);
                            } else {
                                element.style.transform = 'scale(0)';
                                element.style.transformOrigin = 'center';

                                setTimeout(() => {
                                    element.style.transition = `opacity 600ms ease-out, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
                                    element.style.opacity = '1';
                                    element.style.transform = 'scale(1)';
                                }, index * 100 + 200);
                            }
                        });

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(icon);
        });
    }

    /**
     * Anima V do header de portfolio
     */
    animatePortfolioHeader() {
        const portfolioIcon = document.querySelector('.v-icon svg, .contact-v-icon svg');
        if (!portfolioIcon) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elements = portfolioIcon.querySelectorAll('line, circle, path');

                    elements.forEach((element, index) => {
                        if (element.tagName === 'line') {
                            const length = element.getTotalLength();
                            element.style.strokeDasharray = length;
                            element.style.strokeDashoffset = length;

                            setTimeout(() => {
                                element.style.transition = `stroke-dashoffset 1200ms ease-out`;
                                element.style.strokeDashoffset = '0';
                            }, index * 120);
                        } else if (element.tagName === 'circle') {
                            const hasAnimation = element.querySelector('animate');
                            if (!hasAnimation) {
                                element.style.opacity = '0';
                                element.style.transform = 'scale(0)';
                                element.style.transformOrigin = 'center';

                                setTimeout(() => {
                                    element.style.transition = `opacity 600ms ease-out, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
                                    element.style.opacity = element.getAttribute('opacity') || '1';
                                    element.style.transform = 'scale(1)';
                                }, index * 120 + 300);
                            }
                        } else if (element.tagName === 'path') {
                            element.style.opacity = '0';
                            setTimeout(() => {
                                element.style.transition = `opacity 800ms ease-out`;
                                element.style.opacity = element.getAttribute('opacity') || '1';
                            }, index * 120);
                        }
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(portfolioIcon);
    }

    /**
     * Anima V's nos cards de portfolio
     */
    animatePortfolioCards() {
        const vPatterns = document.querySelectorAll('.v-pattern');

        vPatterns.forEach(pattern => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const elements = pattern.querySelectorAll('line, circle');

                        elements.forEach((element, index) => {
                            if (element.tagName === 'line') {
                                const length = element.getTotalLength();
                                element.style.strokeDasharray = length;
                                element.style.strokeDashoffset = length;

                                setTimeout(() => {
                                    element.style.transition = `stroke-dashoffset 1000ms ease-out`;
                                    element.style.strokeDashoffset = '0';
                                }, index * 100);
                            } else {
                                element.style.opacity = '0';
                                element.style.transform = 'scale(0)';
                                element.style.transformOrigin = 'center';

                                setTimeout(() => {
                                    element.style.transition = `opacity 500ms ease-out, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
                                    element.style.opacity = '1';
                                    element.style.transform = 'scale(1)';
                                }, index * 100 + 200);
                            }
                        });

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(pattern);
        });
    }

    /**
     * Anima V's flutuantes decorativos
     */
    animateFloatingVs() {
        const floatingVs = document.querySelectorAll('.floating-v');

        floatingVs.forEach((vElement, vIndex) => {
            const lines = vElement.querySelectorAll('line');

            lines.forEach((line, index) => {
                const length = line.getTotalLength();
                line.style.strokeDasharray = length;
                line.style.strokeDashoffset = length;

                setTimeout(() => {
                    line.style.transition = `stroke-dashoffset 1500ms ease-out`;
                    line.style.strokeDashoffset = '0';
                }, 2000 + vIndex * 500 + index * 150);
            });
        });
    }

    /**
     * Anima geometrias flutuantes
     */
    animateFloatingGeometry() {
        const geometries = document.querySelectorAll('.floating-geometry');

        geometries.forEach((geo, geoIndex) => {
            const shapes = geo.querySelectorAll('polygon, circle, rect, line, path');

            shapes.forEach((shape, index) => {
                shape.style.opacity = '0';

                if (shape.tagName === 'polygon' || shape.tagName === 'circle') {
                    shape.style.transform = 'scale(0)';
                    shape.style.transformOrigin = 'center';

                    setTimeout(() => {
                        shape.style.transition = `opacity 800ms ease-out, transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
                        shape.style.opacity = shape.getAttribute('opacity') || '1';
                        shape.style.transform = 'scale(1)';
                    }, 1500 + geoIndex * 300 + index * 100);
                } else if (shape.tagName === 'line') {
                    const length = shape.getTotalLength ? shape.getTotalLength() : 100;
                    shape.style.strokeDasharray = length;
                    shape.style.strokeDashoffset = length;

                    setTimeout(() => {
                        shape.style.transition = `stroke-dashoffset 600ms ease-out, opacity 400ms ease-out`;
                        shape.style.strokeDashoffset = '0';
                        shape.style.opacity = shape.getAttribute('opacity') || '1';
                    }, 1500 + geoIndex * 300 + index * 100);
                } else {
                    setTimeout(() => {
                        shape.style.transition = `opacity 600ms ease-out`;
                        shape.style.opacity = shape.getAttribute('opacity') || '1';
                    }, 1500 + geoIndex * 300 + index * 100);
                }
            });
        });
    }

    /**
     * Anima logo do footer
     */
    animateFooterLogo() {
        const footerLogo = document.querySelector('.footer-logo-v svg');
        if (!footerLogo) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elements = footerLogo.querySelectorAll('line, circle');

                    elements.forEach((element, index) => {
                        if (element.tagName === 'line') {
                            const length = element.getTotalLength();
                            element.style.strokeDasharray = length;
                            element.style.strokeDashoffset = length;

                            setTimeout(() => {
                                element.style.transition = `stroke-dashoffset 800ms ease-out`;
                                element.style.strokeDashoffset = '0';
                            }, index * 100);
                        } else {
                            element.style.opacity = '0';
                            element.style.transform = 'scale(0)';
                            element.style.transformOrigin = 'center';

                            setTimeout(() => {
                                element.style.transition = `opacity 500ms ease-out, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
                                element.style.opacity = '1';
                                element.style.transform = 'scale(1)';
                            }, index * 100 + 200);
                        }
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(footerLogo);
    }

    /**
     * Anima ícone de contato
     */
    animateContactIcon() {
        const contactIcons = document.querySelectorAll('.info-card-icon svg, .map-marker');

        contactIcons.forEach(icon => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const elements = icon.querySelectorAll('circle, path, line, polygon');

                        elements.forEach((element, index) => {
                            element.style.opacity = '0';

                            if (element.tagName === 'line' || element.tagName === 'path') {
                                const length = element.getTotalLength ? element.getTotalLength() : 100;
                                element.style.strokeDasharray = length;
                                element.style.strokeDashoffset = length;

                                setTimeout(() => {
                                    element.style.transition = `stroke-dashoffset 800ms ease-out, opacity 400ms ease-out`;
                                    element.style.strokeDashoffset = '0';
                                    element.style.opacity = '1';
                                }, index * 80);
                            } else {
                                element.style.transform = 'scale(0)';
                                element.style.transformOrigin = 'center';

                                setTimeout(() => {
                                    element.style.transition = `opacity 500ms ease-out, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
                                    element.style.opacity = element.getAttribute('opacity') || '1';
                                    element.style.transform = 'scale(1)';
                                }, index * 80 + 150);
                            }
                        });

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(icon);
        });
    }
}

// Criar instância global e auto-inicializar
const vijalesSVGAnimator = new VijalesSVGAnimator();
vijalesSVGAnimator.init();

// Exportar para uso manual se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VijalesSVGAnimator;
}

// Desktop retractable menu toggle behavior
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navDrawer = document.getElementById('nav-drawer');
    const backdrop = document.getElementById('nav-backdrop');
    const closeBtn = document.querySelector('.nav-drawer-close');

    if (!navToggle || !navDrawer || !backdrop) return;

    function openMenu() {
        navDrawer.hidden = false;
        backdrop.hidden = false;
        navDrawer.classList.add('open');
        navDrawer.setAttribute('aria-hidden', 'false');
        navToggle.setAttribute('aria-expanded', 'true');
        // fade backdrop in
        requestAnimationFrame(() => backdrop.style.opacity = '1');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navDrawer.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navDrawer.setAttribute('aria-hidden', 'true');
        backdrop.style.opacity = '0';
        document.body.style.overflow = '';
        // wait transition then hide
        setTimeout(() => {
            navDrawer.hidden = true;
            backdrop.hidden = true;
        }, 280);
    }

    navToggle.addEventListener('click', function () {
        if (navDrawer.classList.contains('open')) closeMenu(); else openMenu();
    });

    closeBtn && closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    // Close menu when a link is clicked
    const navLinks = navDrawer.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navDrawer.classList.contains('open')) closeMenu();
    });
});