const FILE_SIZE_LIMIT = 5

const documentLabel = document.querySelector('.custom-document-upload')

const removeFile = () => {
  document.getElementById('filePreview').classList.add('hidden')
}

const previewFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function () {
    const img = document.getElementById('previewImg')
    img.src = reader.result
    document.getElementById('filePreview').classList.remove('hidden')
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
  document.getElementById('document-upload').addEventListener('change', handleFile)
  document.getElementById('trashCan').addEventListener('click', removeFile)
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    documentLabel.addEventListener(eventName, (event) => {
      event.preventDefault()
      event.stopPropagation()
    })
  })

  documentLabel?.addEventListener('dragenter', () => {
    documentLabel.classList.add('highlight')
  })

  documentLabel?.addEventListener('dragleave', () => {
    documentLabel.classList.remove('highlight')
  })

  documentLabel?.addEventListener('drop', (data) => {
    let [file] = data.dataTransfer.files
    documentLabel.classList.remove('highlight')
    console.log('file', file)
    if (!file.type.includes('image') || file.size > FILE_SIZE_LIMIT * 1024 * 1024) {
      documentLabel.classList.add('error')
    } else {
      previewFile(file)
    }
  })
}

export default init
