document.addEventListener('DOMContentLoaded', () => {
    
    // CONTROL DEL CARRUSEL DE GALERÍA
    const track = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    if (track && prevBtn && nextBtn) {
        const slides = track.querySelectorAll('.gallery-item');
        let currentIndex = 0;
        const total = slides.length;

        function updateSlide() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % total;
            updateSlide();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + total) % total;
            updateSlide();
        });

        // Cambio automático cada 6 segundos
        setInterval(() => {
            currentIndex = (currentIndex + 1) % total;
            updateSlide();
        }, 13000);
    }

    // QR CODE MODAL
    const qrButton = document.getElementById('nav-qr');
    const secondaryQrButton = document.querySelector('.secondary-qr');
    const qrModal = document.getElementById('qr-modal');
    const qrCodeContainer = document.getElementById('qr-code');

    function openQrModal() {
        // Generate QR code pointing to the project URL
        new QRCode(qrCodeContainer, {
            text: window.location.href || 'https://erickbencornejo.github.io/INAC-CRAFTS/',
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        qrModal.classList.add('active');
    }

    function closeQrModal() {
        qrModal.classList.remove('active');
        // Clear QR code on close
        qrCodeContainer.innerHTML = '';
    }

    if (qrButton) qrButton.addEventListener('click', (e) => { e.preventDefault(); openQrModal(); });
    if (secondaryQrButton) secondaryQrButton.addEventListener('click', (e) => { e.preventDefault(); openQrModal(); });
    if (qrModal) qrModal.addEventListener('click', (e) => { if (e.target === qrModal) closeQrModal(); });

    

    // VIDEO ANNOUNCEMENT MODAL
    const videoButton = document.getElementById('nav-video');
    let videoModal = null;

    function openVideoModal() {
        if (!videoModal) {
            videoModal = document.createElement('div');
            videoModal.className = 'mc-modal-overlay';
            videoModal.id = 'video-modal';
            videoModal.innerHTML = `
                <div class="video-modal">
                    <h3>Anuncio jeje</h3>
                    <video controls autoplay>
                        <source src="anuncios/Infinix final (1).mp4" type="video/mp4">
                        Tu navegador no soporta la etica de video.
                    </video>
                    <button class="close-modal" onclick="closeVideoModal()">Cerrar</button>
                </div>
            `;
            document.body.appendChild(videoModal);
            
            // Close on overlay click
            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) closeVideoModal();
            });
        }
        videoModal.classList.add('active');
        const video = videoModal.querySelector('video');
        if (video) video.play();
    }

    window.closeVideoModal = function() {
        if (videoModal) {
            videoModal.classList.remove('active');
            const video = videoModal.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    };

    if (videoButton) videoButton.addEventListener('click', (e) => { e.preventDefault(); openVideoModal(); });
});

// CARRUSEL AUTOMÁTICO SINCRONIZADO MC VS REALIDAD
const vsData = [
    {
        mcImg: 'fotos inac/Foto MC1.jpeg',
        mcText: 'Parqueo principal (MC)',
        realImg: 'fotos inac/Foto Real 1.jpeg',
        realText: 'Parqueo principal (INAC)'
    },
    {
        mcImg: 'fotos inac/Foto MC2.jpeg',
        mcText: 'Entrada Principal (MC)',
        realImg: 'fotos inac/Foto Real 2.jpeg',
        realText: 'Entrada Principal (INAC)'
    },
    {
        mcImg: 'fotos inac/Foto MC3.jpeg',
        mcText: 'Canchas (MC)',
        realImg: 'fotos inac/Foto Real 3.jpeg',
        realText: 'Canchas (INAC)'
    },
    {
        mcImg: 'fotos inac/Foto MC4.jpeg',
        mcText: 'Pasillos (MC)',
        realImg: 'fotos inac/Foto Real 4.jpeg',
        realText: 'Pasillos (INAC)'
    },
    {
        mcImg: 'fotos inac/Foto MC5.jpeg',
        mcText: 'Aulas / Laboratorio (MC)',
        realImg: 'fotos inac/Foto Real 5.jpeg',
        realText: 'Aulas / Laboratorio (INAC)'
    }
];

let currentVsIndex = 0;

function updateCarousel() {
    const mcImg = document.getElementById('mcImage');
    const mcLabel = document.getElementById('mcLabel');
    const realImg = document.getElementById('realImage');
    const realLabel = document.getElementById('realLabel');
    const counter = document.getElementById('vsCounter');

    if (mcImg && realImg) {
        // Transición suave opcional
        mcImg.style.opacity = '0.3';
        realImg.style.opacity = '0.3';

        setTimeout(() => {
            mcImg.src = vsData[currentVsIndex].mcImg;
            mcLabel.textContent = vsData[currentVsIndex].mcText;

            realImg.src = vsData[currentVsIndex].realImg;
            realLabel.textContent = vsData[currentVsIndex].realText;

            if (counter) {
                counter.textContent = `${currentVsIndex + 1} / ${vsData.length}`;
            }

            mcImg.style.opacity = '1';
            realImg.style.opacity = '1';
        }, 200);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Transición CSS suave para el cambio de imagen
    const mcImg = document.getElementById('mcImage');
    const realImg = document.getElementById('realImage');
    if (mcImg) mcImg.style.transition = 'opacity 0.3s ease';
    if (realImg) realImg.style.transition = 'opacity 0.3s ease';

    // Iniciar temporizador automático cada 5000 ms (5 segundos)
    setInterval(() => {
        currentVsIndex = (currentVsIndex + 1) % vsData.length;
        updateCarousel();
    }, 5000);
});