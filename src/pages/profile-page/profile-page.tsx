import { useNavigate } from 'react-router-dom'

import { PersonalInfoForm } from '@/components/ui/form_personal-info'
import { useMeQuery, useUpdateUserDataMutation } from '@/services/auth'
import { UpdateUserDataArgs } from '@/services/auth/auth.types'

import s from './profile-page.module.scss'

export const ProfilePage = () => {
  const { data } = useMeQuery()
  const [updateUserData] = useUpdateUserDataMutation()
  const navigate = useNavigate()

  const handleUserUpdateData = (newUserData: UpdateUserDataArgs) => {
    updateUserData(newUserData)
  }

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className={s.modalWrapper}>
      <PersonalInfoForm
        avatar={data?.avatar}
        email={data?.email}
        handleLogout={handleLogout}
        handleUserUpdateData={handleUserUpdateData}
        name={data?.name}
      />
    </div>
  )
}
