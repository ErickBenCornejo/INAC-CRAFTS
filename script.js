
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
const PUBLIC_PROJECT_URL = 'https://erickbencornejo.github.io/INAC-CRAFTS/index.html?src=qr';

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
        mcText: 'Entrada principal (MC)',
        realImg: 'fotos inac/Foto Real 1.jpeg',
        realText: 'Entrada principal (INAC)'
    },
    {
        mcImg: 'fotos inac/MC 2.jpeg',
        mcText: 'Canchas (MC)',
        realImg: 'fotos inac/Real 2.jpeg',
        realText: 'Canchas (INAC)'
    },
    {
        mcImg: 'fotos inac/MC 3.jpeg',
        mcText: 'Parqueo principal (MC)',
        realImg: 'fotos inac/Real 3.jpeg',
        realText: 'Parqueo principal (INAC)'
    },
    {
        mcImg: 'fotos inac/MC 4.jpeg',
        mcText: 'Primer punto de reunión (MC)',
        realImg: 'fotos inac/Real 4.jpeg',
        realText: 'Primer punto de reunión (INAC)'
    },
    {
        mcImg: 'fotos inac/MC 5.jpeg',
        mcText: 'Dirección (MC)',
        realImg: 'fotos inac/Real 5.jpeg',
        realText: 'Dirección  (INAC)'
    },
     {
        mcImg: 'fotos inac/MC 6.jpeg',
        mcText: 'Primer edificio segunda planta (MC)',
        realImg: 'fotos inac/Real 6.jpeg',
        realText: 'Primer edificio segunda planta  (INAC)'
    },
     {
        mcImg: 'fotos inac/MC 7.jpeg',
        mcText: 'Vista desde el primer edificio (MC)',
        realImg: 'fotos inac/Real 7.jpeg',
        realText: 'Vista desde el primer edificio  (INAC)'
    },
     {
        mcImg: 'fotos inac/MC 8.jpeg',
        mcText: 'Pasillo primer edificio (MC)',
        realImg: 'fotos inac/Real 8.jpeg',
        realText: 'Pasillo primer edificio  (INAC)'
    },
     {
        mcImg: 'fotos inac/MC 9.jpeg',
        mcText: 'Baños (MC)',
        realImg: 'fotos inac/Real 9.jpeg',
        realText: 'Baños  (INAC)'
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
    }, 8000);
});

// ==========================================
// 1. BASE DE DATOS Y VARIABLES GLOBALES
// ==========================================

const SUPABASE_URL = 'https://dlcjffrvrbyesymmansd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_tA5h0PtdKAAsLx2Aa8KJuQ_NSKdtQuT';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let selectedRating = 0;
let hasRated = localStorage.getItem('hasRated') === 'true';
let modalDismissed = sessionStorage.getItem('modalDismissed') === 'true';
let isInternalNavigation = false;

// Variable de bloqueo en memoria para evitar el doble conteo de visitas
let ejecutandoRegistro = false;

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' || e.target.closest('nav') || e.target.classList.contains('nav-link')) {
    isInternalNavigation = true;
    setTimeout(() => { isInternalNavigation = false; }, 500);
  }
});

// ==========================================
// 2. LÓGICA DE ESTRELLAS Y ENVÍO EN EL MODAL ORIGINAL
// ==========================================
document.addEventListener('click', async (e) => {
  
  // A. Selección de estrellas
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

  // B. Guardar voto en Supabase
  if (e.target.id === 'btn-submit-rating') {
    if (!selectedRating) return;

    const submitBtn = e.target;
    
    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      const { error } = await supabaseClient
        .from('ratings')
        .insert([{ rating: selectedRating }]);

      if (error) throw error;

      // Guardar permanentemente que ya votó
      localStorage.setItem('hasRated', 'true');
      sessionStorage.setItem('modalDismissed', 'true');
      hasRated = true;
      modalDismissed = true;

      // Ocultar modal
      const ratingModal = document.getElementById('mc-rating-modal');
      if (ratingModal) ratingModal.style.display = 'none';

      alert('¡Gracias por tu calificación! Esperamos te haya gustado :)');
    } catch (err) {
      console.error('Error al guardar en Supabase:', err);
      alert('Hubo un problema al enviar tu voto. Intenta nuevamente.');
      
      submitBtn.disabled = false;
      submitBtn.textContent = 'ENVIAR Y SALIR';
    }
  }

  // C. Cerrar modal original
  if (e.target.id === 'btn-cancel-rating' || e.target.id === 'btn-close-modal' || e.target.classList.contains('mc-modal-close')) {
    const ratingModal = document.getElementById('mc-rating-modal');
    if (ratingModal) ratingModal.style.display = 'none';
    modalDismissed = true;
    sessionStorage.setItem('modalDismissed', 'true');
  }
});

// ==========================================
// 3. ACTIVAR EL MODAL ORIGINAL
// ==========================================
function triggerRatingModal(force = false) {
  const modal = document.getElementById('mc-rating-modal');
  // Si ya votó o ya cerró el modal, NO se vuelve a mostrar jamás
  if (modal && !hasRated && !modalDismissed && (force || !isInternalNavigation)) {
    modal.style.display = 'flex';
  }
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {

  registrarVisita();

  const urlParams = new URLSearchParams(window.location.search);
  const origen = urlParams.get('src');

  if (origen === 'qr' && !hasRated && !modalDismissed) {
    // 1. Ocultar banner si existe
    const bannerExpo = document.getElementById('banner-expo');
    if (bannerExpo) bannerExpo.style.display = 'none';

    // 2. Ocultar contenedor auxiliar si existía
    const avisoPostExpo = document.getElementById('mensaje-post-expo');
    if (avisoPostExpo) avisoPostExpo.style.display = 'none';

    // 3. Modificar el texto INTERNO del modal original
    const modalTitle = document.querySelector('#mc-rating-modal h2') || document.querySelector('#mc-rating-modal .mc-modal-title');
    const modalText = document.querySelector('#mc-rating-modal p') || document.querySelector('#mc-rating-modal .mc-modal-subtitle');

    if (modalTitle) {
      modalTitle.innerText = '¡Gracias por tu interés!';
      modalTitle.style.color = '#ffaa00';
    }

    if (modalText) {
      modalText.innerText = 'La Expo-Feria finalizó, pero puedes apoyarnos evaluando tu experiencia:';
    }

    // 4. Abrir modal si no se ha votado ni cerrado antes
    setTimeout(() => {
      triggerRatingModal();
    }, 200);

    // 5. Limpiar el "?src=qr" de la barra de direcciones sin recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // Detector de scroll al footer
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

// Detector de salida hacia arriba (PC)
document.documentElement.addEventListener('mouseleave', (e) => {
  if (e.clientY <= 0) {
    triggerRatingModal();
  }
});

// Registrar Visita (Protegido contra doble conteo)
async function registrarVisita() {
  if (sessionStorage.getItem('visited_session') || ejecutandoRegistro) {
    return;
  }

  ejecutandoRegistro = true;

  try {
    sessionStorage.setItem('visited_session', 'true');

    const { error } = await supabaseClient.from('views').insert([{}]);
    if (error) throw error;

  } catch (err) {
    console.error('Error al registrar visita:', err);
    sessionStorage.removeItem('visited_session');
  } finally {
    ejecutandoRegistro = false;
  }
}

// Consultar Estadísticas SHIFT + A
window.addEventListener('keydown', async (e) => {
  if (e.shiftKey && (e.key === 'A' || e.key === 'a' || e.code === 'KeyA')) {
    try {
      const [votosRes, visitasRes] = await Promise.all([
        supabaseClient.from('ratings').select('rating'),
        supabaseClient.from('views').select('id', { count: 'exact', head: true })
      ]);

      if (votosRes.error) throw votosRes.error;
      if (visitasRes.error) throw visitasRes.error;

      const data = votosRes.data || [];
      const totalVisitas = visitasRes.count || 0;

      if (!data || data.length === 0) {
        alert(`ESTADÍSTICAS GLOBALES\n\nTotal de visitas recibidas: ${totalVisitas}\nTotal de votos recibidos: 0`);
        return;
      }

      const total = data.length;
      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let sum = 0;

      data.forEach(row => {
        counts[row.rating] = (counts[row.rating] || 0) + 1;
        sum += Number(row.rating);
      });

      const average = (sum / total).toFixed(1);

      alert(
        `ESTADÍSTICAS GLOBALES\n\n` +
        `Total de visitas recibidas: ${totalVisitas}\n` +
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
    }
  }
});

// Reiniciar datos SHIFT + D
window.addEventListener('keydown', async (e) => {
  if (e.shiftKey && (e.key === 'D' || e.key === 'd' || e.code === 'KeyD')) {
    try {
      await supabaseClient.from('views').delete().neq('id', 0);
      localStorage.removeItem('hasRated');
      sessionStorage.removeItem('modalDismissed');
      alert('Estado local e historial reiniciado.');
      location.reload();
    } catch (err) {
      console.error('Error al reiniciar:', err);
    }
  }
});