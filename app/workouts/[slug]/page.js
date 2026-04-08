/* eslint-disable @next/next/no-img-element */
import React from "react";
import NavBar from "@/components/navBar";
import { Activity, Dumbbell, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { mysqlPool } from "@/utils/db";
import AnimatedWrapper from "@/components/animatedWrapper";

export default async function Page({ params }) {
  const { slug } = await params;

  // Fetch Muscle Group
  const [groupdata] = await mysqlPool.promise().query(
    "SELECT * FROM muscle_groups WHERE slug = ?",
    [slug]
  );

  if (groupdata.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-on-surface">
        Muscle group not found. Please check your URL!
      </div>
    );
  }

  const muscleGroup = groupdata[0];

  // Fetch Exercises
  const [exercises] = await mysqlPool.promise().query(
    "SELECT * FROM exercises WHERE muscle_group_id = ?",
    [muscleGroup.id]
  );

  return (
    <div className="min-h-screen bg-background text-on-surface font-body overflow-x-hidden">
      <NavBar />
      <AnimatedWrapper>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        
        <Link href="/">
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8 group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-label uppercase text-sm tracking-widest">
              Back to Home
            </span>
          </button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDE: Muscle Group Card */}
          <div className="lg:w-1/3">
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-outline-variant sticky top-32">
              <img
                src={muscleGroup.image}
                alt={`${muscleGroup.name} Workout`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6">
                <div className="w-16 h-16 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-4 shadow-2xl">
                  <Dumbbell className="w-8 h-8" />
                </div>
                <h2 className="font-headline text-4xl font-bold uppercase tracking-tighter">
                  {muscleGroup.name}
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Performance Sequence (Exercises) */}
          <div className="lg:w-2/3">
            <h3 className="font-headline text-2xl font-bold uppercase tracking-tight mb-8 flex items-center gap-3">
              <Activity className="w-6 h-6 text-primary" /> Performance Sequence
            </h3>

            <div className="space-y-4">
              
              {exercises.length > 0 ? (
                exercises.map((exercise) => {
                  const steps = exercise.instructions 
                    ? exercise.instructions.split(/(?=\d+\.)/).filter(Boolean)
                    : [];

                  return (
                    <div key={exercise.id} className="p-6 rounded-xl bg-surface-container-low border border-outline-variant hover:border-primary/30 transition-all group">
                      
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                          {exercise.name}
                        </h4>
                      </div>
                      
                      <div className="mb-6">
                        <span className="text-[12px] text-primary uppercase font-label block mb-2 tracking-widest">
                          Instructions
                        </span>
                        <ul className="flex flex-col gap-4">
                          
                          {/* 'steps' is used here, perfectly safe inside its scope */}
                          {steps.map((step, index) => {
                            const cleanText = step.replace(/^\d+\.\s*/, '').trim();
                            if (!cleanText) return null;
                            return(
                                <li key={index} className="flex items-start gap-4 text-on-surface-variant">
                                    <span className="text-primary font-bold">
                                        {index + 1}.
                                    </span>
                                    <span className="text-on-surface-variant text-base leading-relaxed">
                                      {cleanText}
                                    </span>
                                </li>
                            );
                          })}
                        </ul>
                      </div>

                      {exercise.video_url && (
                        <div className="grid gap-2 border-t border-outline-variant pt-4">
                          <span className="text-[11px] text-on-surface-variant uppercase font-label block">
                            Tutorial Link
                          </span>
                          <Link
                            href={exercise.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-bold text-primary hover:underline w-fit"
                          >
                            Watch Tutorial ↗
                          </Link>
                        </div>
                      )}

                    </div>
                  );
                })
              ) : (
                <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface-variant">
                  No exercises found for this muscle group yet.
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      </AnimatedWrapper>
    </div>
  );
}