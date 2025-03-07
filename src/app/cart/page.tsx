import { BagSvg } from "app/components/ui/BagSvg";
import Link from "next/link";
import { PurchaseSummary } from "./components/PurchaseSummary";

export default function CartPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-30 bg-[rgba(0,0,0,0.7)] backdrop-blur-xl flex items-center justify-between px-4 py-[14.9px] border-b-[1px] border-white/30">
        <div className="flex-grow basis-0">
          <Link href={"/products"} className="flex items-center gap-2 cursor-pointer w-min">
            <BagSvg className="size-6" />
            <span>MyShop</span>
          </Link>
        </div>
      </header >
      <main className="flex-1 max-w-5xl mx-auto flex">
        <PurchaseSummary />
      </main>
    </div>
  )
}
