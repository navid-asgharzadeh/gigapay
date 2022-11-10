import { InputProps } from 'utility/Interface'

function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  ...props
}: InputProps) {
  return (
    <div>
      <label
        htmlFor="LastName"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={name}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}

export default Input
