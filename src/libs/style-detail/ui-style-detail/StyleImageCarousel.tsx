'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import classNames from 'classnames/bind'
import styles from './StyleImageCarousel.module.scss'
import { RefObject, useCallback, useRef, useState } from 'react'
import Icon from '@libs/shared/icon/Icon'

const cx = classNames.bind(styles)

type StyleImageCarouselProps = {
  imageUrls: string[]
}

const StyleImageCarousel = ({ imageUrls }: StyleImageCarouselProps) => {
  const sliderRef: RefObject<Slider> = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const previous = useCallback(() => {
    sliderRef?.current?.slickPrev()
    setCurrentSlide((prev) => prev - 1)
  }, [])
  const next = useCallback(() => {
    sliderRef?.current?.slickNext()
    setCurrentSlide((prev) => prev + 1)
  }, [])

  const settings = {
    arrows: false,
    infinite: false,
  }

  return (
    <div className={cx('wrapper')}>
      <button
        onClick={previous}
        className={cx('arrow', 'prev')}
        disabled={currentSlide === 0}
      >
        <Icon name='carousel-arrow' rotate={180} width={8} height={12} alt='이전 이미지 화살표' />
      </button>
      <button
        onClick={next}
        className={cx('arrow', 'next')}
        disabled={currentSlide === imageUrls.length - 1}
      >
        <Icon name='carousel-arrow' width={8} height={12} alt='다음 이미지 화살표' />
      </button>
      <Slider ref={sliderRef} {...settings}>
        {imageUrls.map((imageUrl, idx) => (
          <Image
            key={idx}
            src={imageUrl}
            alt={`${idx + 1}번 스타일 이미지`}
            width={680}
            height={960}
            className={cx('image')}
          />
        ))}
      </Slider>
    </div>
  )
}

export default StyleImageCarousel
