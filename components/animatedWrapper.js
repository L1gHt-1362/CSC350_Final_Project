"use client"
import React from 'react'
import {motion} from "motion/react";
export default function animatedWrapper({children}) {
    
  return (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ ease: "easeOut", duration: 0.5 }}>
      {children}
    </motion.div>
  )
}
