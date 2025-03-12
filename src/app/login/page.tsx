'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import Separator from 'app/components/ui/Separator'
import { BagSvg } from 'app/components/ui/BagSvg'
import { Loader } from 'app/components/ui/Loader'
export default function LoginPage() {
  const { replace } = useRouter();
  const [isLoaded, setIsLoaded] = useState(false)
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/validate-token")
      if (response.ok) replace('/products')
      if (!response.ok) setShow(true)
    };
    checkSession();
  }, [replace])
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
      if (!response.ok) alert("Datos incorrectos");
      if (response.ok) {
        const data = await response.json();
        replace('/products');
        console.log(data)
      }
    } catch (error) {
      console.error(error)
      alert("Error al iniciar sesión")
    } finally { setIsLoaded(false) }
  }
  return (
    <section>
      {
        show && (
          <motion.div animate={{opacity:1}} initial={{opacity:0}} className='h-screen flex flex-col items-center justify-center max-w-5xl mx-auto'>
            <div className='flex flex-col items-center max-sm:p-3 max-w-96 mb-10'>
              <BagSvg className="size-40 stroke-[0.3]" />
              <h1 className='text-4xl font-bold mb-4 text-center'>Iniciar Sesión</h1>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4 w-full'>
                <label>
                  <input
                    type='text'
                    placeholder='Usuario'
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className='p-2 border border-gray-300 rounded-md w-full'
                  />
                </label>
                <label>
                  <input
                    type='password'
                    placeholder='Contraseña'
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
                    isLoaded ? <Loader /> : <span>Iniciar Sesión</span>
                  }
                </button>
              </form>
            </div>
            <Separator />
            <Link href='/signup' className='text-center text-blue-400 text-lg mt-4 border-b border-transparent hover:border-blue-400 transition-all'>¿No tienes una cuenta? Regístrate</Link>
          </motion.div>
        )
      }
    </section>
  )
}
