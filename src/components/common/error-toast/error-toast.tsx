import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { selectError } from '@/app-slice'

export const ErrorToast = () => {
  const error = useSelector(selectError)

  useEffect(() => {
    toast.error(error)
  }, [error])

  return null
}
