const completeBlock = document.getElementById('completeBlockWrap')
const userFormSubmitBtn = document.getElementById('userInfoSubmit')

  userFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (completeBlock.classList.contains('hidden')) {
      completeBlock.classList.remove('hidden')
      userFormSubmitBtn.disabled = true
    }
  })
