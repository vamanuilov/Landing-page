import { isNotEmpty, formUsername, fileUpload, formUserGender, formSubmitButton } from './dynamicProgress.js'
import { file } from './fileController.js'

const nameRegex = /^[a-zA-Zа-яА-Я-]{1,52}$/
const textRegex = /^[a-zA-Zа-яА-Я-\s]{1,52}$/
const dateRegex = /^(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})*$/

const formDate = document.getElementById('formDate')

export const showErrorLabel = (elementId) => {
  document.getElementById(elementId).classList.add('error')
  document.querySelector(`label[for="${elementId}"]`).classList.add('label-error')
}

export const hideErrorLabel = (elementId) => {
  document.getElementById(elementId).classList.remove('error')
  document.querySelector(`label[for="${elementId}"]`).classList.remove('label-error')
}

export const addValidation = () => {
  formUsername.addEventListener('change', (inputElement) => {
    if (!nameRegex.test(inputElement.target.value)) {
      showErrorLabel(inputElement.target.id)
    }
  })

  formUsername.addEventListener('input', (inputElement) => {
    if (inputElement.target.classList.contains('error') && nameRegex.test(inputElement.target.value)) {
      hideErrorLabel(inputElement.target.id)
    }
  })

  document
    .querySelector('.form-additional-info')
    .querySelectorAll('input[type=text]')
    .forEach((el) => {
      el.addEventListener('change', (inputElement) => {
        if (!textRegex.test(inputElement.target.value)) {
          showErrorLabel(inputElement.target.id)
        }
      })

      el.addEventListener('input', (inputElement) => {
        if (inputElement.target.classList.contains('error') && textRegex.test(inputElement.target.value)) {
          hideErrorLabel(inputElement.target.id)
        }
      })
    })

  formDate.addEventListener('blur', (inputElement) => {
    const inputDate = new Date(inputElement.target.value).toLocaleDateString('ru-RU')

    if (!dateRegex.test(inputDate)) {
      showErrorLabel(inputElement.target.id)
    }
  })

  formDate.addEventListener('input', (inputElement) => {
    const inputDate = new Date(inputElement.target.value).toLocaleDateString('ru-RU')

    if (inputElement.target.classList.contains('error') && dateRegex.test(inputDate)) {
      hideErrorLabel(inputElement.target.id)
    }
  })

  formSubmitButton.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    const completeBlock = document.getElementById('completeBlockWrap')

    const isTextValid = [...document.getElementById('userForm').querySelectorAll('input[type=text]')].reduce(
      (acc, element) => {
        const { value, id } = element
        if (id === 'formUsername' && !isNotEmpty(value) && !nameRegex.test(value)) {
          showErrorLabel(id)
          return false
        }
        if (!isNotEmpty(value) && textRegex.test(value)) {
          showErrorLabel(id)
          return false
        }
        return acc && true
      },
      true
    )

    const isDateValid =
      isNotEmpty(formDate.value) && dateRegex.test(new Date(formDate.value).toLocaleDateString('ru-RU'))
    const isSelectNotEmpty = isNotEmpty(formUserGender.value)
    const isFileNotEmpty = isNotEmpty(fileUpload.value) || file?.type.includes('image')

    if (!isDateValid) {
      showErrorLabel(formDate.id)
    }

    if (!isSelectNotEmpty) {
      showErrorLabel(formUserGender.id)
    }

    if (!isFileNotEmpty) {
      showErrorLabel(fileUpload.id)
    }

    if (isFileNotEmpty && isSelectNotEmpty && isDateValid && isTextValid) {
      completeBlock.classList.remove('hidden')
      event.target.disabled = true
    }
  })
}
