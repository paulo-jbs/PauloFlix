import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

const PREVIEW_SCALE = 1.6;
let activePreview = null;

function removePreview() {
    if (!activePreview) {
        return;
    }

    clearTimeout(activePreview.playTimeout);
    activePreview.preview.remove();
    activePreview.source.classList.remove('preview-source-active');
    activePreview = null;
}

window.addEventListener('scroll', removePreview, { passive: true });
window.addEventListener('resize', removePreview);

function buildPreview(card, videoId) {
    const preview = card.cloneNode(true);
    preview.classList.add('hover-preview');

    const previewIframe = preview.querySelector('iframe');
    const previewImg = preview.querySelector('img');
    const previewDetails = preview.querySelector('.card-details');

    if (previewDetails) {
        previewDetails.classList.add('preview-details-visible');
    }

    const rect = card.getBoundingClientRect();
    const previewWidth = rect.width * PREVIEW_SCALE;
    const previewHeight = rect.height * PREVIEW_SCALE;
    const detailsHeight = previewDetails ? 170 : 0;
    const maxLeft = window.innerWidth - previewWidth - 16;
    const left = Math.min(Math.max(rect.left - ((previewWidth - rect.width) / 2), 16), maxLeft);
    const top = Math.max(rect.top - ((previewHeight - rect.height) / 2), 88);

    preview.style.left = `${left}px`;
    preview.style.top = `${top}px`;
    preview.style.width = `${previewWidth}px`;
    preview.style.height = `${previewHeight}px`;
    preview.style.setProperty('--preview-media-height', `${previewHeight}px`);
    preview.style.setProperty('--preview-total-height', `${previewHeight + detailsHeight}px`);

    document.body.appendChild(preview);

    const playTimeout = setTimeout(() => {
        if (!activePreview || activePreview.preview !== preview || !previewIframe || !previewImg) {
            return;
        }

        previewIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
        previewIframe.classList.add('playing');
        previewImg.classList.add('playing-video');
    }, 600);

    activePreview = { preview, source: card, playTimeout };
    card.classList.add('preview-source-active');

    preview.addEventListener('mouseleave', removePreview);
}

export function createCard(item) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    if (item.progress) {
        card.classList.add('has-progress');
    }

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = 'Movie cover';

    const iframe = document.createElement('iframe');
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media';

    const videoId = getYouTubeId(item.youtube);

    card.appendChild(iframe);
    card.appendChild(img);

    const ageBadge = getRandomAgeBadge();

    const details = document.createElement('div');
    details.className = 'card-details';
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                ${item.progress ? '<button class="btn-icon"><i class="fas fa-check"></i></button>' : '<button class="btn-icon"><i class="fas fa-plus"></i></button>'}
                <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match-score">${getRandomMatchScore()}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span class="duration">${getRandomDuration(item.progress)}</span>
            <span class="resolution">HD</span>
        </div>
        <div class="details-tags">
            <span>Empolgante</span>
            <span>Animação</span>
            <span>Ficção</span>
        </div>
    `;
    card.appendChild(details);

    if (item.progress) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`;
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    let playTimeout;
    card.addEventListener('mouseenter', () => {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        removePreview();
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        if (rect.left < 100) {
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            card.classList.add('origin-right');
        }

        playTimeout = setTimeout(() => {
            buildPreview(card, videoId);
        }, 120);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(playTimeout);
        card.classList.remove('origin-left');
        card.classList.remove('origin-right');

        if (activePreview?.source === card) {
            return;
        }

        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = '';
    });

    return card;
}
