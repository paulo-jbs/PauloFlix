import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

const PROFILE_STORAGE_KEY = 'perfilAtivo';
const THEME_STORAGE_KEY = 'theme';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const perfilAtivoSalvo = localStorage.getItem(PROFILE_STORAGE_KEY);
    const perfilAtivo = perfilAtivoSalvo ? JSON.parse(perfilAtivoSalvo) : null;

    const applyTheme = (theme) => {
        const isLightMode = theme === 'light';
        root.classList.toggle('light-mode', isLightMode);
        if (themeToggle) {
            themeToggle.setAttribute(
                'aria-label',
                isLightMode ? 'Ativar modo escuro' : 'Ativar modo claro'
            );
        }
    };

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = root.classList.contains('light-mode') ? 'dark' : 'light';
            localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            applyTheme(nextTheme);
        });
    }

    if (perfilAtivo?.name && perfilAtivo?.image) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        if (kidsLink) kidsLink.textContent = perfilAtivo.name;
        if (profileIcon) profileIcon.src = perfilAtivo.image;
    }

    const container = document.getElementById('main-content');
    
    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (menuToggle && siteNav) {
        const navLinks = siteNav.querySelectorAll('a');

        const closeMenu = () => {
            siteNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        };

        menuToggle.addEventListener('click', () => {
            const willOpen = !siteNav.classList.contains('is-open');
            siteNav.classList.toggle('is-open', willOpen);
            menuToggle.setAttribute('aria-expanded', String(willOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (event) => {
            if (!siteNav.classList.contains('is-open')) {
                return;
            }

            if (siteNav.contains(event.target) || menuToggle.contains(event.target)) {
                return;
            }

            closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1100) {
                closeMenu();
            }
        });
    }
});
