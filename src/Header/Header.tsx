import { format, isToday } from "date-fns";
import Button from "../Components/Button"
import { useHabits } from "../Context/useHabits"

type HeaderProps = {
  displayDate : Date[]
  onPrev : () => void
  onNext : () => void
}

const Header = ({ displayDate, onNext, onPrev } : HeaderProps) => {
  const { habits } = useHabits();
  const doneToday = habits.filter(h => h.completions.some(c => isToday(c))).length;

  const dateRange = `${format(displayDate[0], "MMM d")} - ${format(displayDate[displayDate.length - 1], "MMM d")}`
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400">{doneToday} / {habits.length} done Today</span>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm">{dateRange}</span>
        <div className="flex items-center gap-3">
          <Button onClick={onPrev} disabled={displayDate.some(d => isToday(d))}>Prev</Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>
    </header>
  )
}

export default Header