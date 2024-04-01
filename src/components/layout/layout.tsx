import { ReactNode } from 'react'

import { Header, HeaderProps } from './header'

type LayoutProps = {
  children: ReactNode
} & HeaderProps

export const Layout = (props: LayoutProps) => {
  return (
    <div>
      <Header {...props} />
      {props.children}
    </div>
  )
}
