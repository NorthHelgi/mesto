const profileEditButton = document.querySelector('.profile__edit');
const popupAbout = document.querySelector('.popup_type_edit');
const buttonCloseAboutPopup = popupAbout.querySelector('.popup__close');
const profileTitle = document.querySelector('.ptofile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const saveButton = document.querySelector('.popup__save');

const nameInput = document.querySelector('input[name="name"]');
const nameAbout = document.querySelector('input[name="about"]');

function togglePopup() {
  popupAbout.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', togglePopup);
buttonCloseAboutPopup.addEventListener('click', togglePopup);

nameInput.value = profileTitle.textContent;
nameAbout.value = profileSubtitle.textContent;

saveButton.addEventListener('click', function() {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = nameAbout.value;
  togglePopup();
});