export interface LoginProps {
  name: string
}

export interface ButtonProps {
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export interface InputProps {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
