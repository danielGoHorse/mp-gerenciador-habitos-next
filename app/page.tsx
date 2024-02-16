import DayState from "@/components/DayState";
import { spawn } from "child_process";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const habits = {
    "beber água": {
      '2024-02-14': true,
      '2024-02-13': false,
      '2024-02-12': false,
    },
    "estudar programação": {
      '2024-02-14': true,
      '2024-02-13': true,
      '2024-02-12': false,
    },
  };

  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const sortWeekDays = weekDays.slice(todayWeekDay + 1).concat(weekDays.slice(0, todayWeekDay + 1))

  return (
    <main className=" container relative flex flex-col gap-8 px-4 pt-16">
      {habits === null || (Object.keys(habits).length === 0 && (
        <h1 className="mt-20 text-2xl font-light text-white font-display text-center">
          Você não tem hábitos cadastrados</h1>
      ))}
      {
        habits === null || Object.entries(habits).map(
          ([habit, habitStreak]) => (
            <div key={habit} className="flex flex-col gap-2" >
              <div className="flex justify-between items-center">
                <span className="text-xl font-light text-white font-sans">
                  {habit}
                </span>
                <button className="text-white">
                  <Image
                    src="/trash.svg"
                    width={20}
                    height={20}
                    alt="Picture of the author"
                  />
                </button>
              </div>
              <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2">
                {sortWeekDays.map((day) => (
                  <div key={day} className="flex flex-col last:font-bold">
                    <span className="font-sans text-xs text-white text-center">
                      {day}
                    </span>
                    {/*day state*/}
                    <DayState day={true} />
                  </div>
                ))}
              </section>
            </div>
          ))}

          <Link href={"/novo-habito"} className="fixed text-center bottom-10 w-2/3
          left-1/2 -translate-x-1/2
           text-neutral-900 bg-[#45EDAD] font-display font-regular rounded-md">Novo Hábito</Link>
    </main>
  );
}
