import { Member } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export const CardContent = ({
  country,
  createdAt,
  email,
  name,
  phone,
}: Omit<Member, 'updatedAt' | 'id'>) => {
  return (
    <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-8 shadow-xl">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="justify-between sm:flex">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {name || 'unknown'}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">
            From {country || 'unknown'}
          </p>
        </div>

        <div className="ml-3 hidden flex-shrink-0 sm:block">
          <Image
            alt="Paul Clapton"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            className="h-16 w-16 rounded-lg object-cover shadow-sm"
            width={64}
            height={64}
          />
        </div>
      </div>

      <div className="mt-4 sm:pr-8">
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      <dl className="mt-6 flex">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Created at</dt>
          <dd className="text-xs text-gray-500">
            {createdAt?.toLocaleString() || 'unknown'}
          </dd>
        </div>

        <div className="ml-3 flex flex-col-reverse sm:ml-6">
          <dt className="text-sm font-medium text-gray-600">Phone</dt>
          <dd className="text-xs text-gray-500">{phone || 'unknown'}</dd>
        </div>
      </dl>
    </div>
  )
}

function Card({
  country,
  email,
  name,
  phone,
  createdAt,
  id,
}: Omit<Member, 'updatedAt'>) {
  return (
    <Link
      href={{
        pathname: '/member/[id]',
        query: { id },
      }}
    >
      <CardContent
        country={country}
        email={email}
        name={name}
        phone={phone}
        createdAt={createdAt}
      />
    </Link>
  )
}

export default Card
