import  { format, isFuture, isSameDay } from "date-fns"
import Button from "./Button";
import Streak from "./Streak";
import { useHabits, type Habits } from "../Context/useHabits";

type HabitItemsProps = {
  habit : Habits,
  displayDate : Date[]

}

const HabitItems  = ({ habit, displayDate } : HabitItemsProps) => {
  const { deleteHabit, toggleHabits } = useHabits();

  const getStreak = Streak(habit.completions).props.children;
  // const displayDate = eachDayOfInterval({ 
  //   start : startOfWeek(new Date(), { weekStartsOn : 1 }), 
  //   end : endOfWeek(new Date(), { weekStartsOn : 1 })
  // });

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.itemName}</span>
          {getStreak !== 0 && (
            <span className="text-sm text-amber-400 text-center flex flex-row">🔥 {getStreak}</span>
          )}
        </div>
        <Button onClick={() => deleteHabit(habit.id)} variant="ghost-destructive" className="text-sm">Delete</Button>
      </div>

      <div className="flex gap-1">
        {displayDate.map((date) => (
          <Button 
            key={date.toISOString()} 
            onClick={() => toggleHabits(habit.id, date)}
            disabled={isFuture(date)}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            variant={habit.completions.some(d => isSameDay(date, d)) ? "primary" : "secondary"}
          >
              <span 
                className="font-medium"
              >
                {format(date, "EEE")}
              </span>
            <span>{format(date, "d")}</span>
          </Button>
        ) )}
      </div>
    </div>
  )
}

export default HabitItems;