import { createCard } from './Card.js';

export function createCarousel(category) {
    const section = document.createElement('div');
    section.className = 'slider-section';

    // Header for Title and Indicators
    const header = document.createElement('div');
    header.className = 'slider-header';

    const title = document.createElement('h2');
    title.className = 'slider-title';
    title.innerText = category.title;

    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators';

    header.appendChild(title);
    header.appendChild(indicators);
    section.appendChild(header);

    const rail = document.createElement('div');
    rail.className = 'slider-rail';

    const prevButton = document.createElement('button');
    prevButton.className = 'slider-arrow slider-arrow-prev';
    prevButton.type = 'button';
    prevButton.setAttribute('aria-label', `Ver itens anteriores de ${category.title}`);
    prevButton.innerHTML = '&#8249;';

    const row = document.createElement('div');
    row.className = 'movie-row';

    category.items.forEach(item => {
        const card = createCard(item);
        row.appendChild(card);
    });

    const nextButton = document.createElement('button');
    nextButton.className = 'slider-arrow slider-arrow-next';
    nextButton.type = 'button';
    nextButton.setAttribute('aria-label', `Ver mais itens de ${category.title}`);
    nextButton.innerHTML = '&#8250;';

    const updateArrowState = () => {
        const maxScrollLeft = row.scrollWidth - row.clientWidth;
        const hasOverflow = maxScrollLeft > 8;

        prevButton.classList.toggle('is-visible', hasOverflow && row.scrollLeft > 8);
        nextButton.classList.toggle('is-visible', hasOverflow && row.scrollLeft < maxScrollLeft - 8);
    };

    const scrollRow = (direction) => {
        row.scrollBy({
            left: direction * Math.max(row.clientWidth * 0.82, 220),
            behavior: 'smooth'
        });
    };

    prevButton.addEventListener('click', () => scrollRow(-1));
    nextButton.addEventListener('click', () => scrollRow(1));
    row.addEventListener('scroll', updateArrowState, { passive: true });

    row.addEventListener('wheel', (event) => {
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
            return;
        }

        event.preventDefault();
        window.scrollBy({
            top: event.deltaY,
            behavior: 'auto'
        });
    }, { passive: false });

    window.addEventListener('resize', updateArrowState);
    requestAnimationFrame(updateArrowState);

    rail.appendChild(prevButton);
    rail.appendChild(row);
    rail.appendChild(nextButton);
    section.appendChild(rail);
    return section;
}
