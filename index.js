const profileEditButton = document.querySelector('.profile__edit');
const popupAbout = document.querySelector('.popup_type_edit');
const buttonCloseAboutPopup = popupAbout.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');

function togglePopup() {
    popupAbout.classList.toggle('popup_opened');
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
}

profileEditButton.addEventListener('click', togglePopup);
buttonCloseAboutPopup.addEventListener('click', togglePopup);


const profileForm = document.querySelector('.popup__form');
profileForm.addEventListener('submit', function (event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    togglePopup();
});

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const elements = document.querySelector('.elements');
const cardTemplate = document.getElementById('card-template').content;

const addCard = (name, link) => {
    const cloneCardElement = cardTemplate.cloneNode(true);
    const cardImage = cloneCardElement.querySelector('.card__image');
    const cardName = cloneCardElement.querySelector('.card__title');


    cardImage.src = link;
    cardImage.alt = name;
    cardName.textContent = name;

    const like = cloneCardElement.querySelector('.card__like');
    like.addEventListener('click', () => {
        like.classList.toggle('card__like_active');
    });

    const deleteButton = cloneCardElement.querySelector('.card__delete');
    function deleteCard(event) {
        const card = event.target.closest('.card');
        card.remove();
    }

    deleteButton.addEventListener('click', deleteCard);

    const show = document.querySelector('.show');
    const showClose = document.querySelector('.show__close');
    const showImage = document.querySelector('.show__image');
    const showCaption = document.querySelector('.show__caption');

    cardImage.addEventListener('click', () => {
        show.classList.toggle('show_opened');
        showImage.src = link;
        showImage.alt = name;
        showCaption.textContent = name;
    });


    const toggleClosePicture = () => {
        show.classList.remove('show_opened');
    };

    showClose.addEventListener('click', toggleClosePicture);

    elements.insertBefore(cloneCardElement, elements.firstChild);
}
initialCards.forEach(card => {
    addCard(card.name, card.link);
});

const addButton = document.querySelector('.profile__button');
const addPicture = document.querySelector('.add-picture');
const buttonCloseAddPicture = addPicture.querySelector('.add-picture__close');
const toggleAddPicture = () => {
    addPicture.classList.toggle('add-picture_opened');
};

buttonCloseAddPicture.addEventListener('click', toggleAddPicture);
addButton.addEventListener('click', toggleAddPicture);


const addPictureForm = document.querySelector('.add-picture__form');

addPictureForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = addPictureForm.querySelector('.add-picture__input_type_name');
    const linkInput = addPictureForm.querySelector('.add-picture__input_type_link');

    const name = nameInput.value;
    const link = linkInput.value;

    if (name && link) {
        addCard(name, link);

        nameInput.value = '';
        linkInput.value = '';

        toggleAddPicture();
    }
});



