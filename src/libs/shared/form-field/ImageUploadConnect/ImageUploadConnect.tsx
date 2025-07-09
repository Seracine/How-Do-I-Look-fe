'use client'

import Hint from '@libs/shared/input/Hint/Hint'
import { Controller, ControllerProps, FieldPath, FieldValues, useController, useFormContext } from 'react-hook-form'
import classNames from 'classnames/bind'
import styles from './ImageUploadConnect.module.scss'
import Button from '@libs/shared/button/Button'
import { useRef, useState, useEffect } from 'react'
import uploadImage from './uploadImage'
import Icon from '@libs/shared/icon/Icon'
import Image from 'next/image'

const cx = classNames.bind(styles)

type ImageUploadConnectProps<
  F extends FieldValues,
  N extends FieldPath<F>
> = {
  name: N
  rules?: ControllerProps<F, N>['rules']
}

const MAX_IMAGE_COUNT = 5 // 최대 이미지 개수 제한 상수

const ImageUploadConnect = <
  F extends FieldValues,
  N extends FieldPath<F>
>({
  name,
  rules,
}: ImageUploadConnectProps<F, N>) => {
  const { setValue, control } = useFormContext()

  const { fieldState: { error }, field: { value } } = useController({ control, name })
  const inputRef = useRef<HTMLInputElement>(null)

  const [imageUrls, setImageUrls] = useState<string[]>((value || []) as string[])

  useEffect(() => {
    setImageUrls((value || []) as string[])
  }, [value])

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      const files = Array.from(e.target.files)

      if (imageUrls.length + files.length > MAX_IMAGE_COUNT) {
        alert(`이미지는 최대 ${MAX_IMAGE_COUNT}개까지 업로드할 수 있습니다.`)
        e.target.value = '' // 파일 선택 창 초기화
        return
      }

      const uploadImageUrls = (await Promise.all(
        files.map((file) => uploadImage(file)),
      )).filter(Boolean) as string[]

      if (uploadImageUrls.length > 0) {
        const newTotalImageUrls = [...imageUrls, ...uploadImageUrls]
        setValue(name as string, newTotalImageUrls, { shouldValidate: true })
        setImageUrls(newTotalImageUrls)
      }
    }
    if (e.target) {
      e.target.value = '' // 파일 선택 창 초기화
    }
  }

  const handleRemoveImage = (url: string) => {
    const updatedImageUrls = imageUrls.filter((imageUrl) => imageUrl !== url)
    setValue(name as string, updatedImageUrls, { shouldValidate: true })
    setImageUrls(updatedImageUrls)
  }

  const canAddMoreImages = imageUrls.length < MAX_IMAGE_COUNT

  return (
    <div className={cx('container')}>
      <div className={cx('labelContainer')}>
        <div className={cx('label')}>사진 업로드 ({imageUrls.length}/{MAX_IMAGE_COUNT})</div>
        <Controller
          name={name}
          rules={rules}
          render={() => (
            <label>
              <input
                type='file'
                onChange={handleUploadImage}
                multiple
                accept="image/*"
                hidden
                ref={inputRef}
                disabled={!canAddMoreImages}
              />
              <Button
                type='button'
                onClick={() => inputRef.current?.click()}
                disabled={!canAddMoreImages}
                style={{ opacity: canAddMoreImages ? 1 : 0.5, cursor: canAddMoreImages ? 'pointer' : 'not-allowed' }}
              >
                파일 찾기
              </Button>
            </label>
          )}
        />
      </div>
      {error?.message && <Hint message={error.message} />}
      {!canAddMoreImages && (
        <p className={cx('limitExceededMessage')}>최대 이미지 개수를 초과했습니다.</p>
      )}
      <div className={cx('previewContainer')}>
        {imageUrls.map((url, idx) => (
          <div key={idx} className={cx('imageContainer')}>
            <div className={cx('imageWrapper')}>
              <Image src={url} alt='미리보기 이미지' width={200} height={300} className={cx('image')} />
            </div>
            <button type='button' onClick={() => { handleRemoveImage(url) }} className={cx('button')}>
              <Icon name='cancel' alt='이미지 삭제 아이콘' width={40} height={40} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUploadConnect
