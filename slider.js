const slideIndexController = () => {
  let slideIndex = 1
  return {
    getIndex: () => slideIndex,
    plusIndex: () => {
      slideIndex += 1
    },
    minusIndex: () => {
      slideIndex -= 1
    },
    setIndex: (newSlideIndex) => {
      slideIndex = newSlideIndex
    },
  }
}

const slideIndex = slideIndexController()
const slides = document.getElementsByClassName('slider-image')
const dots = document.querySelector('.dots-block').querySelectorAll('div')

const showSlide = () => {
  ;[...slides].forEach((slide, index) => {
    if (slide.classList.contains('showen')) {
      slide.classList.remove('showen')
      dots[index].classList.remove('active-dot')
    }
    if (index + 1 === slideIndex.getIndex()) {
      slide.classList.add('showen')
      dots[index].classList.add('active-dot')
    }
  })
}

;[...dots].forEach((dot, index) => {
  dot.addEventListener('click', () => {
    slideIndex.setIndex(index + 1)
    showSlide()
  })
})

document.getElementById('rightSliderButton').addEventListener('click', () => {
  slideIndex.plusIndex()
  if (slideIndex.getIndex() > slides.length) {
    slideIndex.setIndex(1)
  }
  showSlide()
})

document.getElementById('leftSliderButton').addEventListener('click', () => {
  slideIndex.minusIndex()
  if (slideIndex.getIndex() < 1) {
    slideIndex.setIndex(slides.length)
  }
  showSlide()
})
