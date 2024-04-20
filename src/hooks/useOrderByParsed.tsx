export const useOrderByParsed = (orderBy: null | string) => {
  if (!orderBy) {
    return null
  }
  const [sortKey, sortOrder] = orderBy.split('-') as [string, 'asc' | 'desc']

  return { sortKey, sortOrder }
}
