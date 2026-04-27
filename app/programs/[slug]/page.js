import React from "react";
import NavBar from "@/components/navBar";
import {ChevronLeft } from "lucide-react";
import Link from "next/link";
import { mysqlPool } from "@/utils/db";
import AnimatedWrapper from "@/components/animatedWrapper";

export default async function page({params}) {
    const {slug} = await params;
    const [programData] = await mysqlPool.promise()
    .query("SELECT * FROM programs WHERE slug = ?", [slug]);

    if(programData.length === 0){
        return(
            <div className="min-h-screen flex items-center justify-center text-on-surface">Program not found. Please retry.</div>
        );
    }

    const program = programData[0];

    const [exercisesData] = await mysqlPool.promise()
    .query(`SELECT
        e.id, e.name, e.instructions, e.video_url, pe.day_category, pe.sets, pe.reps
        FROM program_exercises pe
        JOIN exercises e ON pe.exercise_id = e.id
        WHERE pe.program_id = ?`,
        [program.id]);

        const groupedExercises = exercisesData.reduce((groups,exercise)=>{
            const dayName =exercise.day_category;
            if(!groups[dayName]){
                groups[dayName]=[];
            }
            groups[dayName].push(exercise)
            return groups;
        }, {})
  return (
    <div className="min-h-screen bg-background text-on-surface font-body overflow-x-hidden">
        <NavBar/>
        <AnimatedWrapper>
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
                <Link href="/programs">
                    <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8 group">
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
                        <span className="font-label uppercase text-sm tracking-widest">
                            Back to Programs
                        </span>
                    </button>    
                </Link>

                <div className="mb-12">
                    <h2 className="font-headline text-5xl font-bold uppercase tracking-tight mb-4">{program.name}</h2>
                    <p className="text-on-surface-variant text-lg max-w-2xl">
                        {program.description}
                    </p>
                </div>

                <div className="space-y-12">
            {/* LOOP 1: Loop through the Groups ("PUSH DAY", "PULL DAY") */}
            {Object.entries(groupedExercises).map(([dayCategory, exercisesForThisDay]) => (
              <div key={dayCategory} className="space-y-6">
                
                {/* Day Header (e.g., PUSH DAY) */}
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="font-headline text-3xl font-bold uppercase tracking-tight">
                    {dayCategory}
                  </h3>
                </div>

                {/* LOOP 2: Loop through the exercises inside this specific day */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {exercisesForThisDay.map((exercise) => {
                    // Clean up the instructions like we did on the Muscle Groups page
                    const steps = exercise.instructions
                      ? exercise.instructions.split(/(?=\d+\.)/).filter(Boolean)
                      : [];

                    return (
                      <div key={exercise.id} className="p-8 rounded-2xl border border-outline-variant bg-surface-container-low">
                        
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-2xl font-bold text-on-surface">{exercise.name}</h4>
                        </div>

                        <div className="mb-8">
                          <span className="text-[10px] text-primary uppercase font-label block mb-3 tracking-widest">
                            Execution Guide
                          </span>
                          <ul className="space-y-3">
                            {steps.length > 0 ? (
                              steps.map((step, index) => {
                                const cleanText = step.replace(/^\d+\.\s*/, "").trim();
                                if (!cleanText) return null;
                                return (
                                  <li key={index} className="flex gap-4 text-sm text-on-surface-variant leading-relaxed">
                                    <span className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
                                      {index + 1}
                                    </span>
                                    <span>{cleanText}</span>
                                  </li>
                                );
                              })
                            ) : (
                              <li className="text-sm text-on-surface-variant">No instructions available.</li>
                            )}
                          </ul>
                        </div>

                        {/* Sets & Reps from the Junction Table! */}
                        <div className="flex gap-8 border-t border-outline-variant pt-6">
                          <div>
                            <span className="text-[10px] text-on-surface-variant uppercase font-label block mb-1">Sets</span>
                            <span className="text-xl font-bold text-primary">{exercise.sets}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-on-surface-variant uppercase font-label block mb-1">Reps</span>
                            <span className="text-xl font-bold text-primary">{exercise.reps}</span>
                          </div>
                          <div>
                            <span className="text-[11px] text-on-surface-variant uppercase font-label block mb-1">
                            Tutorial Link </span>
                            <Link
                            href={exercise.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-bold text-primary hover:underline w-fit"
                          >
                            Watch Tutorial ↗
                          </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
}