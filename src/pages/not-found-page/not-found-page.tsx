import { Link } from 'react-router-dom'

import { notFoundPageImg } from '@/assets'
import { Typography } from '@/components/ui'

import s from './not-found-page.module.scss'

export const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <img alt={'Page not found'} src={notFoundPageImg} />
      <Typography as={'span'} variant={'body1'}>
        Sorry! Page not found!
      </Typography>
      <Typography as={Link} to={'/'} variant={'subtitle2'}>
        Back to home page
      </Typography>
    </div>
  )
}
