import { getSessionStorage } from 'hooks/useSessionStorage'
import React, { useEffect, useState } from 'react'
import { MemberProps } from 'utility/Interface'
import Button from './Button'
import Input from './Input'

const initialMember = {
  name: '',
  country: '',
  phone: '',
  email: '',
}

function Dashboard() {
  const [formData, setFormData] = useState<MemberProps>(initialMember)
  const [name, setName] = useState<string | null>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    setName(getSessionStorage('name'))
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    //TODO: Save data to database
  }

  const isDisabled = () => {
    return (
      !formData.name || !formData.country || !formData.phone || !formData.email
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-16 my-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold">Welcome {name?.toUpperCase()} 👋</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-2/4">
        <Input
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          label="Country"
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />

        <Input
          label="Phone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Button disabled={isDisabled()}>Add Member</Button>
      </form>

      {/* Show this when no member found */}
      <p className="text-2xl text-center text-gray-300 font-bold">
        No member found!
      </p>

      <div className="grid gap-8 space-x-1 md:grid-cols-2 lg:grid-cols-3">
        {/*TODO: Show members */}
      </div>
    </div>
  )
}

export default Dashboard
