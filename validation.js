import { isNotEmpty, formUsername, fileUpload, formUserGender, formSubmitButton } from './dynamicProgress.js'
import { file } from './fileController.js'

const nameRegex = /^[a-zA-Zа-яА-Я-]{1,52}$/
const textRegex = /^[a-zA-Zа-яА-Я-\s]{1,52}$/
const dateRegex = /^(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})*$/
const numberRegex = /[^0-9.]/

const formDate = document.getElementById('formDate')
const textInputs = document.getElementById('userForm').querySelectorAll('input[type=text]')

export const showErrorLabel = (elementId) => {
  document.getElementById(elementId).classList.add('error')
  document.querySelector(`label[for="${elementId}"]`).classList.add('label-error')
}

export const hideErrorLabel = (elementId) => {
  document.getElementById(elementId).classList.remove('error')
  document.querySelector(`label[for="${elementId}"]`).classList.remove('label-error')
}

const isRegexForInputValid = (value, elementId) => {
  switch (elementId) {
    case 'formUsername':
      return nameRegex.test(value)
    case 'formDate':
      return dateRegex.test(value)
    default:
      return textRegex.test(value)
  }
}

const checkTextInput = (value, elementId) => {
  if (!isNotEmpty(value) || !isRegexForInputValid(value, elementId)) {
    showErrorLabel(elementId)
    return false
  }

  return true
}

export const addValidation = () => {
  formUsername.addEventListener('input', (event) => {
    if (event.target.classList.contains('error') && nameRegex.test(event.target.value)) {
      hideErrorLabel(event.target.id)
    }
  })

  formDate.addEventListener('input', (event) => {
    if (event.target.value.length === 2 && !event.inputType.includes('delete')) {
      event.target.value += '.'
    }

    if (event.target.value.length === 5 && !event.inputType.includes('delete')) {
      event.target.value += '.'
    }

    event.target.value = event.target.value.replace(numberRegex, '')
  })

  textInputs.forEach((el) => {
    el.addEventListener('change', (event) => {
      checkTextInput(event.target.value, event.target.id)
    })

    el.addEventListener('input', (event) => {
      if (event.target.classList.contains('error') && isRegexForInputValid(event.target.value, event.target.id)) {
        hideErrorLabel(event.target.id)
      }
    })
  })

  formSubmitButton.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    const completeBlock = document.getElementById('completeBlockWrap')

    const isTextValid = [...textInputs].reduce((acc, element) => {
      const { value, id } = element

      return acc && checkTextInput(value, id)
    }, true)

    const isSelectNotEmpty = isNotEmpty(formUserGender.value)
    const isFileNotEmpty = isNotEmpty(fileUpload.value) || file?.type.includes('image')

    if (!isSelectNotEmpty) {
      showErrorLabel(formUserGender.id)
    }

    if (!isFileNotEmpty) {
      showErrorLabel(fileUpload.id)
    }

    if (isFileNotEmpty && isSelectNotEmpty && isTextValid) {
      completeBlock.classList.remove('hidden')
      event.target.disabled = true
    }
  })
}
