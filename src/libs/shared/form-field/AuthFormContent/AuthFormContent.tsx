'use client'

import classNames from 'classnames/bind'
import styles from './AuthFormContent.module.scss'
import FieldLabel from '@libs/shared/input/FieldLabel/FieldLabel'
import TextFieldConnect from '../TextFieldConnect'
import Button from '@libs/shared/button/Button'

const cx = classNames.bind(styles)

type AuthFormContentProps = {
  placeholder: string
  onClose: () => void
  fieldName?: string
  disabled?: boolean
}

const AuthFormContent = ({
  placeholder,
  onClose,
  fieldName = 'password',
  disabled = false,
}: AuthFormContentProps) => {
  return (
    <>
      <div className={cx('password')}>
        <FieldLabel label='비밀번호 입력' />
        <TextFieldConnect
          name={fieldName}
          placeholder={placeholder}
          type='password'
          rules={{
            validate: value => value.trim() !== '' || '필수 입력사항입니다.',
          }}
        />
      </div>
      <div className={cx('buttonWrapper')}>
        <Button color='bright' size='medium' type='button' onClick={onClose}>취소하기</Button>
        <Button size='medium' type='submit' disabled={disabled}>삭제하기</Button>
      </div>
    </>
  )
}

export default AuthFormContent
