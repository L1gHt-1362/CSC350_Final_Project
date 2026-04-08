/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { mysqlPool } from "@/utils/db";

export default async function MuscleGroupsPage() {
  const [muscleGroups] = await mysqlPool
    .promise()
    .query("SELECT * FROM muscle_groups");

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center text-on-surface">
        Choose Your Target Muscle
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {muscleGroups.map((group) => (
          <Link href={`/workouts/${group.slug}`} key={group.id}>
            <div className="group relative bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant hover:border-primary/30 transition-all duration-500 cursor-pointer">
              <img
                src={group.image}
                alt={`${group.name} workout`}
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700 "
              />

              <div className="relative p-8 h-full flex flex-col items-center justify-center min-h-[280px] muscle-card-gradient">
                <div>
                  <h3 className="font-headline text-3xl font-bold text-on-surface mb-2 uppercase tracking-tight drop-shadow-md">
                    {group.name}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
