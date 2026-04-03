/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { mysqlPool } from "@/utils/db";

export default async function programs() {
  const [programSplit] = await mysqlPool
    .promise()
    .query("SELECT * FROM programs");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      {programSplit.map((split) => (
        <Link href={`/programs/${split.slug}`} key={split.id}>
          <div className="group relative bg-surface-container rounded-2xl overflow-hidden border border-outline-variant hover:border-primary/40 transition-all cursor-pointer">
            <div className="h-48 overflow-hidden relative">
                <img
              src={split.image_url}
              alt={`${split.name} Split`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent" />

            </div>

          <div className="p-6">
            <h3 className="font-headline text-3xl font-bold uppercase tracking-tight mb-2">
              {split.name}
            </h3>
            <p className="line-clamp-2 text-sm text-on-surface-variant">{split.description}</p>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
}
