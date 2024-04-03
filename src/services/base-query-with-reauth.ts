import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { router } from '@/router'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  //обертка над браузерными fetch запросами,
  //это ф-ция высшего порядка, к-ая возвращает другую ф-цию, к-ая делает фетч запрос
  //типа instance
  baseUrl: 'https://api.flashcards.andrii.es',
  credentials: 'include', //тоже самое что withCreditentials: true - нужно д.того чтобы бразуер при кросс-браузерных запросах включал учетные данные (куки, аутентификационные заголовки тд)
})

export const baseQueryWithReauth: BaseQueryFn<
  // эта ф-ция будет вызываться при каждом запросе на сервер
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  //в args попадает query параметры из запроса (endpoint). Эту ф-цию будет вызывать сам RTK Query
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions) //записывем результат  me-запроса на сервер (Response)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            method: 'POST',
            url: 'v1/auth/refresh-token',
          },
          api,
          extraOptions
        )

        //проверяем успешно ли прошел запрос за рефреш токеном
        if (refreshResult.meta?.response?.status === 204) {
          // retry the initial query
          result = await baseQuery(args, api, extraOptions) //если у нас успешно прошел запрос на рефреш-токет, мы получили новый access-токет и повторяем me-запрос с теми же параметрами
        } else {
          router.navigate('/login')
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
