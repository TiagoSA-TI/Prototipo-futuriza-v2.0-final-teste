// Corrige a rolagem interna do celular na versão de demonstração.
// Ao navegar para outra tela, o conteúdo começa sempre no topo.
(() => {
  const setup = () => {
    const main = document.querySelector('.main-content');
    if (!main || main.dataset.scrollFixReady === 'true') return;

    main.dataset.scrollFixReady = 'true';

    const resetScroll = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          main.scrollTop = 0;
          main.scrollLeft = 0;
          // Compatibilidade caso o navegador trate a rolagem no elemento pai.
          if (document.scrollingElement) {
            document.scrollingElement.scrollTop = 0;
          }
        });
      });
    };

    // O problema anterior era observar apenas a troca do primeiro elemento.
    // O React reutiliza esse elemento ao trocar de página, então a troca não era detectada.
    // Em vez disso, observamos cliques que podem disparar navegação e resetamos
    // depois que o React termina de renderizar a nova tela.
    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const navigationTarget = target.closest(
        '.bottom-nav button, .brand, .topbar-actions button, .back-link, .back-button, ' +
        '.feature-card, .career-card, .career-mini, .course-card, .ai-banner, ' +
        '.primary, .primary-btn, [data-navigate]'
      );

      if (navigationTarget) {
        setTimeout(resetScroll, 0);
        setTimeout(resetScroll, 80);
      }
    }, true);

    // Também cobre navegações disparadas por mudanças de estado do React.
    let lastSignature = '';
    const getSignature = () => {
      const page = main.querySelector('.page');
      if (!page) return '';
      const title = page.querySelector('h1,h2,h3')?.textContent?.trim() || '';
      return `${page.className}|${title}|${page.children.length}`;
    };

    lastSignature = getSignature();
    const observer = new MutationObserver(() => {
      const nextSignature = getSignature();
      if (nextSignature && nextSignature !== lastSignature) {
        lastSignature = nextSignature;
        resetScroll();
      }
    });

    observer.observe(main, { childList: true, subtree: true, characterData: true });
    resetScroll();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }

  // O React monta .main-content depois do carregamento inicial.
  const root = document.getElementById('root');
  if (root) {
    const rootObserver = new MutationObserver(() => setup());
    rootObserver.observe(root, { childList: true, subtree: true });
  }
})();