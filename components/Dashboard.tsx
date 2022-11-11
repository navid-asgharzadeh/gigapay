import { useFetch } from 'hooks/useFetch'
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
  const fetchData = useFetch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    setName(getSessionStorage('name'))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO: Save data to database

    const data = await fetchData('http://localhost:3000/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    console.log(data)
  }

  return (
    <div className="min-h-screen space-y-8">
      <h1 className="text-4xl text-center font-bold mt-16">
        Welcome {name?.toUpperCase()} 👋
      </h1>
      <div className="flex items-center justify-between  p-8 mx-auto ">
        <div className="w-1/5">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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

            <Button disabled={!formData.email}>Add Member</Button>
          </form>
        </div>
        {/* Show this when no member found */}
        <p className="text-2xl text-center text-gray-300 font-bold">
          No member found!
        </p>

        <div className="grid gap-8 space-x-1 md:grid-cols-2 lg:grid-cols-3">
          {/*TODO: Show members */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
