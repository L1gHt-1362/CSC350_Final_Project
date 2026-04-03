/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, {useState} from 'react'
import Link from 'next/link';
import {Menu, X} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";

export default function navBar() {

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  return (
    <div>
        <header className="fixed top-0 w-full z-50 bg-[#0e0e0e]/70 backdrop-blur-xl border-b border-outline-variant h-20">
          <div className="relative flex justify-between items-center px-8 w-full max-w-7xl mx-auto h-full">
            
            <div className="flex items-center gap-4">
              <Link href="/" onClick={closeMenu}>
                <span className="text-3xl font-black italic text-primary uppercase tracking-tight cursor-pointer text-[#f3ffca]">
                  KINETIC
                </span>
              </Link>
            </div>

            <nav className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-8 font-label text-sm uppercase tracking-widest lg:flex">              
              <Link href="/">
                <span className="cursor-pointer pb-1 border-b-4 border-transparent hover:border-primary transition-all">
                  Workouts
                </span>
              </Link>

              <Link href="/programs">
                <span className="cursor-pointer pb-1 border-b-4 border-transparent hover:border-primary transition-all">
                  Training Programs
                </span>
              </Link>
            </nav>
            <button className="lg:hidden text-[#f3ffca] hover:opacity-80 transition-opacity" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28}/> : <Menu size={28} />}
            </button>
          </div>
          <AnimatePresence>
            {isOpen &&(
              <motion.div
                key="mobile-menu"
                initial ={{opacity:0, y:-10}}
                animate={{opacity:1, y:0}}
                exit={{opacity:0, y:-10}}
                transition={{duration:0.2, ease:"easeInOut"}}
                className='absolute top-20 left-0 w-full bg-[#0e0e0e]/95 backdrop-blur-xl border-b border-outline-variant lg:hidden flex flex-col items-center py-8 gap-8 shadow-2xl'
                >
                <Link href ="/">
                  <span onClick={closeMenu} className="font-label text-lg uppercase tracking-widest cursor-pointer hover:text-primary transition-all text-on-surface">
                    Workouts
                  </span>
                </Link>
                <Link href="/programs">
                  <span onClick={closeMenu} className="font-label text-lg uppercase tracking-widest cursor-pointer hover:text-primary transition-all text-on-surface">
                    Training Programs
                  </span>
                </Link>
                </motion.div>
            )}
          </AnimatePresence>
        </header>
    </div>
  )
}
