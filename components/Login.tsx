import { setSessionStorage } from 'hooks/useSessionStorage'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { LoginProps } from 'utility/Interface'
import Button from './Button'
import Input from './Input'

const initialFormData = {
  name: '',
}
function Login() {
  const [formData, setFormData] = useState<LoginProps>(initialFormData)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    setSessionStorage('name', formData.name)
    router.push('/dashboard')
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="Night"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            width={870}
            height={870}
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Gigapay
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              The best payout experience for your creators.
            </p>
          </div>
        </section>

        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <h1 className="mt-16 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Gigapay
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                The best payout experience for your creators.
              </p>
            </div>

            <form className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <Input
                  name="name"
                  label="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                />
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  Please add any name with at least 3 characters and you are
                  good to go 🚀
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button
                  disabled={formData.name.length < 3}
                  onClick={handleSubmit}
                >
                  {loading ? 'Loading...' : 'Login'}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}

export default Login
