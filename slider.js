const slideIndexController = () => {
  let slideIndex = 0
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
const slideWrapper = document.querySelector('.slider-images-block')
const dots = document.querySelector('.dots-block').querySelectorAll('div')

const moveToFirstSlide = () => {
  slideWrapper.classList.add('no-transition')
  slideIndex.setIndex(0)
  slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())
  return slideWrapper.removeEventListener('transitionend', moveToFirstSlide)
}

const moveToLastSlide = () => {
  slideWrapper.classList.add('no-transition')
  slideIndex.setIndex(slides.length - 1)
  slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())
  setTimeout(() => {
    slideWrapper.classList.remove('no-transition')
    slideIndex.setIndex(slides.length - 1)
    slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())
  }, 10)
}

const showSlide = () => {
  // TODO: fix dots
  // ;[...slides].forEach((slide, index) => {
  //   if (slide.classList.contains('showen')) {
  //     slide.classList.remove('showen')
  //     dots[index].classList.remove('active-dot')
  //   }
  //   if (index === slideIndex.getIndex()) {
  //     slide.classList.add('showen')
  //     dots[index].classList.add('active-dot')
  //   }
  // })
}

export const addSlider = () => {
  slideWrapper.appendChild(slideWrapper.children[0].cloneNode(true))

  // ;[...dots].forEach((dot, index) => {
  //   dot.addEventListener('click', () => {
  //     slideIndex.setIndex(index + 1)
  //     showSlide()
  //   })
  // })

  document.getElementById('rightSliderButton').addEventListener('click', () => {
    if (slideWrapper.classList.contains('no-transition')) {
      slideWrapper.classList.remove('no-transition')
    }

    slideIndex.plusIndex()
    if (slideIndex.getIndex() >= slides.length - 1) {
      slideWrapper.addEventListener('transitionend', moveToFirstSlide)
    }
    slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())
    showSlide()
  })

  document.getElementById('leftSliderButton').addEventListener('click', () => {
    slideIndex.minusIndex()
    if (slideIndex.getIndex() < 0) {
      moveToLastSlide()
    }

    slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())
    showSlide()
  })
}
