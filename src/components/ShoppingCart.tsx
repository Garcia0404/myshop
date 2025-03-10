'use client'
import { CartProduct, useCartStore } from "app/hooks/useCartStore"
import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import Separator from "./ui/Separator"
import { useClickOutside } from "app/hooks/useClickOutside"
import { useBodyOverflow } from "app/hooks/useBodyOverflow"
import { useRouter } from "next/navigation"
export const CartSvg = () => {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  )
}
const CloseSvg = () => {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>

  )
}
export const CartItemCard = ({ product, updateQuantity, removeFromCart }: { product: CartProduct, updateQuantity: (productId: string, talla: string, quantity: number) => void, removeFromCart: (productId: string, talla: string) => void }) => {
  const { id, nombre, precio, descuento, imagenes, quantity, talla } = product
  const discountedPrice = ((1 - descuento / 100) * precio).toFixed(2)
  return (
    <article className="flex gap-3 p-2 rounded-md">
      <div className="w-20">
        <img className="rounded-md h-full w-full object-cover" src={imagenes[0]} alt={nombre} width={70} height={60} />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-lg font-extralight overflow-hidden" style={{ display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}>{nombre} <span className="text-white/40">{`(${talla})`}</span></span>
        <div className="flex gap-2">
          <s style={{ display: descuento == 0 ? "none" : "block" }} className="text-[#ecedee80]">S/ {precio}</s>
          <span>S/ {discountedPrice}</span>
        </div>
        <div className="flex gap-4 items-center flex-1">
          <div><svg onClick={() => { if (quantity > 0) updateQuantity(id, talla, quantity - 1) }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 fill-white/50 hover:fill-white stroke-zinc-900 cursor-pointer transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          </div>
          <div className="text-xl w-6 text-center">{quantity}</div>
          <div><svg onClick={() => updateQuantity(id, talla, quantity + 1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 fill-white/50 hover:fill-white stroke-zinc-900 cursor-pointer transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          </div>
          <div className="ms-auto"><svg fill="none" onClick={() => removeFromCart(id, talla)} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer stroke-red-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          </div>
        </div>
      </div>
    </article>
  )
}
const BuyButton = () => {
  const { replace } = useRouter()
  const checkSession = async () => {
    const response = await fetch("/api/validate-token")
    if (response.ok) replace('/cart')
    if(!response.ok) replace('/login')
  };
  return (
    <button onClick={checkSession} className="w-full focus:bg-blue-500 py-2 my-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors cursor-pointer">Comprar</button>
  )
}
export const ShoppingCart = ({ callback, openCart }: { callback: () => void, openCart: boolean }) => {
  const ref = useRef(null as unknown as HTMLDivElement)
  const cart = useCartStore((state) => state.cart)
  const total = useCartStore((state) => state.getTotal)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  useBodyOverflow(openCart, true)
  useClickOutside(ref, () => {
    if (openCart) callback()
  })
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  return (
    <AnimatePresence>
      {openCart && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }}
          ref={ref}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="w-[450px] max-[450px]:w-screen h-[540px] fixed top-0 right-0 left-0 mx-auto my-auto bottom-0 z-50 flex flex-col gap-2 p-2">
          <div className="bg-zinc-900 flex flex-col gap-2 p-2 h-full rounded-xl">
            <div className="mt-2 flex justify-end cursor-pointer hover:text-white/60 transition-colors">
              <div onClick={callback} className="w-min">
                <CloseSvg />
              </div>
            </div>
            <ul className="flex flex-col flex-1 overflow-auto gap-2" style={{ scrollbarWidth: "none" }}>
              <AnimatePresence>
                {cart.length !== 0 ?
                  cart.map(item => (
                    <motion.li initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} layoutId={`${item.id}-${item.talla}`} key={`${item.id}-${item.talla}`}>
                      <CartItemCard removeFromCart={removeFromCart} updateQuantity={updateQuantity} product={item} />
                    </motion.li>
                  )) : (
                    <motion.div layout initial={{ opacity: 0 }} transition={{ delay: 0.3 }} animate={{ opacity: 1 }} className="justify-center flex-1 flex items-center text-xl text-white/30 mb-10">El carrito está vacío</motion.div>
                  )
                }
              </AnimatePresence>
            </ul>
            {cart.length !== 0 && (<div className="px-2">
              <Separator />
              <div className="flex justify-between text-xl">
                <span>Total:</span>
                <span>S/ {total()}</span>
              </div>
              <BuyButton />
            </div>)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
