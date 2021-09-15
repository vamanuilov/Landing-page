import { FILE_SIZE_LIMIT } from './fileController.js'

const usernameInput = document.getElementById('form-username')
const genderSelector = document.getElementById('form-user-gender')
const additionalInfoBlock = document.querySelector('.form-additional-info')
const fileInputBlock = document.querySelector('.file-upload-block')
const fileInput = document.getElementById('file-upload')
const formSubmitButton = document.getElementById('userInfoSubmit')

const validateValue = (value) => value !== 'undefined' && value !== '' && value !== ' '

usernameInput.addEventListener('input', (el) => {
  if (validateValue(el.target.value) && genderSelector.value && additionalInfoBlock.classList.contains('hidden')) {
    additionalInfoBlock.classList.remove('hidden')
  }
})

genderSelector.addEventListener('change', (el) => {
  if (validateValue(usernameInput.value) && el.target.value) {
    additionalInfoBlock.classList.remove('hidden')
  }
})

additionalInfoBlock.querySelectorAll('input').forEach((element, id, array) => {
  element.addEventListener('input', () => {
    if ([...array].every((input) => validateValue(input.value)) && fileInputBlock.classList.contains('hidden')) {
      fileInputBlock.classList.remove('hidden')
    }
  })
})

fileInput.addEventListener('change', (event) => {
  const { files } = event.target
  if ((files[0].type.includes('image') || files[0].size < FILE_SIZE_LIMIT * 1024 * 1024) && formSubmitButton.disabled) {
    formSubmitButton.disabled = false
  }
})
