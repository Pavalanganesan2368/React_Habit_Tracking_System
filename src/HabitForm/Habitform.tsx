import { useState } from "react"
import Button from "../Components/Button"
import { useHabits } from "../Context/useHabits";

const Habitform = () => {
  const { addHabits } = useHabits();
  const [name, setName] = useState("");
  
  const handleSubmit = (e : SubmitEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setName("");
    addHabits (name);
  }
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input 
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        placeholder="New Habit..."  
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button disabled={name.trim() === ""} className="rounded-lg px-4 py-2 font-medium">Add Habit</Button>
    </form>
  )
}

export default Habitform