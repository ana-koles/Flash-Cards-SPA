import { PersonalInfoForm } from '@/components/ui/form_personal-info'
import { useMeQuery, useUpdateUserDataMutation } from '@/services/auth'

import s from './profile-page.module.scss'

export const ProfilePage = () => {
  const { data } = useMeQuery()
  const [updateUserData] = useUpdateUserDataMutation()

  console.log(data)

  return (
    <div className={s.modalWrapper}>
      <PersonalInfoForm
        avatar={data?.avatar}
        email={data?.email}
        name={data?.name}
        updateUserData={updateUserData}
      />
    </div>
  )
}
