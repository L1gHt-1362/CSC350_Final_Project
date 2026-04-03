import React from "react";
import MuscleGroupsPage from "@/components/muscleGroup";
import NavBar from "@/components/navBar";
import AnimatedWrapper from "@/components/animatedWrapper";


export default function page() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body overflow-x-hidden">
      <NavBar />
      <main className="max-w-7xl mx-auto px-8 w-full">
        <AnimatedWrapper>
        <section className="mb-16 pt-32">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-surface tracking-tighter leading-none mb-6 uppercase">
          CHOOSE YOUR
          <br />
          <span className="text-primary italic text-[#f3ffca]">
            TARGET ZONE
          </span>
        </h1>
        <p className="font-body text-on-surface-variant text-lg max-w-xl">
          Precision-engineered workouts categorized by physiological mechanical
          chains. Select a group to initialize your performance sequence.
        </p>
      </section>
      <MuscleGroupsPage />
      </AnimatedWrapper>
      </main>
    </div>
  );
}
