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
const dotsWrapper = document.querySelector('.dots-block')

const setActiveDot = () => {
  const dots = document.querySelector('.dots-block').querySelectorAll('div')

  dots.forEach((dot, index) => {
    if (dot.classList.contains('active-dot')) {
      dot.classList.remove('active-dot')
    }
    if ((index === 0 && slideIndex.getIndex() === slides.length - 1) || index === slideIndex.getIndex()) {
      dot.classList.add('active-dot')
    }
  })
}

const moveToFirstSlide = () => {
  slideWrapper.classList.add('no-transition')
  slideIndex.setIndex(0)
  slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())

  setTimeout(() => {
    slideWrapper.classList.remove('no-transition')
    slideIndex.plusIndex()
    slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())
    setActiveDot()
  }, 10)

  return slideWrapper.removeEventListener('transitionend', moveToFirstSlide)
}

const moveToLastSlide = () => {
  slideWrapper.classList.add('no-transition')
  slideIndex.setIndex(slides.length - 1)
  slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())

  setTimeout(() => {
    slideWrapper.classList.remove('no-transition')
    slideIndex.setIndex(slides.length - 2)
    slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())
    setActiveDot()
  }, 10)
}

export const addSlider = () => {
  slideWrapper.appendChild(slideWrapper.children[0].cloneNode(true))
  slideWrapper.style.setProperty('--slidesCount', slides.length)
  dotsWrapper.style.width = `${(slides.length - 1) * 25}px`

  new Array(slides.length - 1)
    .fill(null)
    .map((el, index) => index)
    .forEach((dotIndex) => {
      const div = document.createElement('div')

      div.addEventListener('click', () => {
        slideIndex.setIndex(dotIndex)
        slideWrapper.style.setProperty('--slideIndex', dotIndex)
        setActiveDot()
      })

      if (dotIndex === slideIndex.getIndex()) {
        div.classList.add('active-dot')
      }

      dotsWrapper.appendChild(div)
    })

  document.getElementById('rightSliderButton').addEventListener('click', () => {
    if (slideIndex.getIndex() === slides.length - 1) {
      slideWrapper.addEventListener('transitionend', moveToFirstSlide)
    } else {
      slideIndex.plusIndex()
      slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())
      setActiveDot()
    }
  })

  document.getElementById('leftSliderButton').addEventListener('click', () => {
    slideIndex.minusIndex()
    if (slideIndex.getIndex() < 0) {
      moveToLastSlide()
    } else {
      slideWrapper.style.setProperty('--slideIndex', slideIndex.getIndex())
      setActiveDot()
    }
  })
}
