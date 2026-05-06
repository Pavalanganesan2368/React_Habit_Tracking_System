import { isSameDay } from "date-fns";
import { useState, type ReactNode } from "react";
import { HabitContext, type Habits } from "./useHabits";
import { useLocalStorage } from "../Hooks/useLocalStorage";

type HabitProviderProps = {
  children : ReactNode
}


export function HabitProvider ({ children } : HabitProviderProps) {

  const [habits, setHabits] = useLocalStorage("Habits", []);

  function addHabits (name : String) {
    const newHabits = { id : crypto.randomUUID(), itemName : name, completions : [] };
    setHabits([...habits, newHabits]);
  }

  function toggleHabits (id : Number, date : Date) {
    setHabits(curr => 
      curr.map((h) => {
        if (h.id !== id) return h
        const alreadyDone = h.completions.some(c => isSameDay(c, date))
        const completions = alreadyDone ? h.completions.filter((c) => !isSameDay(c, date)) : [...h.completions, date]

        return { ...h, completions }
      })
    )
  }

  function deleteHabit (id : String) {
    setHabits(habits.filter((habit) => habit.id !== id));
  }
    
  return (
    <HabitContext value={{ habits, addHabits, toggleHabits, deleteHabit }}>
      {children}
    </HabitContext>
  )
}