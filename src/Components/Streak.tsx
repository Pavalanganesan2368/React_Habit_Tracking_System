import { isSameDay, subDays } from 'date-fns';

const Streak = (completions: Date[]) => {
  let streak = 0;
  let date = new Date();

  while (completions.some(c => isSameDay(c, date))) {
    streak++;
    date = subDays(date, 1)
  }
  return (
    <div>{streak}</div>
  )
}

export default Streak;