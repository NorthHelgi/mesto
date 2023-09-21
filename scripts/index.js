import Card from './Card.js';
import FormValidator from './FormValidator.js'
import {initialCards} from './constants.js';

const profileEditButton = document.querySelector('.profile__edit');
const popupAbout = document.querySelector('.popup_type_edit');
const buttonCloseAboutPopup = popupAbout.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const addButton = document.querySelector('.profile__button');
const addPicture = document.querySelector('.popup_add-picture');
const addPictureClose = addPicture.querySelector('.popup__close');
const profileForm = popupAbout.querySelector('.popup__form');
const newCardForm = addPicture.querySelector('.popup__form');
const show = document.querySelector('.popup_show');
const showImage = show.querySelector('.popup__image');
const showCaption = show.querySelector('.popup__caption');
const showClose = show.querySelector('.popup__close');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEsc);
}

function formReset(popupElement) {
    const formElement = popupElement.querySelector('.popup__form');
    if (formElement) {
        formElement.reset();
    }
}

profileEditButton.addEventListener('click', () => {
    openPopup(popupAbout);
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
});

addButton.addEventListener('click', () => {
    openPopup(addPicture);
});

buttonCloseAboutPopup.addEventListener('click', () => {
    closePopup(popupAbout);
    formReset(popupAbout);
});

addPictureClose.addEventListener('click', () => {
    closePopup(addPicture);
    formReset(addPicture);
});

showClose.addEventListener('click', () => closePopup(show));

profileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(popupAbout);
});


function closePopupClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

const elements = document.querySelector('.elements');
const cardInstance = new Card(document.querySelector('#card-template').content, { name: "Name", link: "Link" });
cardInstance._handleFormSubmit(newCardForm, addPicture);

initialCards.forEach(cardData => {
    const card = new Card(document.querySelector('#card-template').content, cardData);
    const cardElement = card.cardElement;
    elements.prepend(cardElement);
});

popupAbout.addEventListener('click', closePopupClick);
addPicture.addEventListener('click', closePopupClick);
show.addEventListener('click', closePopupClick);

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__input_state_invalid',
    errorIdPattern: '#{{name}}-error'
};

const formElements = document.querySelectorAll(validationConfig.formSelector);

formElements.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    validator.enableValidation();
});

function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}
