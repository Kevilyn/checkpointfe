const spans = document.querySelectorAll("form span")
const inputs = document.querySelectorAll("form input")

function shouldEnableSubmitButton(shouldEnable) {
    const btnSubmit = document.querySelector('form [type=submit]')
    shouldEnable 
        ? btnSubmit.removeAttribute('disabled')
        : btnSubmit.setAttribute('disabled', 'true')
}

function checkFields(fields, page = 'login') {

    if (
        page === 'signup' &&
        firstNameValidation(fields.firstName) &&
        lastNameValidation(fields.lastName) &&
        emailValidation(fields.email) &&
        passwordConfirmValidation(
            fields.password, 
            fields.passwordConfirm
        )
    ) {
        shouldEnableSubmitButton(true)
    }
}

function firstNameValidation(firstName) {
    if (firstName) {
        clearAlert(1)
        return true
    }

    alertUser( 'Por favor preencha o campo acima!', 2 )
    return false
}

function lastNameValidation(lastName) {
    if (lastName) {
        clearAlert(2)
        return true
    }

    alertUser( 'Por favor preencha o campo acima!', 2 )
    return false
}

function emailValidation(email) {
    const pattern = /^[a-z0-9\.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/
    if (pattern.test(email)) {
        clearAlert(3)
        return true     
    }
   
    alertUser( 'Insira um email valido!', 3 )
    return false
}

function passwordConfirmValidation(password, passwordConfirm) {   
    if (password === passwordConfirm) {
        if (!password) {
            alertUser( 'Por favor insira uma senha!', 4 )
            return false
        }

        clearAlert()
        return true
    } else {
        alertUser( 'As senhas devem ser iguais!', 5 )
        return false
    }
}

function alertUser(msg, elPos) {
    const index = elPos - 1
    inputs[index].classList.add("invalidInput")

    elPos != null ? spans[index].innerHTML = msg : null 
    shouldEnableSubmitButton(false)
}

function clearAlert(el) {
    if (el) {
        inputs[el].classList.remove("invalidInput")
    } else {
        inputs.forEach((input) => {
            input.classList.remove("invalidInput")
        })
    }

    spans.forEach(el => el.innerHTML = '')
    shouldEnableSubmitButton(false)
}

export {
    checkFields
}