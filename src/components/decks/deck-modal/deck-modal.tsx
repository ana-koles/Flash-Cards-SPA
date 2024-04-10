import { ChangeEvent, ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImgIcon } from '@/assets/icons/img'
import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/checkbox/form-checkbox'
import { FormInput } from '@/components/ui/input/form-input'
import { CommonModal } from '@/components/ui/modal/common-modal'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deck-modal.module.scss'

type DeckModalProps = {
  children?: ReactNode
  defaultValues?: FormValues
  handleDataConfirm: (data: FormValues & { cover?: File }) => void
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
}

const deckScheme = z.object({
  isPrivate: z.boolean(),
  name: z.string().trim().min(2).max(500),
})

type FormValues = z.infer<typeof deckScheme>

export const DeckModal = ({
  defaultValues = { isPrivate: false, name: '' },
  handleDataConfirm,
  onOpenChange,
  title,
  ...restProps
}: DeckModalProps) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(deckScheme),
  })

  const [file, setFile] = useState<File | null>(null)

  const onSubmit = (data: FormValues) => {
    handleDataConfirm({ cover: file ?? undefined, ...data })
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
    inputLabel: s.inputLabel,
  }

  return (
    <CommonModal modalTitle={title} onOpenChange={onOpenChange} {...restProps}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          className={classNames.inputLabel}
          control={control}
          defaultValue={defaultValues.name}
          label={'Deck name'}
          name={'name'}
        />
        {file && (
          <div className={s.imgWrapper}>
            <img src={URL.createObjectURL(file)} />
          </div>
        )}

        <div className={s.fileInputWrapper}>
          <label className={s.fileInputBtn} htmlFor={'deckImg'}>
            <ImgIcon />
            <Typography as={'span'} variant={'subtitle2'}>
              Upload Image
            </Typography>
          </label>
          <input id={'deckImg'} onChange={handleFileLoading} type={'file'} />
        </div>

        <FormCheckbox control={control} label={'Private Deck'} name={'isPrivate'} />
        <div className={s.buttonWrapper}>
          <Button onClick={handleCancel} variant={'secondary'}>
            Cancel
          </Button>
          <Button type={'submit'}>{title}</Button>
        </div>
      </form>
    </CommonModal>
  )
}
