import { ChangeEvent } from 'react'

import { ImgIcon } from '@/assets/icons/img'

import s from './image-uploader.module.scss'

type ImageUploaderProps = {
  handleChangeFile: (file: File | null) => void
  id: string
  src: string
}

export const ImageUploader = ({ handleChangeFile, id, src }: ImageUploaderProps) => {
  const handleFileLoading = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      handleChangeFile(file)
    }
  }

  return (
    <div>
      <div className={s.imgWrapper}>
        <img src={src} />
      </div>
      <div className={s.fileInputWrapper}>
        <label className={s.fileInputBtn} htmlFor={id}>
          <ImgIcon />
          Change Image
        </label>
        <input id={id} onChange={handleFileLoading} type={'file'} />
      </div>
    </div>
  )
}
