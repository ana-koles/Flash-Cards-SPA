import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImgIcon } from '@/assets/icons/img'
import defaultImg from '@/assets/images/defaultImg.png'
import { Button } from '@/components/ui/button'
import { CommonModal } from '@/components/ui/modal/common-modal'
import { Typography } from '@/components/ui/typography'
import { Deck, UpdateDecksArgs } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { z } from 'zod'

import s from './deck-modal.module.scss'

import { FormCheckbox } from '../../ui/controlled/form-checkbox'
import { FormInput } from '../../ui/controlled/form-input'

type DeckModalProps = {
  children?: ReactNode
  deckToUpdate?: Deck
  handleDataCreate?: (data: FormValues & { cover?: File }) => void
  handleDataUpdate?: (updatedData: UpdateDecksArgs) => void
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
}

const deckScheme = z.object({
  isPrivate: z.boolean().default(false),
  name: z.string().trim().min(2).max(500),
})

type FormValues = z.infer<typeof deckScheme>

export const DeckModal = ({
  deckToUpdate,
  handleDataCreate,
  handleDataUpdate,
  onOpenChange,
  title,
  ...restProps
}: DeckModalProps) => {
  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      isPrivate: deckToUpdate?.isPrivate ? deckToUpdate?.isPrivate : false,
      name: deckToUpdate?.name ? deckToUpdate?.name : '',
    },
    resolver: zodResolver(deckScheme),
  })

  const [file, setFile] = useState<File | null>(null)
  const [isZoom, setIsZoom] = useState<boolean>(false)

  useEffect(() => {
    if (deckToUpdate) {
      setValue('isPrivate', deckToUpdate.isPrivate)
      setValue('name', deckToUpdate.name)
    }
  }, [deckToUpdate, setValue])

  const onSubmit = (data: FormValues) => {
    handleDataCreate?.({ cover: file ?? undefined, ...data })

    if (deckToUpdate) {
      handleDataUpdate?.({
        cover: file ?? undefined,
        id: deckToUpdate?.id,
        ...data,
      })
    }

    onOpenChange(false)
    reset()
    setFile(null)
  }

  const handleFileLoading = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
    reset()
    setFile(null)
  }

  const classNames = {
    cover: file || deckToUpdate?.cover ? s.cover : '',
    inputLabel: s.inputLabel,
    zoom: isZoom && s.zoom,
  }

  const createSrc = () => {
    if (file) {
      return URL.createObjectURL(file)
    }
    if (typeof deckToUpdate?.cover === 'string') {
      return deckToUpdate?.cover
    }

    return defaultImg
  }

  return (
    <CommonModal
      modalTitle={title}
      onCloseHandler={handleCancel}
      onOpenChange={onOpenChange}
      {...restProps}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          className={classNames.inputLabel}
          control={control}
          label={'Deck name'}
          name={'name'}
        />

        <div className={s.fileInputWrapper}>
          <div className={s.coverWrapper}>
            <img
              alt={'deck cover'}
              className={clsx(classNames.cover, classNames.zoom)}
              onClick={() => setIsZoom(prev => !prev)}
              src={createSrc()}
            />
          </div>
          <label className={s.fileInputBtn} htmlFor={'deckImg'}>
            <ImgIcon />
            <Typography as={'span'} variant={'subtitle2'}>
              Upload Image
            </Typography>
          </label>
          <input id={'deckImg'} onChange={handleFileLoading} type={'file'} />
        </div>

        <FormCheckbox control={control} label={'Private Deck'} name={'isPrivate'} />
        <div className={s.subitnBtnWrapper}>
          <Button onClick={handleCancel} variant={'secondary'}>
            Cancel
          </Button>
          <Button type={'submit'}>{title}</Button>
        </div>
      </form>
    </CommonModal>
  )
}
