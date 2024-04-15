import { ChangeEvent } from 'react'

import { ImgIcon } from '@/assets/icons/img'

import s from './image-uploader.module.scss'

type ImageUploaderProps = {
  id: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  src: string
}

export const ImageUploader = ({ id, onChange, src }: ImageUploaderProps) => (
  <div>
    <div className={s.imgWrapper}>
      <img src={src} />
    </div>
    <div className={s.fileInputWrapper}>
      <label className={s.fileInputBtn} htmlFor={id}>
        <ImgIcon />
        Change Image
      </label>
      <input id={id} onChange={onChange} type={'file'} />
    </div>
  </div>
)
