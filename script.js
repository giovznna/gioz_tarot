// ── FORMULÁRIO WHATSAPP ──
function montarLink() {
  const nome = document.getElementById('nome').value.trim();
  const consulta = document.getElementById('consulta').value;
  const pergunta = document.getElementById('pergunta').value.trim();
  const emergencia = document.getElementById('emergencia').value;

  let msg = 'Ei, Gioz! Quero agendar uma tiragem.\n\n';
  if (nome) msg += 'Nome: ' + nome + '\n';
  if (consulta) msg += 'Consulta: ' + consulta + '\n';
  if (emergencia === 'sim') msg += 'Taxa de emergência: Sim (+$15)\n';
  if (pergunta) msg += '\nTema/pergunta: ' + pergunta;

  const url = 'https://wa.me/5531982965586?text=' + encodeURIComponent(msg);
  document.getElementById('btn-wpp-send').href = url;
}

['nome','consulta','pergunta','emergencia'].forEach(id => {
  document.getElementById(id).addEventListener('input', montarLink);
});
montarLink();

// ── REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── FUNÇÃO GENÉRICA DE CARROSSEL ──
function criarCarrossel(trackEl, dotsEl, prevBtn, nextBtn) {
  if (!trackEl || !dotsEl || !prevBtn || !nextBtn) return;

  const items = Array.from(trackEl.children);
  let current = 0;

  function perView() {
    return window.innerWidth >= 600 ? 2 : 1;
  }

  function total() {
    return Math.ceil(items.length / perView());
  }

  function calcWidth() {
    // Usa a largura do elemento .carousel (pai do track)
    const container = trackEl.parentElement;
    const w = container.clientWidth;
    const gap = 20;
    return perView() === 1 ? w : (w - gap) / 2;
  }

  function aplicarLarguras() {
    const w = calcWidth();
    items.forEach(item => {
      item.style.minWidth = w + 'px';
      item.style.maxWidth = w + 'px';
    });
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i < total(); i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  function updateDots() {
    Array.from(dotsEl.children).forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
  current = Math.max(0, Math.min(index, total() - 1));
  aplicarLarguras();
  const w = calcWidth();
  const gap = 20;
  const isLastOdd = current === total() - 1 && items.length % perView() !== 0;
  const offset = isLastOdd
    ? (items.length - 1) * (w + gap)
    : current * perView() * (w + gap);
  trackEl.style.transform = 'translateX(-' + offset + 'px)';
  updateDots();
}

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  trackEl.addEventListener('touchstart', e => {
    trackEl._startX = e.touches[0].clientX;
  }, { passive: true });

  trackEl.addEventListener('touchend', e => {
    const diff = trackEl._startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  });

  window.addEventListener('resize', () => {
    current = 0;
    buildDots();
    goTo(0);
  });

  // Espera fontes/layout carregar antes de calcular larguras
  if (document.readyState === 'complete') {
    buildDots();
    goTo(0);
  } else {
    window.addEventListener('load', () => {
      buildDots();
      goTo(0);
    });
  }
}

// Inicia carrossel de depoimentos
criarCarrossel(
  document.getElementById('depos-track'),
  document.getElementById('dots'),
  document.getElementById('prev'),
  document.getElementById('next')
);

// Inicia carrossel de serviços
criarCarrossel(
  document.getElementById('servicos-track'),
  document.getElementById('servicos-dots'),
  document.getElementById('servicos-prev'),
  document.getElementById('servicos-next')
);