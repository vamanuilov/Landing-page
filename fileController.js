import { hideErrorLabel, showErrorLabel } from './validation.js'
import { fileUpload, formSubmitButton } from './dynamicProgress.js'

export const FILE_SIZE_LIMIT = 5
export let file

const customFileInput = document.querySelector('.custom-file-upload')
const customUploadText = document.querySelector('.custom-upload-infoblock')
const filePreview = document.getElementById('filePreview')

const removeFile = () => {
  filePreview.classList.add('hidden')
  fileUpload.value = ''
  file = undefined
}

const previewFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function () {
    const img = document.getElementById('previewImg')
    img.src = reader.result
    filePreview.classList.remove('hidden')
  }
  const [name, type] = file.name.split('.')
  const imgName = document.getElementById('previewImgName')
  const imgType = document.getElementById('previewImgTypeAndSize')
  const fileSize = (file.size / (1024 * 1024)).toFixed(2)
  const imgTypeAndSize = `${type.toUpperCase()} ${fileSize} MB`
  imgName.innerText = name
  imgType.innerText = imgTypeAndSize
}

const handleFile = (event) => {
  const { files } = event.target
  if (!files[0].type.includes('image') || files[0].size > FILE_SIZE_LIMIT * 1024 * 1024) {
    showErrorLabel(fileUpload.id)
  } else {
    previewFile(files[0])
    formSubmitButton.disabled = false
  }
}

const addDragAndDropText = () => {
  customFileInput.classList.add('highlight')
  customUploadText.classList.add('highlight')
  customUploadText.querySelectorAll('div').forEach((el) => {
    el.classList.add('highlight')
  })
}

const removeDragAndDropText = () => {
  customFileInput.classList.remove('highlight')
  customUploadText.classList.remove('highlight')
  customUploadText.querySelectorAll('div').forEach((el) => {
    el.classList.remove('highlight')
  })
}

export const addCustomFileController = () => {
  fileUpload.addEventListener('change', handleFile)
  document.getElementById('trashCan').addEventListener('click', removeFile)
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    customFileInput.addEventListener(eventName, (event) => {
      event.preventDefault()
      event.stopPropagation()
    })
  })

  customFileInput?.addEventListener('dragenter', addDragAndDropText)

  customFileInput?.addEventListener('dragleave', removeDragAndDropText)

  customFileInput?.addEventListener('drop', (data) => {
    if (fileUpload.classList.contains('error')) {
      hideErrorLabel(fileUpload.id)
    }
    ;[file] = data.dataTransfer.files
    removeDragAndDropText()
    if (!file.type.includes('image') || file.size > FILE_SIZE_LIMIT * 1024 * 1024) {
      showErrorLabel(fileUpload.id)
    } else {
      previewFile(file)
      formSubmitButton.disabled = false
    }
  })
}
