export default class Card {
    constructor(cardTemplate, { name, link }) {
        this.cardTemplate = cardTemplate;
        this.name = name;
        this.link = link;
        this.cardElement = this.createCard();

        this.elements = document.querySelector('.elements');
    }

    createCard() {
        const cloneCardElement = this.cardTemplate.cloneNode(true);
        const cardImage = cloneCardElement.querySelector('.card__image');
        const cardName = cloneCardElement.querySelector('.card__title');
        const deleteButton = cloneCardElement.querySelector('.card__delete');
        const like = cloneCardElement.querySelector('.card__like');

        cardImage.src = this.link;
        cardImage.alt = this.name;
        cardName.textContent = this.name;

        like.addEventListener('click', () => {
            like.classList.toggle('card__like_active');
        });

        deleteButton.addEventListener('click', this._deleteCard.bind(this));

        cardImage.addEventListener('click', this._openPopupImage.bind(this));

        return cloneCardElement;
    }

    _openPopupImage() {
        const show = document.querySelector('.popup_show');
        const showImage = show.querySelector('.popup__image');
        const showCaption = show.querySelector('.popup__caption');

        this._openPopup(show);
        showImage.src = this.link;
        showImage.alt = this.name;
        showCaption.textContent = this.name;
    }

    _deleteCard(event) {
        const card = event.target.closest('.card');
        card.remove();
    }

    _addCard(cardData) {
        const card = new Card(this.cardTemplate, cardData);
        this.elements.prepend(card.cardElement);
    }

    _handleFormSubmit(formElement, popupElement) {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            const cardName = event.currentTarget.querySelector('[name="mesto"]').value;
            const cardLink = event.currentTarget.querySelector('[name="url"]').value;


            const cardData = {name: cardName, link: cardLink};
            this._addCard(cardData);
            this._closePopup(popupElement);
            formElement.reset();
        });
    }

    _openPopup(popupElement) {
        popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupOnEsc.bind(this));
    }

    _closePopup(popupElement) {
        popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupOnEsc.bind(this));
    }

    _closePopupOnEsc(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            if (openedPopup) {
                this._closePopup(openedPopup);
            }
        }
    }
}
