const profileEditButton = document.querySelector('.profile__edit');
const popupAbout = document.querySelector('.popup_type_edit');
const buttonCloseAboutPopup = popupAbout.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const addButton = document.querySelector('.profile__button');
const addPicture = document.querySelector('.popup_add-picture');
const addPictureClouse = addPicture.querySelector('.popup__close');
const profileForm = popupAbout.querySelector('.popup__form');
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const addPicturePopup = document.querySelector('.popup_add-picture');
const newCardForm = addPicturePopup.querySelector('.popup__form');
const newCardMestoInput = newCardForm.querySelector('.popup__input_type_mesto');
const newCardUrlInput = newCardForm.querySelector('.popup__input_type_url');
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
function formRest(popupElement) {
    const formElement = popupElement.querySelector('.popup__form');
    if (formElement) {
        formElement.reset();
    }
}
function resetErrorMessages(formElement) {
    const inputElements = formElement.querySelectorAll('.popup__input');
    inputElements.forEach(inputElement => {
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        hideError(inputElement, errorElement, 'popup__input_state_invalid');
    });
}


profileEditButton.addEventListener('click', () => {
    openPopup(popupAbout);
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;

});

addButton.addEventListener('click', () => {
    openPopup(addPicture);
    setPopupFormButtonState(addPicture, validationConfig);
});

buttonCloseAboutPopup.addEventListener('click', () => {
    closePopup(popupAbout);
    formRest(popupAbout);
    resetErrorMessages(popupAbout.querySelector('.popup__form'));
});
addPictureClouse.addEventListener('click', () => {
    closePopup(addPicture);
    formRest(addPicture);
    resetErrorMessages(addPicture.querySelector('.popup__form'));
});
showClose.addEventListener('click', () => closePopup(show));

profileForm.addEventListener('submit', function(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(popupAbout);
});

const addCard = (cardData) => {
    const newCard = createCard(cardData);
    elements.prepend(newCard);
};

const createCard = ({ name, link }) => {
    const cloneCardElement = cardTemplate.cloneNode(true);
    const cardImage = cloneCardElement.querySelector('.card__image');
    const cardName = cloneCardElement.querySelector('.card__title');
    const deleteButton = cloneCardElement.querySelector('.card__delete');
    const like = cloneCardElement.querySelector('.card__like');

    cardImage.src = link;
    cardImage.alt = name;
    cardName.textContent = name;

    like.addEventListener('click', () => {
        like.classList.toggle('card__like_active');
    });

    const deleteCard = (event) => {
        const card = event.target.closest('.card');
        card.remove();
    };
    deleteButton.addEventListener('click', deleteCard);

    cardImage.addEventListener('click', () => {
        openPopup(show);
        showImage.src = link;
        showImage.alt = name;
        showCaption.textContent = name;
    });

    return cloneCardElement;
};

newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cardData = {
        name: newCardMestoInput.value,
        link: newCardUrlInput.value
    };
    addCard(cardData);
    newCardForm.reset()
    closePopup(addPicturePopup);
});

initialCards.forEach(card => {
    addCard(card);
});

function closePopupClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

popupAbout.addEventListener('click', closePopupClick);
addPicture.addEventListener('click', closePopupClick);
show.addEventListener('click', closePopupClick);

function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}