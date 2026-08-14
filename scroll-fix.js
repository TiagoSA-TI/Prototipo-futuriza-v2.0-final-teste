// Mantém a experiência mobile com rolagem interna e reinicia a posição
// sempre que uma nova página do aplicativo é exibida.
(() => {
  const setup = () => {
    const main = document.querySelector('.main-content');
    if (!main || main.dataset.scrollFixReady === 'true') return;

    main.dataset.scrollFixReady = 'true';

    const scrollToTop = () => {
      requestAnimationFrame(() => {
        main.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    };

    let currentPageNode = main.firstElementChild;

    const observer = new MutationObserver(() => {
      const nextPageNode = main.firstElementChild;
      if (nextPageNode !== currentPageNode) {
        currentPageNode = nextPageNode;
        scrollToTop();
      }
    });

    observer.observe(main, { childList: true });
    scrollToTop();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  // O React monta o conteúdo depois do carregamento inicial.
  const rootObserver = new MutationObserver(setup);
  const root = document.getElementById('root');
  if (root) rootObserver.observe(root, { childList: true, subtree: true });
})();
