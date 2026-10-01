
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
const closeQrBtn = document.getElementById('close-qr-btn'); // 1. Referencia al botón cerrar

// URL directa y fija del proyecto publicado en GitHub Pages
const PUBLIC_PROJECT_URL = 'https://erickbencornejo.github.io/INAC-CRAFTS/';

function openQrModal() {
    if (!qrCodeContainer || !qrModal) return;

    // Limpia cualquier QR generado previamente
    qrCodeContainer.innerHTML = '';

    // Genera el código QR
    if (typeof QRCode !== 'undefined') {
        new QRCode(qrCodeContainer, {
            text: PUBLIC_PROJECT_URL,
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    qrModal.classList.add('active');
}

// 2. Hacemos la función global para que responda a onclick="closeQrModal()"
window.closeQrModal = function() {
    if (qrModal) qrModal.classList.remove('active');
    if (qrCodeContainer) qrCodeContainer.innerHTML = '';
};

// Event Listeners
if (qrButton) {
    qrButton.addEventListener('click', (e) => { 
        e.preventDefault(); 
        openQrModal(); 
    });
}

if (secondaryQrButton) {
    secondaryQrButton.addEventListener('click', (e) => { 
        e.preventDefault(); 
        openQrModal(); 
    });
}

// Listener directo para el botón cerrar
if (closeQrBtn) {
    closeQrBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.closeQrModal();
    });
}

// Cerrar al hacer clic en el fondo oscuro
if (qrModal) {
    qrModal.addEventListener('click', (e) => { 
        if (e.target === qrModal) window.closeQrModal(); 
    });
}
    

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
        realText: 'Aulas  (INAC)'
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

// ==========================================
// 1. BASE DE DATOS Y VARIABLES GLOBALES
// ==========================================

const SUPABASE_URL = 'https://dlcjffrvrbyesymmansd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_tA5h0PtdKAAsLx2Aa8KJuQ_NSKdtQuT';

// Usa el cliente global de Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let selectedRating = 0;
let hasRated = localStorage.getItem('hasRated') === 'true';
let modalDismissed = false;
let isInternalNavigation = false;

// Evita que el modal salte si el usuario navega por el menú interno
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' || e.target.closest('nav') || e.target.classList.contains('nav-link')) {
    isInternalNavigation = true;
    setTimeout(() => { isInternalNavigation = false; }, 500);
  }
});

// ==========================================
// 2. SELECCIÓN DE ESTRELLAS, ENVIAR Y CANCELAR
// ==========================================
document.addEventListener('click', async (e) => {
  
  // A. CLIC EN LAS ESTRELLAS
  if (e.target.classList.contains('mc-star')) {
    const star = e.target;
    selectedRating = parseInt(star.getAttribute('data-value'));

    const starLabel = document.getElementById('star-label');
    const labels = ["", "Malo 😞", "Regular 😐", "Bueno 🙂", "Muy Bueno 😄", "¡Excelente! 💎"];
    if (starLabel) starLabel.innerText = labels[selectedRating];

    const allStars = document.querySelectorAll('.mc-star');
    allStars.forEach(s => {
      const val = parseInt(s.getAttribute('data-value'));
      if (val <= selectedRating) {
        s.classList.add('active');
        s.style.color = '#ffaa00';
      } else {
        s.classList.remove('active');
        s.style.color = '#555555';
      }
    });

    const btnSubmit = document.getElementById('btn-submit-rating');
    if (btnSubmit) {
      btnSubmit.removeAttribute('disabled');
      btnSubmit.disabled = false;
      btnSubmit.style.opacity = '1';
      btnSubmit.style.cursor = 'pointer';
    }
  }

 
  // B. CLIC EN "ENVIAR Y SALIR" 
if (e.target.id === 'btn-submit-rating') {
  if (!selectedRating) return;

  const submitBtn = e.target;
  
  try {
    // 1. Bloquear el botón para evitar múltiples envíos
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // 2. Guardar voto en Supabase
    const { error } = await supabaseClient
      .from('ratings')
      .insert([{ rating: selectedRating }]);

    if (error) throw error;

    // 3. Bloquear el modal localmente
    localStorage.setItem('hasRated', 'true');
    hasRated = true;

    const ratingModal = document.getElementById('mc-rating-modal');
    if (ratingModal) ratingModal.style.display = 'none';

    alert('¡Gracias por tu calificación! Esperamos te haya gustado :)');
  } catch (err) {
    console.error('Error al guardar en Supabase:', err);
    alert('Hubo un problema al enviar tu voto. Intenta nuevamente.');
    
    // Si hay un error, rehabilitar el botón
    submitBtn.disabled = false;
    submitBtn.textContent = 'ENVIAR Y SALIR';
  }
}

  // C. CLIC EN CANCELAR O CERRAR ('X')
  if (e.target.id === 'btn-cancel-rating' || e.target.id === 'btn-close-modal') {
    const ratingModal = document.getElementById('mc-rating-modal');
    if (ratingModal) {
      ratingModal.style.display = 'none';
      modalDismissed = true;
    }
  }
});

// ==========================================
// 3. ACTIVADORES DEL MODAL (PRECISIÓN TOTAL)
// ==========================================
function triggerRatingModal() {
  const modal = document.getElementById('mc-rating-modal');
  if (!hasRated && !modalDismissed && !isInternalNavigation && modal) {
    modal.style.display = 'flex';
  }
}

// A. Detector de pie de página 
document.addEventListener('DOMContentLoaded', () => {
  const footerElement = document.querySelector('footer') || document.querySelector('.creditos') || document.body.lastElementChild;

  if (footerElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerRatingModal();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(footerElement);
  }
});

// B. Intención de salida hacia las pestañas arriba
document.documentElement.addEventListener('mouseleave', (e) => {
  if (e.clientY <= 0) {
    triggerRatingModal();
  }
});

// ==========================================
// 4. CONSULTA GLOBAL SHIFT + A 
// ==========================================
window.addEventListener('keydown', async (e) => {
  if (e.shiftKey && (e.key === 'A' || e.key === 'a' || e.code === 'KeyA')) {
    try {
      // Traer todas las calificaciones usando supabaseClient
      const { data, error } = await supabaseClient
        .from('ratings')
        .select('rating');

      if (error) throw error;

      if (!data || data.length === 0) {
        alert('Aún no hay calificaciones registradas');
        return;
      }

      const total = data.length;
      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let sum = 0;

      data.forEach(row => {
        counts[row.rating] = (counts[row.rating] || 0) + 1;
        sum += row.rating;
      });

      const average = (sum / total).toFixed(1);

      alert(
        `ESTADÍSTICAS GLOBALES\n\n` +
        `Total de votos recibidos: ${total}\n` +
        `Promedio general: ⭐ ${average} / 5\n\n` +
        `Desglose:\n` +
        `5 ⭐: ${counts[5]}\n` +
        `4 ⭐: ${counts[4]}\n` +
        `3 ⭐: ${counts[3]}\n` +
        `2 ⭐: ${counts[2]}\n` +
        `1 ⭐: ${counts[1]}`
      );
    } catch (err) {
      console.error('Error al consultar las estadísticas:', err);
      alert('Error al conectar con la base de datos de Supabase.');
    }
  }
});

// ATAJO PARA PRUEBAS: REINICIAR MI VOTO LOCAL (SHIFT + D)
window.addEventListener('keydown', (e) => {
  if (e.shiftKey && (e.key === 'D' || e.key === 'd' || e.code === 'KeyD')) {
    localStorage.removeItem('hasRated');
    alert('Registro local eliminado.');
    location.reload();
  }
});