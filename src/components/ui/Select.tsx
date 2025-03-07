'use client'
import { useAddQuery } from "app/hooks/useAddQuery"
import { useBodyOverflow } from "app/hooks/useBodyOverflow"
import { useClickOutside } from "app/hooks/useClickOutside"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useRef, useState } from "react"

export const Select = ({ className, children, options }: { className: string, children: React.ReactNode, options: { label: string, value: string }[] }) => {
  const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement)
  const addQuery = useAddQuery();
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(false)
  }
  useBodyOverflow(isOpen,false)
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
            {
              options.map((option, index) => (
                <li onClick={handleClick} key={index} className="flex hover:bg-white hover:text-zinc-900 transition-colors whitespace-nowrap cursor-pointer">
                  <Link className="w-full px-4" href={addQuery("order", option.value)}>{option.label}</Link>
                </li>
              ))
            }
          </motion.ul>
        }
      </AnimatePresence>
    </div>
  )
}
