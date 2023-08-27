function showError(inputElement, errorElement, errorClass) {
    inputElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, errorClass) {
    inputElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

function toggleButtonState(buttonElement, isActive, inactiveButtonClass) {
    if (isActive) {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

function checkInputValidity(inputElement, formElement, config) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(config.errorIdPattern.replace('{{name}}', inputElement.name));
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(submitButtonElement, formElement.checkValidity(), config.inactiveButtonClass);
    if (isInputValid) {
        hideError(inputElement, errorElement, config.inputErrorClass);
    } else {
        showError(inputElement, errorElement, config.inputErrorClass);
    }
}

function setPopupFormButtonState(popupElement, config) {
    const formElement = popupElement.querySelector(config.formSelector);
    if (formElement) {
        const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
        toggleButtonState(submitButtonElement, formElement.checkValidity(), config.inactiveButtonClass);
    }
}

function setEventListener(formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity(inputElement, formElement, config);
        });
    });
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(submitButtonElement, formElement.checkValidity(), config.inactiveButtonClass);

    formElement.addEventListener('submit', function(event) {
        event.preventDefault();
    });
}

function enableValidation(config) {
    const formsList = document.querySelectorAll(config.formSelector);
    formsList.forEach(function(formElement) {
        setEventListener(formElement, config);
    });
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_invalid',
    inputErrorClass: 'popup__input_state_invalid',
    errorIdPattern: '#{{name}}-error'
};

enableValidation(validationConfig);
