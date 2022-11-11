import { Member } from '@prisma/client'

import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteMember, updateMember } from 'utility/apiCalls'
import { MemberProps } from 'utility/Interface'
import Button from './Button'
import { CardContent } from './Card'
import Input from './Input'
import type { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { initialMember } from 'constants/const'

function SingleMember({ country, createdAt, email, id, name, phone }: Member) {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState({ delete: false, edit: false })
  const [edit, setEdit] = useState(false)
  const [formData, setFormData] = useState<MemberProps>(initialMember)
  const deleteSingleMember = useMutation(() => deleteMember(id), {
    onMutate: () => {
      setLoading({ ...loading, delete: true })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        {
          queryKey: ['members'],
        },
        { cancelRefetch: true }
      )
      toast.success('Member deleted successfully')
      return route.push('/dashboard')
    },
    onError: ({ response }: AxiosError<{ error: string }>) => {
      toast.error(response?.data.error)
    },
  })
  const update = useMutation(() => updateMember(id, formData), {
    onMutate: () => {
      setLoading({ ...loading, edit: true })
    },
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries(
        {
          queryKey: ['member'],
        },
        { cancelRefetch: true }
      )

      toast.success(`${data.name} was updated successfully`)
      setLoading({ ...loading, edit: false })
      setEdit(false)
      setFormData(initialMember)
    },
    onError: ({ response }: AxiosError<{ error: string }>) => {
      toast.error(response?.data.error)
      setLoading({ ...loading, edit: false })
      setEdit(false)
    },
  })
  const route = useRouter()

  const handleDelete = async () => {
    deleteSingleMember.mutate()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleEdit = async () => {
    if (edit) {
      return setEdit(false)
    }
    setEdit(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    update.mutate()
  }

  return (
    <div className="p-4 md:p-0 min-h-screen space-y-8 max-w-2xl mx-auto flex flex-col justify-center">
      <Link
        href="/dashboard"
        className="text-sm font-bold hover:text-gray-400 transition-colors duration-300"
      >
        Go Back
      </Link>
      <CardContent
        country={country}
        email={email}
        name={name}
        phone={phone}
        createdAt={createdAt}
      />
      {edit && (
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Input
              label="Name"
              type="text"
              name="name"
              value={formData.name || name || ''}
              onChange={handleChange}
            />

            <Input
              label="Country"
              type="text"
              name="country"
              value={formData.country || country || ''}
              onChange={handleChange}
            />

            <Input
              label="Phone"
              type="text"
              name="phone"
              value={formData.phone || phone || ''}
              onChange={handleChange}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email || email || ''}
              onChange={handleChange}
            />

            <Button disabled={loading.edit}>
              {loading.edit ? 'Wait a moment...' : 'Edit Member'}
            </Button>
          </form>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 mx-auto">
        <Button onClick={handleDelete} danger>
          {loading.delete ? 'Deleting...' : 'Delete'}
        </Button>
        <Button onClick={handleEdit}>
          {loading.edit ? 'Editing...' : edit ? 'Cancel Edit' : 'Edit'}
        </Button>
      </div>
    </div>
  )
}

export default SingleMember
