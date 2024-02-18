"use client";

import { useEffect, useState } from "react";
import ArrowIcon from "./ArrowIcon";
import DayState from "./DayState";
import { toggleHabit } from "@/app/actions";

function getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month, 1);
    const firstDayWeekDay = date.getDay();
    const numberOfEmptyDays = Array(firstDayWeekDay).fill(null);
    const days = [...numberOfEmptyDays];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

const currentDate = new Date();
const crtDay = currentDate.getDate();
const crtMonth = currentDate.getMonth();
const crtYear = currentDate.getFullYear();

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];


function Calendar({
    habit,
    habitStreak,
  }: {
    habit: string;
    habitStreak: Record<string, boolean> | null;
  }) {
    const [month, setMonth] = useState(crtMonth);
    const [year, setYear] = useState(crtYear);
    const [selectedDate, setSelectDate] = useState(new Date())
    const [daysInMonth, setDaysInMonth] = useState(
        getDaysInMonth(crtMonth, crtYear)
    )

    useEffect(() => {
        setDaysInMonth(getDaysInMonth(month, year));
        setSelectDate(new Date(year, month, 1))
    }, [month, year])

    function goToPreviusMonth() {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11)
        } else {
            setMonth(month - 1)
        }
    }
    function goToNextMonth() {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0)
        } else {
            setMonth(month + 1)
        }
    }

    function getDayString(day: Date) {
        return `${year.toString()}-${(month + 1).toString().padStart(2, "0")}-${day.getDate()
          .toString()
          .padStart(2, "0")}`;
      }



    function getFullDayString() {
        const monthName = `${selectedDate.toLocaleString("pt-BR", {
            month: "long",
        })}`;

        const upperCaseMonthName = monthName[0].toUpperCase() + monthName.slice(1);
        return `${upperCaseMonthName} de ${selectedDate.getFullYear()}`;
    }

    return (
        <section className="w-full my-2 rounded-md bg-neutral-800">
            <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
                <button onClick={goToPreviusMonth}>
                    <ArrowIcon className="stroke-neutral-600" width={12} height={12} />
                </button>
                <span>
                    {getFullDayString()}
                </span>
                <button onClick={goToNextMonth}>
                    <ArrowIcon
                        width={12}
                        height={12}
                        className="rotate-180 stroke-neutral-600"
                    />
                </button>
            </div>
            <div className="grid w-full grid-cols-7 mt-2">
                {weekDays.map((day) => (
                    <div key={day} className="flex flex-col items-center p-2">
                        <span className="font-sans text-xs font-light text-neutral-200">
                            {day}

                        </span>
                    </div>
                ))}
                {daysInMonth.map((day, index) => (
                    <div key={index} className="flex flex-col items-center p-2"
                    onClick={() =>
                        toggleHabit({
                          habit,
                          habitStreak,
                          date: getDayString(day),
                          done: habitStreak ? habitStreak[getDayString(day)] : true,
                        })
                      }
                    >
                        <span className="font-sans text-xs font-light text-neutral-400 text-center">
                            {day?.getDate()}
                        </span>
                        {day && (
                            <DayState
                                day={habitStreak ? habitStreak[getDayString(day)] : undefined}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Calendar;