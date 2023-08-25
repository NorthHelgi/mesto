function showError(inputElement, errorElement) {
    inputElement.classList.add('popup__input_state_invalid');
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement) {
    inputElement.classList.remove('popup__input_state_invalid');
    errorElement.textContent = '';
}

function toggleButtonState(buttonElement, isActive) {
    if (isActive) {
        buttonElement.classList.remove('popup__save_invalid');
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add('popup__save_invalid');
        buttonElement.disabled = 'disabled';
    }
}

function checkInputValidity(inputElement, formElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    const submitButtonElement = formElement.querySelector('.popup__save');
    toggleButtonState(submitButtonElement, formElement.checkValidity());
    if (isInputValid) {
        hideError(inputElement, errorElement);
    } else {
        showError(inputElement, errorElement);
    }
}

function setEventListener(formElement) {
    const inputList = formElement.querySelectorAll('.popup__input');
    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity(inputElement, formElement);
        });
    });
    formElement.addEventListener('submit', function(event) {
        event.preventDefault();
    });
}


function enableValidation() {
    const formsList = document.querySelectorAll('.popup__form');
    formsList.forEach(function(formElement) {
        setEventListener(formElement);
    });
}

enableValidation();