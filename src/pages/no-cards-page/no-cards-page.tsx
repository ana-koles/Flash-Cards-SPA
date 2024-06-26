import { Link } from 'react-router-dom'

import noCardsImg from '@/assets/images/noCards.png'
import { Typography } from '@/components'
import clsx from 'clsx'

import s from './no-cards-page.module.scss'

export const NoCardsPage = () => {
  const classNames = {
    mainBtnLink: s.mainBtnLink,
    noCardImg: s.noCardImg,
    text: s.text,
    wrapper: s.wrapper,
  }

  return (
    <div className={classNames.wrapper}>
      <img alt={'No Cards Fount'} className={classNames.noCardImg} src={noCardsImg} />
      <Typography as={'span'} className={clsx(classNames.text)} variant={'body1'}>
        Sorry! No Cards Available in this Pack!
      </Typography>
      <Typography as={Link} className={clsx(classNames.mainBtnLink)} to={'/'} variant={'subtitle2'}>
        Back to Main page
      </Typography>
    </div>
  )
}
