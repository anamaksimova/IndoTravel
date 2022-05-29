document.querySelector('.album__slider').classList.add('swiper');
document.querySelector('.album__list').classList.add('swiper-wrapper');
const imgs = document.querySelectorAll('.album__item');

imgs.forEach(element => {
  element.classList.add('swiper-slide');
});

new Swiper('.swiper', {

  loop: true,
  slidesPerView: 2,
  autoplay: {delay: 2000},

  navigation: {
    nextEl: '.album__right',
    prevEl: '.album__left',
  },

});
