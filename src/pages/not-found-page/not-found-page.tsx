import { Link } from 'react-router-dom'

import notFoundPageImg from '@/assets/images/404.png'
import { Typography } from '@/components/ui/typography'

import s from './not-found-page.module.scss'

export const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <img alt={'Page not found'} src={notFoundPageImg} />
      <Typography as={'span'} variant={'body1'}>
        Sorry! Page not found!
      </Typography>
      <Link to={'/'}>
        <Typography as={'span'} variant={'subtitle2'}>
          Back to home page
        </Typography>
      </Link>
    </div>
  )
}
