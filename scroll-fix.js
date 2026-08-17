// Controle de rolagem da experiência mobile no desktop.
// No desktop, o próprio .app-shell é o corpo do celular e é o único
// container de rolagem. Assim, a moldura não cria um segundo scroll.
(() => {
  const nativeWindowScrollTo = window.scrollTo.bind(window);

  const resetAppScroll = () => {
    const app = document.querySelector('.app-shell');
    if (app) {
      app.scrollTop = 0;
      app.scrollLeft = 0;
    }
    const main = document.querySelector('.main-content');
    if (main) {
      main.scrollTop = 0;
      main.scrollLeft = 0;
    }
    nativeWindowScrollTo(0, 0);
  };

  // O código de navegação do React já chama window.scrollTo(0, 0).
  // Redirecionamos esse reset para o container que realmente possui o scroll.
  window.scrollTo = (...args) => {
    resetAppScroll();
  };
})();
