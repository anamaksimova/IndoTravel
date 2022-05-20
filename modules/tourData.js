import {skl} from './timer.js';
const loadTours = async () => {
  const result = await fetch('tours.json');
  const tourData = await result.json();
  return tourData;
};
const a = ['человек', 'человека', 'человек'];
const selectDate = document.getElementById('tour__date');
const tourPeople = document.getElementById('tour__people');
const priceInfoBtn = document.querySelector('.tour__button');
const reservationDate = document.getElementById('reservation__date');
const reservationPeople = document.getElementById('reservation__people');
document.querySelector('.reservation__price').textContent = `0₽`;
document.querySelector('.reservation__data').textContent = '';
const renderTours = async () => {
  const data = await loadTours();
  reservationDate.options.length = 1;

  const tours = data.map(item => {
    const optionDate = document.createElement('option');
    const optionDate2 = document.createElement('option');
    optionDate.value = item.price;
    optionDate.text = item.date;
    optionDate2.value = item.price;
    optionDate2.text = item.date;
    selectDate.options.add(optionDate);
    reservationDate.options.add(optionDate2);
  });
};


const setPeople = async () => {
  const selectedOption = selectDate.options[selectDate.selectedIndex];
  const data = await loadTours();
  for (let i = 1; i < selectDate.options.length; i++) {
    if (selectedOption.text === selectDate.options[i].text) {
      tourPeople.options.length = 1;
      for (let index = data[i - 1]['min-people']; index <= data[i - 1]['max-people']; index++) {
        const optionPeople = document.createElement('option');
        optionPeople.text = index;
        tourPeople.options.add(optionPeople);
      }
      return;
    }
  }
};

const setPeopleRes = async () => {
  const selectedOptionRes = reservationDate.options[reservationDate.selectedIndex];
  const data = await loadTours();
  for (let i = 1; i < reservationDate.options.length; i++) {
    if (selectedOptionRes.text === reservationDate.options[i].text) {
      reservationPeople.options.length = 1;
      for (let index = data[i - 1]['min-people']; index <= data[i - 1]['max-people']; index++) {
        const optionPeopleRes = document.createElement('option');
        optionPeopleRes.text = index;
        reservationPeople.options.add(optionPeopleRes);
      }
      return;
    }
  }
};

renderTours();
selectDate.addEventListener('change', setPeople);
reservationDate.addEventListener('change', setPeopleRes);
const reservationPrice = () => {
  const ind = reservationDate.selectedIndex;
  const ind2 = reservationPeople.selectedIndex;
  const price =
   reservationDate.options[ind].value * reservationPeople.options[ind2].text;
  document.querySelector('.reservation__price').textContent = `${price}₽`;
  document.querySelector('.reservation__data').textContent =
    `${reservationDate.options[ind].text},
     ${reservationPeople.options[ind2].text} ${skl((reservationPeople.options[ind2].text) / 1, a)}`;
};

reservationPeople.addEventListener('change', reservationPrice);

priceInfoBtn.addEventListener('click', e => {
  e.preventDefault();
  window.location.hash = 'reservation';

  const ind = selectDate.selectedIndex;
  const ind2 = tourPeople.selectedIndex;
  const price = selectDate.options[ind].value * tourPeople.options[ind2].text;

  reservationDate.options[ind].selected = `selected`;
  reservationPeople.options[ind2].selected = 'selected';

  document.querySelector('.reservation__data').textContent =
    `${reservationDate.options[ind].text}, 
    ${tourPeople.options[ind2].text} ${skl((tourPeople.options[ind2].text) / 1, a)}`;

  document.querySelector('.reservation__price').textContent = `${price}₽`;
});


const fetchRequest = async (url, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      if (callback) callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(err);
  }
};

const name = document.querySelector('#reservation__name');
const phone = document.querySelector('#reservation__phone');
const reservationForm = document.querySelector('.reservation__form');
reservationForm.addEventListener('submit', e => {
  e.preventDefault();
  fetchRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: {
      date: reservationDate.options[reservationDate.selectedIndex].text,
      people: reservationPeople.options[reservationPeople.selectedIndex].text,
      name: name.value,
      phone: phone.value,

    },
    callback(err, data) {
      if (err) {
        reservationForm.textContent = `Чтото пошло не так. Ошибка: ${err}`;
      }

      reservationForm.textContent =
      `Заявка успешно отправлена, номер заявки ${data.id}`;
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
const footerForm = document.querySelector('.footer__form');
const footerFormTitle = document.querySelector('.footer__form-title');
const footerText = document.querySelector('.footer__text');
const footerInput = document.querySelector('.footer__input');

footerForm.addEventListener('submit', e => {
  e.preventDefault();
  fetchRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: {
      email: footerInput.value,
    },
    callback(err, data) {
      if (err) {
        footerForm.textContent = `Чтото пошло не так. ${err}`;
      }

      footerFormTitle.textContent = `Ваша заявка успешно отправлена`;
      footerText.textContent = `Наши менеджеры свяжутся с вами в течении 3-х рабочих дней`;
      footerText.style.border = 'solid 2px red';
      footerText.style.padding = '30px';
      document.querySelector('.footer__input-wrap').style.display = 'none';
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

