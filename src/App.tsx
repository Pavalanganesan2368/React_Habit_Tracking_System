import Header from "../src/Header/Header.tsx";
import Habitform from "./HabitForm/Habitform.tsx";
import HabitList from "./HabitList/HabitList.tsx";
import { HabitProvider } from "./Context/HabitProvider.tsx";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { useState } from "react";

function App() {
  const [weekOffset, setWeekOffset] = useState(0);
  const week = addWeeks(new Date() ,weekOffset);
  const displayDate = eachDayOfInterval({ 
    start : startOfWeek(week, { weekStartsOn : 1 }), 
    end : endOfWeek(week, { weekStartsOn : 1 })
  });

  
  return (
    <>
      <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
        <HabitProvider>
          <Header 
            displayDate={displayDate} 
            onNext={() => setWeekOffset(o => o + 1)} 
            onPrev={() => setWeekOffset(o => o - 1)}
          />
          <Habitform />
          <HabitList displayDate={displayDate} />
        </HabitProvider>
      </div>
    </>
  )
}

export default App
