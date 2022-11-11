import { Member } from '@prisma/client'
import { getSessionStorage } from 'hooks/useSessionStorage'
import React, { useEffect, useState } from 'react'
import { fetchData } from 'utility/apiCall'
import { MemberProps } from 'utility/Interface'
import Button from './Button'
import Card from './Card'
import Input from './Input'
import { toast } from 'react-toastify'

const initialMember = {
  name: '',
  country: '',
  phone: '',
  email: '',
}

function Dashboard({ members }: { members: Member[] }) {
  const [allMembers, setAllMembers] = useState<Member[]>(members)
  const [formData, setFormData] = useState<MemberProps>(initialMember)
  const [name, setName] = useState<string | null>('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    setName(getSessionStorage('name'))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const data = await fetchData('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (data.error) {
      setLoading(false)
      return toast.error(data.error)
    }
    setAllMembers([data, ...allMembers])
    setFormData(initialMember)
    setLoading(false)
    return toast.success('The member was added successfully')
  }

  return (
    <div className="min-h-screen space-y-8">
      <h1 className="text-4xl text-center font-bold mt-16">
        Welcome {name?.toUpperCase()} 👋
      </h1>
      <div className="flex flex-col md:flex-row justify-between p-8 mx-auto ">
        <div className="md:w-2/5 mb-16 md:mb-0 px-4">
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

            <Button disabled={!formData.email}>
              {loading ? 'Wait a moment...' : 'Add Member'}
            </Button>
          </form>
        </div>

        {allMembers.length < 0 && (
          <p className="text-2xl text-center text-gray-300 font-bold">
            No member found!
          </p>
        )}

        <div className="grid gap-8 space-x-1 p-4 lg:grid-cols-2">
          {allMembers.map((member) => (
            <Card
              key={member.id}
              country={member.country}
              email={member.email}
              createdAt={member.createdAt}
              name={member.name}
              phone={member.phone}
              id={member.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
