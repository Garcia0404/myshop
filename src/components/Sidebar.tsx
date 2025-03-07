'use client'
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
const CategoryLink = ({ category, link }: { category: string, link: string }) => {
  return (
    <li className="hover:text-white transition-colors"><Link href={link}>{category}</Link></li>
  )
}
const GenreLink = ({ genre, isActive }: { genre: string, isActive: (genre: string) => boolean }) => {
  return (
    <h3 className="text-lg mb-2">
      <Link className={isActive(genre) ? "text-blue-500 hover:text-blue-400" : "hover:text-blue-400"}
        href={`/products?genre=${genre}`}>{genre}</Link>
    </h3>
  )
}
const list = [
  { genre: "Hombre", category: ["Camisetas", "Pantalones", "Sudaderas", "Zapatos", "Chaquetas", "Accesorios"] },
  { genre: "Mujer", category: ["Camisetas", "Pantalones", "Sudaderas", "Zapatos", "Chaquetas", "Accesorios"] },
  { genre: "Niño", category: ["Camisetas", "Pantalones", "Sudaderas", "Zapatos", "Chaquetas", "Accesorios"] }
]
const FilterList = () => {
  const searchParams = useSearchParams()
  const genre = searchParams.get("genre")
  const isActive = (value: string) => genre === value
  const categoryUrl = (genre: string, value: string) => `/products?genre=${genre}&category=${value}`
  return (
    <>
      {
        list.map((item, index) => (
          <div key={`genre-${index}`}>
            <GenreLink genre={item.genre} isActive={isActive} />
            <ul className="flex flex-col gap-1 text-sm font-extralight text-stone-400">
              {
                item.category.map((i, index) => (
                  <CategoryLink key={`category-${index}`} category={i} link={categoryUrl(item.genre, i)} />
                ))
              }
            </ul>
          </div>
        ))
      }
    </>
  )
}
export const Sidebar = () => {

  return (
    <aside className="w-52 flex-col gap-4 lg:flex hidden">
      <h2 className="text-xl mt-2">Filtrar por</h2>
      <Suspense>
        <FilterList />
      </Suspense>
    </aside>
  )
}
