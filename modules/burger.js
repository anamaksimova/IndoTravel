const menuBtn = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');

document.addEventListener('click', e => {
  if (e.target === menuBtn) {
    menu.classList.toggle('header__menu_active');
  }

  if (e.target !== menu && e.target !== menuBtn ||
     e.target.closest('.header__list')) {
    menu.classList.remove('header__menu_active');
  }
});
