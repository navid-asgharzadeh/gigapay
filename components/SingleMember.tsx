import { Member } from '@prisma/client'
import Button from './Button'
import { CardContent } from './Card'

function SingleMember({ country, createdAt, email, name, phone }: Member) {
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
        <Button danger>Delete</Button>
        <Button>Edit</Button>
      </div>
    </div>
  )
}

export default SingleMember
