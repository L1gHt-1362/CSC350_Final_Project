import React from 'react'
import NavBar from '@/components/navBar'
import Programs from '@/components/programs'
import AnimatedWrapper from '@/components/animatedWrapper'

export default function page() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body overflow-x-hidden">
        <NavBar/>
        <main className="max-w-7xl mx-auto px-8 w-full">
            <AnimatedWrapper>
                <section className="mb-16 pt-32">
                <span className="font-label text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Training Systems</span>
                <h1 className="font-headline text-5xl md:text-6xl font-bold text-on-surface tracking-tighter leading-none mb-6 uppercase">
                    Training
                    <br />
                    <span className="text-primary italic">
                        PROGRAM
                    </span>
                </h1>
                <p className="font-body text-on-surface-variant text-lg max-w-xl">
                    Structured training regimens designed to optimize your fitness journey. Select a program to access tailored workouts and progression plans.
                </p>
            </section>
            <Programs/>
            </AnimatedWrapper>
        </main>
    </div>
  )
}