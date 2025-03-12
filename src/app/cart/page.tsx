'use client'
import { BagSvg } from "app/components/ui/BagSvg";
import Link from "next/link";
import { PurchaseSummary } from "./components/PurchaseSummary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
export default function CartPage() {
  const { replace } = useRouter()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/validate-token")
      if (!response.ok) replace('/login')
      if (response.ok) setShow(true)
    };
    checkSession();
  }, [replace])
  return (
    <>
      {
        show && <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="flex flex-col min-h-dvh">
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
        </motion.div>
      }
    </>
  )
}
