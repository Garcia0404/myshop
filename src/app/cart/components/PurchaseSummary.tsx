'use client'
import { CartItemCard } from "app/components/ShoppingCart"
import Separator from "app/components/ui/Separator"
import { useCartStore } from "app/hooks/useCartStore"
import { motion } from "motion/react"
import PaymentButton from "./PaymentButton"
const CartList = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore()
  return (
    <>
      {cart.length !== 0 ?
        <ul className="flex-1 max-md:max-w-[400px] lg:w-xl flex flex-col">{
          cart.map(item => (
            <motion.li initial={{ opacity: 0 }}
              exit={{ opacity: 0 }} animate={{ opacity: 1 }}
              layoutId={`cartPage-${item.id}-${item.talla}`} key={`cartPage-${item.id}-${item.talla}`}>
              <CartItemCard removeFromCart={removeFromCart} updateQuantity={updateQuantity} product={item} />
            </motion.li>
          ))}</ul>
        : (
          <motion.div layout initial={{ opacity: 0 }}
            transition={{ delay: 0.3 }} animate={{ opacity: 1 }}
            className="justify-center flex-1 flex items-center text-xl sm:text-2xl -translate-y-10 text-white/30">El carrito está vacío</motion.div>
        )
      }
    </>
  )
}
export const PurchaseSummary = () => {
  const { cart, getTotal, getSubtotal } = useCartStore()
  return (
    <div className="flex sm:flex-row flex-col gap-4 lg:gap-10 mx-auto mt-6 md:mt-20">
      <CartList />
      {
        cart.length !== 0 && <motion.div layout className=" sm:bg-zinc-900 w-full sm:w-80 p-4 rounded-md h-min mx-auto mb-6 sm:me-2">
          <Separator />
          <h2 className="text-2xl mt-2 mb-6 font-bold text-center">Resumen de compra</h2>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-white/40">S/ {getSubtotal()}</span>
          </div>
          <div className="w-full h-[0.5px] bg-white/10 my-5"></div>
          <div className="flex justify-between text-xl">
            <span>Total</span>
            <span className="text-red-600 font-bold">S/ {getTotal()}</span>
          </div>
          <PaymentButton />
        </motion.div>
      }
    </div>
  )
}
