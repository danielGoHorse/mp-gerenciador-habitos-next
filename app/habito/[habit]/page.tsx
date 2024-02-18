import { kv } from "@vercel/kv";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import Calendar from "@/components/Calendar";






async function Habit({ params: { habit } }: { params: { habit: string } }) {
    const decodedHabit = decodeURI(habit);
    const habitStreak: Record<string, boolean> | null = await kv.hget(
      "habits",
      decodedHabit
    );
   

   

    return (
        <main className="container relative flex-rox pt-16 gap-8 px-12">
            <h1 className="text-2xl font-light text-center  text-white font-display">
                {decodedHabit}
            </h1>
            <Link className="flex items-center font-sans text-xs  text-neutral-300 rounded-md p-2 gap-2" href="/" >
                <ArrowIcon width={12} height={12} className="stroke-neutral-400" />
                Voltar
            </Link>
            <Calendar habit={decodedHabit} habitStreak={habitStreak} />
        </main>
    )
}

export default Habit;
