// Controle de rolagem da experiência mobile no desktop.
// O aplicativo usa .main-content como área de scroll dentro da moldura do celular.
// A navegação do React chama window.scrollTo(), então interceptamos essa chamada
// para também resetar a área interna do aplicativo.
(() => {
  const nativeWindowScrollTo = window.scrollTo.bind(window);

  const resetAppScroll = () => {
    const main = document.querySelector('.main-content');
    if (main) {
      main.scrollTop = 0;
      main.scrollLeft = 0;
    }
    // A página externa também deve permanecer no topo, mas sem substituir
    // o scroll interno do aplicativo.
    nativeWindowScrollTo(0, 0);
  };

  window.scrollTo = (...args) => {
    resetAppScroll();
  };

  // Garante o topo após a renderização de uma nova tela do React.
  const observeRoot = () => {
    const root = document.getElementById('root');
    if (!root || root.dataset.scrollResetReady === 'true') return;
    root.dataset.scrollResetReady = 'true';

    const observer = new MutationObserver(() => {
      // Não resetamos a cada mutação de conteúdo, pois isso impediria
      // o usuário de rolar. O reset acontece quando a navegação chama go().
    });
    observer.observe(root, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeRoot, { once: true });
  } else {
    observeRoot();
  }
})();
