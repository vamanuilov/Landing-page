import { hideErrorLabel, showErrorLabel } from './validation.js'

export const FILE_SIZE_LIMIT = 5

const customFileInput = document.querySelector('.custom-file-upload')
const fileInputButton = document.getElementById('file-upload')
const filePreview = document.getElementById('filePreview')

const removeFile = () => {
  filePreview.classList.add('hidden')
  fileInputButton.value = ''
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
  previewFile(files[0])
}

const init = () => {
  fileInputButton.addEventListener('change', handleFile)
  document.getElementById('trashCan').addEventListener('click', removeFile)
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    customFileInput.addEventListener(eventName, (event) => {
      event.preventDefault()
      event.stopPropagation()
    })
  })

  customFileInput?.addEventListener('dragenter', () => {
    customFileInput.classList.add('highlight')
  })

  customFileInput?.addEventListener('dragleave', () => {
    customFileInput.classList.remove('highlight')
  })

  customFileInput?.addEventListener('drop', (data) => {
    if (fileInputButton.classList.contains('error')) {
      hideErrorLabel(fileInputButton.id)
    }
    let [file] = data.dataTransfer.files
    customFileInput.classList.remove('highlight')
    if (!file.type.includes('image') || file.size > FILE_SIZE_LIMIT * 1024 * 1024) {
      showErrorLabel(fileInputButton.id)
    } else {
      previewFile(file)
    }
  })
}

export default init
