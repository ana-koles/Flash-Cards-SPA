export type UserData = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type LoginData = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponse = {
  accessToken: string
}

export type SignUpBody = {
  email: string
  name: string
  password: string
  sendConfirmationEmail: boolean
}

export type UpdateUserDataArgs = {
  avatar?: File | null
  name?: string
}

export type VerifyEmailData = {
  code: string
}

export type ResendEmailData = {
  html: string
  subject: string
  userId: string
}

export type RecoverPasswordData = {
  email: string
}

export type ResetPasswordData = {
  password: {
    password: string
  }
  token: string
}

export type ResetPasswordResponse = {
  password: string
}
