export default  class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
    }

    _showError(inputElement, errorElement) {
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideError(inputElement, errorElement) {
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState(buttonElement, isActive) {
        if (isActive) {
            buttonElement.classList.remove(this._config.inactiveButtonClass);
            buttonElement.disabled = false;
        } else {
            buttonElement.classList.add(this._config.inactiveButtonClass);
            buttonElement.disabled = true;
        }
    }

    _checkInputValidity(inputElement) {
        const isInputValid = inputElement.validity.valid;
        const errorElement = this._formElement.querySelector(this._config.errorIdPattern.replace('{{name}}', inputElement.name));
        const submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._toggleButtonState(submitButtonElement, this._formElement.checkValidity());
        if (isInputValid) {
            this._hideError(inputElement, errorElement);
        } else {
            this._showError(inputElement, errorElement);
        }
    }

    _setEventListeners() {
        const inputList = this._formElement.querySelectorAll(this._config.inputSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
            });
        });

        const submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._toggleButtonState(submitButtonElement, this._formElement.checkValidity());

        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}

