import { useClickOutside } from "app/hooks/useClickOutside"
import { AnimatePresence, motion } from "motion/react"
import { RefObject, useEffect } from "react"
import { Login } from "./Login"
import { useUser } from "app/context/UserContext"
const UserOptions = ({ handleLogout, ref, user }: { handleLogout: () => void, ref: RefObject<HTMLDivElement>, user: { username: string, email: string } }) => {
  const { username, email } = user
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className="origin-top py-2 px-2 flex flex-col gap-1 rounded-lg bg-zinc-900 absolute top-full mt-2 right-0 text-start"
    >
      <article className="flex gap-3 items-center cursor-pointer my-2 mx-2">
        <div className="rounded-full overflow-hidden h-full">
          <img className="rounded-full" width={38} height={38} src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="user" />
        </div>
        <div className="leading-1 flex flex-col text-start">
          <h3 className="text-sm whitespace-nowrap line-clamp-1">{email}</h3>
          <span className="text-xs text-blue-500 whitespace-nowrap line-clamp-1">@{username}</span>
        </div>
      </article>
      <div className="hover:bg-zinc-700 transition-colors cursor-pointer ps-2 pe-16 py-1 whitespace-nowrap rounded-lg">Mi Cuenta</div>
      <div className="hover:bg-zinc-700 transition-colors cursor-pointer ps-2 pe-16 py-1 whitespace-nowrap rounded-lg">Mis Pedidos</div>
      <button onClick={handleLogout} className="hover:bg-red-700/20 text-red-500 transition-colors cursor-pointer ps-2 pe-16 py-1 whitespace-nowrap rounded-lg">Cerrar Sesión</button>
    </motion.div>
  )
}

export const User = ({ openOptions, callback }: { openOptions: boolean, callback: () => void }) => {
  const { isLoged, setIsLoged, checkSession, user, refLogin } = useUser()
  useClickOutside(refLogin, () => { if (openOptions) callback() })
  const handleLogout = async () => {
    const response = await fetch("/api/logout", { method: "POST" })
    if (response.ok) setIsLoged(false)
  }
  useEffect(() => {
    if (!openOptions) checkSession()
  }, [openOptions])

  return (
    <AnimatePresence>
      {openOptions && (isLoged ?
        <UserOptions user={user} ref={refLogin} handleLogout={handleLogout} /> : <Login ref={refLogin} callback={callback} />)}
    </AnimatePresence>
  )
}