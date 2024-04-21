import { useNavigate } from 'react-router-dom'

import { FormWrapper } from '@/components/common/form-wrapper'
import { PersonalInfoForm } from '@/components/ui/form_personal-info'
import { useMeQuery, useUpdateUserDataMutation } from '@/services/auth'
import { UpdateUserDataArgs } from '@/services/auth/auth.types'

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
