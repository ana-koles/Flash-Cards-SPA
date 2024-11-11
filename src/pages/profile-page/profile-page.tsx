import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setIsLoggedIn } from '@/app-slice'
import { FormWrapper, PersonalInfoForm } from '@/components'
import { UpdateUserDataArgs, useMeQuery, useUpdateUserDataMutation } from '@/services/auth'

export const ProfilePage = () => {
  const { data } = useMeQuery()
  const [updateUserData] = useUpdateUserDataMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleUserUpdateData = (newUserData: UpdateUserDataArgs) => {
    updateUserData(newUserData)
  }

  const handleLogout = () => {
    dispatch(setIsLoggedIn({ isLoggedIn: false }))
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
