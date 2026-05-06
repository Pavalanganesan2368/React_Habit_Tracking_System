import { createContext, useContext } from "react";

export const HabitContext = createContext<null | Context>(null);


export type Habits = {
  id : Number,
  itemName : String,
  completions : Date[]
}

type Context = {
  habits : Habits [],
  addHabits : (name : String) => void,
  deleteHabit: (id : Number) => void,
  toggleHabits : (id : Number, date : Date) => void
}

export function useHabits () {
  const habitContext = useContext(HabitContext);
  if (habitContext == null) throw new Error("Null Context");
  return habitContext;
}