export interface LoginProps {
  name: string
}

export interface ButtonProps {
  children: React.ReactNode
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface InputProps {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface MemberProps {
  name: string
  country: string
  phone: string
  email: string
}
