export const useAutoFontSize = () => {
  const adjustFontSize = (el: HTMLElement) => {
    const maxFontSize = 14;
    const minFontSize = 9;
    let fontSize = maxFontSize;

    el.style.fontSize = `${fontSize}px`;

    while (el.scrollWidth > el.offsetWidth && fontSize > minFontSize) {
      fontSize--;
      el.style.fontSize = `${fontSize}px`;
    }
  };

  const directive = {
    mounted(el: HTMLElement) {
      adjustFontSize(el);
    },
    updated(el: HTMLElement) {
      adjustFontSize(el);
    },
  };

  return { directive };
};
