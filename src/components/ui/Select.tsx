'use client'
import { useAddQuery } from "app/hooks/useAddQuery"
import { useBodyOverflow } from "app/hooks/useBodyOverflow"
import { useClickOutside } from "app/hooks/useClickOutside"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { Suspense, useRef, useState } from "react"
const OptionLink = ({ label, value, handleClick }: { label: string, value: string, handleClick: () => void }) => {
  const addQuery = useAddQuery();
  return (
    <li onClick={handleClick} className="flex hover:bg-white hover:text-zinc-900 transition-colors whitespace-nowrap cursor-pointer">
      <Link className="w-full px-4" href={addQuery("order", value)}>{label}</Link>
    </li>
  )
}
export const Select = ({ className, children, options }: { className: string, children: React.ReactNode, options: { label: string, value: string }[] }) => {
  const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement)
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(false)
  }
  useBodyOverflow(isOpen)
  useClickOutside(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });
  return (
    <div ref={ref} className="relative">
      <div onClick={() => setIsOpen(!isOpen)} className={className}>{children}</div>
      <AnimatePresence>
        {
          isOpen && <motion.ul initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="bg-black p-2 absolute right-0 top-full z-10 mt-2 flex flex-col gap-2">
            <Suspense fallback={<span>option</span>}>
              {
                options.map((option, index) => (
                  <OptionLink key={`select-${option.label}-${index}`} handleClick={handleClick} label={option.label} value={option.value} />
                ))
              }
            </Suspense>
          </motion.ul>
        }
      </AnimatePresence>
    </div>
  )
}
