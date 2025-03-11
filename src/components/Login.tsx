import { motion } from "motion/react"
import { BagSvg } from "./ui/BagSvg"
import { FormEvent, RefObject, useState } from "react"
import { Loader } from "./ui/Loader"
import { CloseSvg } from "./ui/CloseSvg"
import { GoogleSvg } from "./ui/GoogleSvg"
export const Login = ({ ref, callback }: { ref: RefObject<HTMLDivElement>, callback: () => void }) => {
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
      if (!response.ok) alert("Datos incorrectos");
      if (response.ok) callback()
    } catch (error) {
      console.error(error)
      alert("Error al iniciar sesión")
    } finally { setIsLoaded(false) }
  }
  return (
    <motion.div animate={{ opacity: 1 }}
      initial={{ opacity: 0 }} exit={{ opacity: 0 }}
      className='min-h-screen bg-[rgba(0,0,0,0.8)] fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center z-50'>
      <div className="flex w-full px-2 justify-center items-center">
        <div ref={ref} className='flex flex-col items-center max-sm:p-3 w-full min-[400px]:w-sm mb-10 bg-zinc-900 p-4 rounded-lg'>
          <div onClick={callback} className="flex justify-end cursor-pointer w-min ms-auto"><CloseSvg /></div>
          <BagSvg className="size-40 stroke-[0.3]" />
          <h1 className='text-4xl font-bold mb-4 text-center'>Iniciar Sesión</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4 w-full'>
            <label>
              <input
                type='text'
                placeholder='Usuario'
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className='p-2 border border-gray-300/30 rounded-md w-full'
              />
            </label>
            <label>
              <input
                type='password'
                placeholder='Contraseña'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className='p-2 border border-gray-300/30 rounded-md w-full'
              />
            </label>
            <button
              type='submit'
              className='p-2 bg-blue-600 h-10 text-white rounded-md font-semibold hover:bg-blue-500 transition-colors cursor-pointer'
            >
              {
                isLoaded ? <Loader /> : <span>Iniciar Sesión</span>
              }
            </button>
          </form>
          <button className="w-full flex bg-white mt-2 rounded-md py-1.5 px-3 cursor-pointer relative"><GoogleSvg /><span className="absolute right-0 left-0 top-0 bottom-0 grid place-content-center font-bold text-zinc-900">Continuar con google</span></button>
        </div>
      </div>
    </motion.div>
  )
}