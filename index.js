const profileEditButton = document.querySelector('.profile__edit');
const popupAbout = document.querySelector('.popup_type_edit');
const buttonCloseAboutPopup = popupAbout.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const saveButton = document.querySelector('.popup__save');

const nameInput = document.querySelector('.popup__form__input__name');
const aboutInput = document.querySelector('.popup__form__input__about');

function togglePopup() {
  popupAbout.classList.toggle('popup_opened');
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
}

profileEditButton.addEventListener('click', togglePopup);
buttonCloseAboutPopup.addEventListener('click', togglePopup);

saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  togglePopup();
});

const profileForm = document.querySelector('.popup__form');
profileForm.addEventListener('submit', function(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  togglePopup();
});