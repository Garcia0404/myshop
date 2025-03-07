// /products
import { MainContent } from "app/components/MainContent";
import { Select } from "app/components/ui/Select";
import { Suspense } from "react";
const FilterProducts = () => {
  const options = [{
    label: "Ordenar por",
    value: ""
  }, {
    label: "Menor precio",
    value: "asc"
  }, { label: "Mayor precio", value: "desc" }, { label: "Mejor descuento", value: "bestDiscount" }, { label: "Lo más nuevo", value: "recent" }]
  return (
    <Suspense>
      <Select options={options} className="flex items-center gap-4 border py-2 px-4 hover:bg-white hover:text-black transition-colors cursor-pointer">
        <span>Ordenar por</span>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </Select>
    </Suspense>
  )
}
export default function ProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 py-2 px-4 cursor-pointer lg:hidden">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          <span>Filtrar</span>
        </div>
        <FilterProducts />
      </div>
      <Suspense>
        <MainContent />
      </Suspense>
    </>

  );
}