'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import Separator from 'app/components/ui/Separator'
import { BagSvg } from 'app/components/ui/BagSvg'
const Loader = () => {
  return (
    <div className="flex flex-row gap-1 w-full justify-center">
      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 animate-bounce [animation-delay:.7s]"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 animate-bounce [animation-delay:.7s]"></div>
    </div>
  )
}
export default function LoginPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.username || !formData.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setIsLoaded(true)
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!response.ok) alert("Error al iniciar sesión");
      if (response.ok) {
        const data = await response.json();
        router.push('/products');
        console.log(data)
      }
    } catch (error) {
      console.error(error)
      alert("Error al iniciar sesión")
    } finally { setIsLoaded(false) }
  }
  return (
    <section>
      <div className='h-screen flex flex-col items-center justify-center max-w-5xl mx-auto'>
        <div className='flex flex-col items-center max-sm:p-3 max-w-96 mb-10'>
          <BagSvg className="size-40 stroke-[0.3]" />
          <h1 className='text-4xl font-bold mb-4 text-center'>Log in to MyShop</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4 w-full'>
            <label>
              <input
                type='text'
                placeholder='Username'
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className='p-2 border border-gray-300 rounded-md w-full'
              />
            </label>
            <label>
              <input
                type='password'
                placeholder='Password'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className='p-2 border border-gray-300 rounded-md w-full'
              />
            </label>
            <button
              type='submit'
              className='p-2 bg-blue-600 h-10 text-white rounded-md font-semibold hover:bg-blue-600/80 transition-colors cursor-pointer'
            >
              {
                isLoaded ? <Loader /> : <span>Sign in</span>
              }
            </button>
          </form>
        </div>
        <Separator />
        <Link href='/signup' className='text-center text-blue-400 text-lg mt-4 border-b border-transparent hover:border-blue-400 transition-all'>Don&apos;t have an account? Sign Up</Link>
      </div>
    </section>
  )
}
