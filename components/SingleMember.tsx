import { Member } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from './Button'
import { CardContent } from './Card'

function SingleMember({ country, createdAt, email, id, name, phone }: Member) {
  const [loading, setLoading] = useState({ delete: false, edit: false })
  const route = useRouter()
  const handleDelete = async () => {
    setLoading({ ...loading, delete: true })

    const { status } = await axios.delete(`/api/delete/${id}`)
    if (status === 200) {
      toast.success('Member deleted successfully')
      return route.back()
    }
    setLoading({ ...loading, delete: false })

    return toast.error('Something went wrong')
  }
  return (
    <div className="min-h-screen space-y-8 max-w-2xl mx-auto flex flex-col  justify-center">
      <CardContent
        country={country}
        email={email}
        name={name}
        phone={phone}
        createdAt={createdAt}
      />

      <div className="space-x-8 mx-auto">
        <Button onClick={handleDelete} danger>
          {loading.delete ? 'Deleting...' : 'Delete'}
        </Button>
        <Button> {loading.edit ? 'Editing...' : 'Edit'}</Button>
      </div>
    </div>
  )
}

export default SingleMember
