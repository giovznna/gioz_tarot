function montarLink() {
      const nome = document.getElementById('nome').value.trim();
      const consulta = document.getElementById('consulta').value;
      const pergunta = document.getElementById('pergunta').value.trim();
      const emergencia = document.getElementById('emergencia').value;

      let msg = 'ei, gioz! quero agendar uma tiragem.\n\n';
      if (nome) msg += 'Nome: ' + nome + '\n';
      if (consulta) msg += 'Consulta: ' + consulta + '\n';
      if (emergencia === 'sim') msg += 'Taxa de emergência: Sim (+$15)\n';
      if (pergunta) msg += '\n Tema/pergunta: ' + pergunta;

      const url = 'https://wa.me/5531982965586?text=' + encodeURIComponent(msg);
      document.getElementById('btn-wpp-send').href = url;
    }

    ['nome','consulta','pergunta','emergencia'].forEach(id => {
      document.getElementById(id).addEventListener('input', montarLink);
    });
    montarLink();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));