import { Member } from '@prisma/client'
import { getSessionStorage } from 'hooks/useSessionStorage'
import React, { useEffect, useState } from 'react'
import { MemberProps } from 'utility/Interface'
import Button from './Button'
import Card from './Card'
import Input from './Input'
import { toast } from 'react-toastify'
import { createMember } from 'utility/apiCalls'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

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
  const createNewMember = useMutation(() => createMember(formData), {
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: async ({ data }) => {
      setAllMembers([data, ...allMembers])
      setFormData(initialMember)
      setLoading(false)
      toast.success(`${data.name} was added successfully`)
    },
    onError: (error: AxiosError) => {
      toast.error(error.message)
      setLoading(false)
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    setName(getSessionStorage('name'))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createNewMember.mutate()
  }

  return (
    <div className="min-h-screen space-y-8">
      <h1 className="text-2xl md:text-4xl text-center font-bold mt-16">
        Welcome {name?.toUpperCase()} 👋
      </h1>
      <div className="flex flex-col md:flex-row justify-between p-2 md:p-8 mx-auto ">
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

        {!allMembers && (
          <p className="text-2xl text-center text-gray-300 font-bold">
            No member found!
          </p>
        )}

        <div className="grid gap-8 md:space-x-1 p-4 lg:grid-cols-2">
          {allMembers?.map((member) => (
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
