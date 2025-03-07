'use client'
import { motion } from "motion/react"
export const Wrapped = () => {
  return (
    <motion.div style={{backdropFilter:"blur(60px)"}} 
    initial={{ opacity: 0, backdropFilter:"none" }} 
    animate={{ opacity: 0.8,backdropFilter:"blur(60px)" }} 
    id="wrapped" 
    className="transition-all ease-in-out duration-300 fixed backdrop-blur-2xl invisible top-0 left-0 right-0 bottom-0 w-full h-screen bg-black z-40"></motion.div>
  )
}
