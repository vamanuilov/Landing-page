import { FILE_SIZE_LIMIT } from './fileController.js'
import { hideErrorLabel } from './validation.js'

const usernameInput = document.getElementById('formUsername')
const genderSelector = document.getElementById('formUserGender')
const additionalInfoBlock = document.querySelector('.form-additional-info')
const fileInputBlock = document.querySelector('.file-upload-block')
const fileInput = document.getElementById('fileUpload')
const formSubmitButton = document.getElementById('userInfoSubmit')

export const isNotEmpty = (value) => value !== 'undefined' && value !== '' && value !== ' '

usernameInput.addEventListener('input', (el) => {
  if (isNotEmpty(el.target.value) && genderSelector.value && additionalInfoBlock.classList.contains('hidden')) {
    additionalInfoBlock.classList.remove('hidden')
  }
})

genderSelector.addEventListener('change', (el) => {
  if (el.target.classList.contains('error')) {
    hideErrorLabel(el.target.id)
  }

  if (!el.target.classList.contains('selected')) {
    el.target.classList.add('selected')
  }

  if (isNotEmpty(usernameInput.value) && el.target.value) {
    additionalInfoBlock.classList.remove('hidden')
    additionalInfoBlock.querySelectorAll('input').forEach((el) => (el.tabIndex = '0'))
  }
})

additionalInfoBlock.querySelectorAll('input').forEach((element, id, array) => {
  element.addEventListener('input', () => {
    if ([...array].every((input) => isNotEmpty(input.value)) && fileInputBlock.classList.contains('hidden')) {
      fileInputBlock.classList.remove('hidden')
    }
  })
})

fileInput.addEventListener('change', (event) => {
  if (event.target.classList.contains('error')) {
    hideErrorLabel(event.target.id)
  }
  const { files } = event.target
  if ((files[0].type.includes('image') || files[0].size < FILE_SIZE_LIMIT * 1024 * 1024) && formSubmitButton.disabled) {
    formSubmitButton.disabled = false
  }
})
