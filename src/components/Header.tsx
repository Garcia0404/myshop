'use client'
import Link from "next/link"
import { BagSvg } from "./ui/BagSvg"
import { ChangeEvent, Suspense, useState } from "react"
import { CartSvg, ShoppingCart } from "./ShoppingCart"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { User } from "./User"
import { useUser } from "app/context/UserContext"
const UserSvg = ({ className = "", handleClick }: { className?: string, handleClick: () => void }) => {
  return (
    <svg onClick={handleClick} className={`${className} size-6`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  )
}
const SearchInput = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams()
    if (e.target.value) params.set('search', e.target.value)
    else params.delete('search')
    replace(`${pathname}?${params}`)
  }
  return (
    <input defaultValue={searchParams.get("search")?.toString()}
      onChange={handleChange} type="text" placeholder="Buscar productos"
      className="outline-none" />
  )
}
export const SearchWords = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label className="flex items-center gap-3">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <Suspense fallback={<input type="text" placeholder="Buscar productos" className="outline-none"></input>}>
          <SearchInput />
        </Suspense>
      </label>
    </form>
  )
}

export const Header = () => {
  const [openCart, setOpenCart] = useState(false)
  const { openLogin: openOptions, setOpenLogin: setOpenOptions } = useUser()
  const handleClick = () => {
    setOpenCart(false)
  }
  return (
    <>
      <header className="sticky top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] backdrop-blur-xl flex items-center justify-between px-4 py-2.5 border-b-[1px] border-white/30">
        <div className="sm:flex-grow sm:basis-0">
          <Link href={"/products"} className="flex items-center gap-2 cursor-pointer w-min">
            <BagSvg className="size-6" />
            <span>MyShop</span>
          </Link>
        </div>
        <nav className="sm:block hidden">
          <SearchWords />
        </nav>
        <div className="flex-grow basis-0 flex justify-end items-center gap-3">
          <div aria-label="Ver mi usuario" className="relative">
            <UserSvg handleClick={() => setOpenOptions(true)} className="cursor-pointer hover:fill-white" />
            <User openOptions={openOptions} callback={() => setOpenOptions(false)} />
          </div>
          <button aria-label="Abrir el carrito" onClick={() => setOpenCart(!openCart)}
            className="max-sm:translate-y-[calc(100dvh-53.6px)] max-sm:fixed cursor-pointer border bg-[#27272a] border-[#3f3f46] p-1.5 rounded-xl">
            <CartSvg />
          </button>
        </div>
      </header>
      <ShoppingCart callback={handleClick} openCart={openCart} />
    </>
  )
}