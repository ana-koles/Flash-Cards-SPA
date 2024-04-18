import { ChangeEvent, useState } from 'react'

import { ImgIcon } from '@/assets/icons/img'
import defaultImg from '@/assets/images/defaultImg.png'

import s from './image-uploader.module.scss'

type ImageUploaderProps = {
  handleChangeFile: (file: File | null) => void
  imageKey: 'answerImg' | 'questionImg'
}

export const ImageUploader = ({ handleChangeFile, imageKey }: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null)
  const src = file ? URL.createObjectURL(file) : defaultImg

  const handleFileLoading = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      setFile(file)
      handleChangeFile(file)
    }
  }

  return (
    <div>
      <div className={s.imgWrapper}>
        <img src={src} />
      </div>
      <div className={s.fileInputWrapper}>
        <label className={s.fileInputBtn} htmlFor={imageKey}>
          <ImgIcon />
          Change Image
        </label>
        <input id={imageKey} onChange={handleFileLoading} type={'file'} />
      </div>
    </div>
  )
}
