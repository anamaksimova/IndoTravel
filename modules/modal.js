import loadStyle from './loadStyle.js';
import './tourData.js';
export const showModal = async (err, data) => {
  await loadStyle('../css/modal.css');
  const overlay = document.createElement('div');
  const modalWindow = document.createElement('div');
  const title = document.createElement('h2');
  const descriptionPeople = document.createElement('p');
  const descriptionDates = document.createElement('p');
  const descriptionPrice = document.createElement('p');
  const btnsWrapper = document.createElement('div');
  const btnConfirm = document.createElement('button');
  const btnReject = document.createElement('button');

  overlay.classList.add('overlay', 'overlay_confirm');
  modalWindow.classList.add('modal');
  title.classList.add('modal__title');
  title.textContent = 'Подтверждение заявки';

  descriptionPeople.classList.add('modal__text');
  descriptionPeople.textContent =
  `Бронирование путешествия в Индию на ${data.people} человек`;

  descriptionDates.classList.add('modal__text');
  descriptionDates.textContent = `В даты ${data.date}`;

  descriptionPrice.classList.add('modal__text');
  descriptionPrice.textContent = `Стоимость тура ${data.price}₽ `;

  btnsWrapper.classList.add('modal__button');

  btnConfirm.classList.add('modal__btn', 'modal__btn_confirm');
  btnConfirm.textContent = `Подтверждаю`;

  btnReject.classList.add('modal__btn', 'modal__btn_edit');
  btnReject.textContent = `Изменить данные`;

  overlay.append(modalWindow);
  btnsWrapper.append(btnConfirm, btnReject);
  modalWindow.append(title, descriptionPeople,
      descriptionDates, descriptionPrice, btnsWrapper);

  document.body.append(overlay);
  return new Promise(resolve => {
    btnConfirm.addEventListener('click', () => {
      console.log('1');
      overlay.remove();
      resolve(true);
    });

    btnReject.addEventListener('click', () => {
      console.log('2');
      overlay.remove();
      resolve(false);
    });
  });
};
