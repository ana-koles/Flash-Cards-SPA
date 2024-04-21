import { ChangeEvent, useState } from 'react'

import { ImgIcon } from '@/assets'
import defaultImg from '@/assets/images/defaultImg.png'
import { CardResponse } from '@/services'

import s from './image-uploader.module.scss'

type ImageUploaderProps = {
  card?: CardResponse
  handleChangeFile: (file: File | null) => void
  imageKey: 'answerImg' | 'questionImg'
}

export const ImageUploader = ({ card, handleChangeFile, imageKey }: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileLoading = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      setFile(file)
      handleChangeFile(file)
    }
  }

  const createSrc = () => {
    if (file) {
      return URL.createObjectURL(file)
    }
    if (card && typeof card[imageKey] === 'string') {
      return card[imageKey]
    }

    return defaultImg
  }

  const coverFinalClass = () => {
    if (card?.answerImg && imageKey === 'answerImg') {
      return s.cover
    }
    if (card?.questionImg && imageKey === 'questionImg') {
      return s.cover
    }

    return ''
  }

  const classNames = {
    cover: coverFinalClass(),
    coverWrapper: s.coverWrapper,
    fileInputBtn: s.fileInputBtn,
    fileInputWrapper: s.fileInputWrapper,
    inputLabel: s.inputLabel,
    loaderWrapper: s.loaderWrapper,
  }

  return (
    <div className={classNames.loaderWrapper}>
      <div className={classNames.coverWrapper}>
        <img className={classNames.cover} src={createSrc()} />
      </div>
      <label className={classNames.fileInputBtn} htmlFor={imageKey}>
        <ImgIcon />
        Change Image
      </label>
      <input id={imageKey} onChange={handleFileLoading} type={'file'} />
    </div>
  )
}
