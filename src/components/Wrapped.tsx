'use client'
import { motion } from "motion/react"
export const Wrapped = () => {
  return (
    <motion.div style={{ backdropFilter: "blur(60px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      id="wrapped"
      className="fixed invisible top-0 left-0 right-0 bottom-0 w-full h-screen bg-black z-40"></motion.div>
  )
}
