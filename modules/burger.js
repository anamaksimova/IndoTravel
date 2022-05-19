const menuBtn = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');

const hideMenu = () => {
  menu.style.zIndex = -1;
  menu.style.right = `0px`;
  menu.style.opacity = 0;
};


const showMenu = () => {
  menu.style.zIndex = 1;
  let opacity = +menu.style.opacity;
  let right = +(menu.style.right).slice(0, -2);

  if (opacity < 1 && right < 95) {
    right = Math.round(right + 2);
    opacity += 0.02;
    menu.style.right = `${right}px`;
    menu.style.opacity = `${opacity}`;
    showMenu();
  } else if (opacity >= 1 || right >= 95) {
    right = 95;
    opacity = 1;
    menu.style.right = `${right}px`;
    menu.style.opacity = `${opacity}`;
  }
};


document.addEventListener('click', e => {
  if (e.target === menuBtn) {
    const opacity = +menu.style.opacity;
    if (opacity === 0) {
      showMenu();
    }
    if (opacity === 1) {
      hideMenu();
    }
    // menu.classList.toggle('header__menu_active');
  }

  if (e.target !== menu && e.target !== menuBtn ||
     e.target.closest('.header__list')) {
    const opacity = +menu.style.opacity;
    if (opacity === 1) hideMenu();
  }
});

