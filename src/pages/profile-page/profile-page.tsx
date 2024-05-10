import { useNavigate } from 'react-router-dom'

import { FormWrapper, PersonalInfoForm } from '@/components'
import { UpdateUserDataArgs, useMeQuery, useUpdateUserDataMutation } from '@/services/auth'

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
    <FormWrapper>
      <PersonalInfoForm
        avatar={data?.avatar}
        email={data?.email}
        handleLogout={handleLogout}
        handleUserUpdateData={handleUserUpdateData}
        name={data?.name}
      />
    </FormWrapper>
  )
}
