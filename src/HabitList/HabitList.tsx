import HabitItems from "../Components/HabitItems";
import { useHabits } from "../Context/useHabits";

type HabitListProps = {
  displayDate : Date[]
}

const HabitList = ({ displayDate } : HabitListProps) => {
  const { habits } = useHabits();
  
  return (
    <div>
      {habits.length === 0 ? (
        <p className='text-center text-zinc-500 py-12'>No habits yet. Add one above to get started!</p>
      ) : (
        <div className='flex flex-col gap-3'>
          {habits.map((habit) => (
            <HabitItems 
              key={habit.id}
              habit={habit}
              displayDate={displayDate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HabitList;