// /products/:id
'use client'
import { useProductById } from "app/hooks/useProductById"
import { useParams, useRouter } from "next/navigation"
import { motion } from "motion/react"
import { ChangeEvent, useState } from "react"
import { Breadcrumbs } from "app/components/ui/Breadcrumbs"
import Separator from "app/components/ui/Separator"
import { useCartStore } from "app/hooks/useCartStore"
export default function ProductPage() {
  const addToCart = useCartStore((state) => state.addToCart)
  const params = useParams()
  const route = useRouter()
  const id = params.id as string
  const { data: product, error, isLoading } = useProductById(id)
  const [isLoaded, setIsLoaded] = useState(false)
  // Tallas
  const [selectedSize, setSelectedSize] = useState("")
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSelectedSize(e.target.value)
  // Rutas Breadcrumbs
  const paths = [{
    label: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
    ,
    src: "/products",
  }, {
    label: product?.genero,
    src: `/products?genre=${product?.genero}`,
  }, {
    label: product?.categoria,
    src: `/products?genre=${product?.genero}&category=${product?.categoria}`,
  }]
  if (error) {
    route.push("/products")
    return null
  }
  if (isLoading) return null
  return (
    <>
      {
        product && (
          <>
            <Breadcrumbs paths={paths} />
            <section className="flex gap-6 2xl:gap-12 max-lg:flex-col">
              <motion.img onLoad={() => setIsLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.1 }}
                className="mx-auto lg:mx-0"
                width={400} height={400} src={product.imagenes[0]} alt={product.nombre} />
              <div className="flex flex-col flex-1">
                <span className="w-full text-end text-[#ecedee80]">Código:{id}</span>
                <h3 className="text-2xl font-bold">{product.nombre}</h3>
                <div className="flex gap-4 text-xl items-center mt-2">
                  <s style={{ display: product.descuento == 0 ? "none" : "block" }} className="text-[#ecedee80]">S/ {product.precio}</s>
                  <div className="text-2xl">S/ {((1 - product.descuento / 100) * product.precio).toFixed(2)}</div>
                  <div style={{ display: product.descuento == 0 ? "none" : "block" }} className="bg-red-500 px-2">-{product.descuento}%</div>
                </div>
                <Separator />
                <div>
                  <span className="text-lg">Talla</span>
                  <form onSubmit={(e) => e.preventDefault} className="flex gap-4 mt-2">
                    {
                      product.tallas.map((talla) => (
                        <label key={talla}
                          style={{ backgroundColor: selectedSize === talla ? "white" : "transparent", color: selectedSize === talla ? "#18181b" : "white" }}
                          className="rounded-full p-4 border boder-white/30 size-12 grid place-content-center hover:bg-white hover:text-zinc-900 transition-colors cursor-pointer">
                          <input type="radio" name="talla" value={talla} onChange={handleChange} className="hidden" />
                          {talla}
                        </label>))
                    }
                  </form>
                </div>
                <div className="text-[#ecedee80] mt-4 text-xl md:text-2xl font-extralight">{product.descripcion}</div>
                <button disabled={selectedSize === ""} onClick={() => addToCart({ ...product, talla: selectedSize })} className={`w-full ${selectedSize !== "" ? "hover:bg-white hover:text-zinc-900 transition-all duration-300 active:scale-95 hover:scale-[1.03] cursor-pointer" : "border-white/30 text-white/30"} py-2 border mt-6`}>Agregar al carrito</button>
              </div>
            </section>
          </>
        )
      }
    </>
  )
}
