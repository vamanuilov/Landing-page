const completeBlock = document.getElementById('completeBlockWrap')

document.getElementById('userInfoSubmit').addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()
  if (completeBlock.classList.contains('hidden')) {
    completeBlock.classList.remove('hidden')
  }
})
