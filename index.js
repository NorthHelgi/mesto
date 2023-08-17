const profileEditButton = document.querySelector('.profile__edit');
const popupAbout = document.querySelector('.popup_type_edit');
const buttonClosePopup = popupAbout.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const addButton = document.querySelector('.profile__button');
const addPicture = document.querySelector('.popup_add-picture');
const addPictureClouse  = addPicture.querySelector('.popup__close');
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
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', () => {
    openPopup(popupAbout);
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
});

addButton.addEventListener('click', () => openPopup(addPicture));
buttonClosePopup.addEventListener('click', () => closePopup(popupAbout));
addPictureClouse.addEventListener('click', () => closePopup(addPicture));
showClose.addEventListener('click', () => closePopup(show));

profileForm.addEventListener('submit', function (event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(popupAbout);
});

const addCard = (name, link) => {
    const newCard = createCard(name, link);
    elements.prepend(newCard);
};

const createCard = (name, link) => {
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
    addCard(newCardMestoInput.value, newCardUrlInput.value);
    newCardForm.reset();
    closePopup(addPicturePopup);
});

initialCards.forEach(card => {
    addCard(card.name, card.link);
});
