import { Link } from 'react-router-dom'

import notFoundPageImg from '@/assets/images/404.png'
import { FormWrapper } from '@/components/common/form-wrapper'
import { Typography } from '@/components/ui/typography'

export const NotFoundPage = () => {
  return (
    <FormWrapper>
      <img alt={'Page not found'} src={notFoundPageImg} />
      <Typography as={'span'} variant={'body1'}>
        Sorry! Page not found!
      </Typography>
      <Link to={'/'}>
        <Typography as={'span'} variant={'subtitle2'}>
          Back to home page
        </Typography>
      </Link>
    </FormWrapper>
  )
}
