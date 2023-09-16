'use strict';

const inputs = document.querySelectorAll('.footer__input');
const inputName = document.getElementById('inputName');
const inputAddress = document.getElementById('inputAddress');
const inputPhone = document.getElementById('inputPhone');
const submitBtn = document.querySelector('.footer__btn');
const popup = document.querySelector('.popup');
const cancelPopupBtn = document.querySelector('.popup__close');
const menuBtn = document.querySelector('.header__menu-burger');
const menuList = document.querySelector('.header__menu-list');

// подписались на изменение input'а ввода имени и запрещаем символ точки
inputName.addEventListener('input', (e) => {
	e.target.value = e.target.value.replace(/\./, '');
	e.target.classList.contains("footer__input-error") && e.target.classList.remove('footer__input-error');
});

inputAddress.addEventListener('input', (e) => {
	e.target.classList.contains("footer__input-error") && e.target.classList.remove('footer__input-error');
});

// подписались на изменение input'а ввода телефона и запрещаем любые символы, кроме цифр
inputPhone.addEventListener('input', (e) => {
	e.target.value = e.target.value.replace(/\D/, '');
	e.target.classList.contains("footer__input-error") && e.target.classList.remove('footer__input-error');
});


submitBtn.addEventListener('click', (e) => {
	e.preventDefault();

	// отрисовка валидации
	inputs.forEach(input => {
		if (!input.value) {
			input.classList.add('footer__input-error');
			input.classList.add('footer__input-error::placeholder');
		} else {
			input.classList.remove('footer__input-error');
			input.classList.remove('footer__input-error::placeholder');
		}
	});

	// отправка данных на сервер
	if (inputName.value && inputAddress.value && inputPhone.value) {
		const data = {
			name: inputName.value,
			deliveryAddress: inputAddress.value,
			phone: inputPhone.value,
		};

		fetch('https://fakeapi.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));

		// сбрасываем input'ы
		inputName.value = '';
		inputAddress.value = '';
		inputPhone.value = '';

		// включамем popup
		popup.classList.remove('popup-hidden');
	}
});

cancelPopupBtn.addEventListener('click', () => {
	popup.classList.add('popup-hidden');
});

menuBtn.addEventListener('click', () => {
	menuList.classList.toggle('header__menu-list-block');
});
