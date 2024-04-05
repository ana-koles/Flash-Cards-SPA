import { PersonalInfoForm } from '@/components/ui/form_personal-info'
import { useMeQuery } from '@/services/auth'

import s from './profile-page.module.scss'

export const ProfilePage = () => {
  const { data } = useMeQuery()

  return (
    <div className={s.modalWrapper}>
      <PersonalInfoForm avatar={data?.avatar} email={data?.email} nickName={data?.name} />
    </div>
  )
}
