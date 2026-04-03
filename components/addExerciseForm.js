"use client";

import React, { useState } from "react";
import { addExercise } from "@/app/api/actions";
import { Save, X } from "lucide-react";

const MUSCLE_GROUPS = [
  { id: 1, name: "Chest" }, { id: 2, name: "Back" }, 
  { id: 3, name: "Legs" }, { id: 4, name: "Shoulders" }, 
  { id: 5, name: "Arms" }, { id: 6, name: "Core" }
];

const AVAILABLE_PROGRAMS = [
  { id: 1, name: "Push Pull Legs (PPL)" },
  { id: 2, name: "Upper / Lower Split" }
];

export default function AddExerciseForm({ onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [basicData, setBasicData] = useState({
    name: "", muscle_group_id: 1, video_url: "", instructions: ""
  });

  const [activePrograms, setActivePrograms] = useState({});

  const handleProgramToggle = (programId) => {
    setActivePrograms(prev => {
      const newState = { ...prev };
      if (newState[programId]) {
        delete newState[programId];
      } else {
        newState[programId] = { programId, dayCategory: "", sets: 3, reps: "8-12" };
      }
      return newState;
    });
  };

  const handleProgramDetailChange = (programId, field, value) => {
    setActivePrograms(prev => ({
      ...prev,
      [programId]: { ...prev[programId], [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const programsArray = Object.values(activePrograms);
    await addExercise(basicData, programsArray);
    setIsSubmitting(false);
    onClose(); 
  };

  return (
    <div className="bg-surface-container border border-outline-variant p-8 rounded-2xl mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-on-surface">Add New Exercise</h2>
        <button onClick={onClose} className="text-on-surface-variant hover:text-white transition-colors"><X /></button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-primary mb-2">Exercise Name</label>
            <input required type="text" value={basicData.name} onChange={e => setBasicData({...basicData, name: e.target.value})} className="w-full bg-[#0e0e0e] border border-outline-variant rounded-lg p-3 text-white focus:border-primary outline-none transition-colors" placeholder="e.g., Lat Pulldown" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-primary mb-2">Target Muscle Group</label>
            <select value={basicData.muscle_group_id} onChange={e => setBasicData({...basicData, muscle_group_id: Number(e.target.value)})} className="w-full bg-[#0e0e0e] border border-outline-variant rounded-lg p-3 text-white focus:border-primary outline-none">
              {MUSCLE_GROUPS.map(mg => (
                <option key={mg.id} value={mg.id}>{mg.id} - {mg.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-primary mb-2">Video URL</label>
            <input type="text" value={basicData.video_url} onChange={e => setBasicData({...basicData, video_url: e.target.value})} className="w-full bg-[#0e0e0e] border border-outline-variant rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-primary mb-2">Instructions (Numbered Steps)</label>
            <textarea required rows="4" value={basicData.instructions} onChange={e => setBasicData({...basicData, instructions: e.target.value})} className="w-full bg-[#0e0e0e] border border-outline-variant rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="1. Sit down&#10;2. Pull bar to chest" />
          </div>
        </div>

        <div className="border-t border-outline-variant pt-6">
          <label className="block text-xs uppercase tracking-widest text-primary mb-4">Assign to Programs (Optional)</label>
          <div className="space-y-4">
            {AVAILABLE_PROGRAMS.map(prog => (
              <div key={prog.id} className="bg-[#0e0e0e] border border-outline-variant rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id={`prog-${prog.id}`} checked={!!activePrograms[prog.id]} onChange={() => handleProgramToggle(prog.id)} className="w-5 h-5 accent-primary" />
                  <label htmlFor={`prog-${prog.id}`} className="font-bold text-on-surface cursor-pointer select-none">{prog.name}</label>
                </div>
                
                {activePrograms[prog.id] && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/5">
                    <div>
                      <label className="block text-[10px] uppercase text-on-surface-variant mb-1">Day Category</label>
                      <input required type="text" placeholder="e.g.PUSH DAY | PULL DAY | LEG DAY | UPPER | LOWER" value={activePrograms[prog.id].dayCategory} onChange={e => handleProgramDetailChange(prog.id, 'dayCategory', e.target.value)} className="w-full bg-transparent border border-outline-variant rounded p-2 text-sm text-white focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-on-surface-variant mb-1">Sets</label>
                      <input required type="number" min="1" value={activePrograms[prog.id].sets} onChange={e => handleProgramDetailChange(prog.id, 'sets', parseInt(e.target.value))} className="w-full bg-transparent border border-outline-variant rounded p-2 text-sm text-white focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-on-surface-variant mb-1">Reps</label>
                      <input required type="text" placeholder="e.g. 8-12" value={activePrograms[prog.id].reps} onChange={e => handleProgramDetailChange(prog.id, 'reps', e.target.value)} className="w-full bg-transparent border border-outline-variant rounded p-2 text-sm text-white focus:border-primary outline-none" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-primary text-[#2b3400] px-6 py-3 rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50">
            <Save size={20} /> {isSubmitting ? "Saving..." : "Save Exercise"}
          </button>
        </div>
      </form>
    </div>
  );
}