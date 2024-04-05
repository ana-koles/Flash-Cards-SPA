import { PersonalInfoForm } from '@/components/ui/form_personal-info'
import { useMeQuery } from '@/services/auth'

export const ProfilePage = () => {
  const { data } = useMeQuery()

  return (
    <div>
      <PersonalInfoForm nickName={data?.name} />
    </div>
  )
}
