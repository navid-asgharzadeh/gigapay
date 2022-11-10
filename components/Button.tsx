import { ButtonProps } from 'utility/Interface'
import clsx from 'clsx'

function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500',

        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
