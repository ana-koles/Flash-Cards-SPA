import { createSearchParams, useNavigate } from 'react-router-dom'

type SearchParams = {
  [key: string]: string
}

export const useNavigateSearch = () => {
  const navigate = useNavigate()

  return (path: string, { searchParams }: SearchParams) => {
    navigate({ pathname: path, search: `?${createSearchParams(searchParams)}` })
  }
}
