"use client"
import { deletHabit } from "@/app/actions";
import Image from "next/image";

export default function DeleteButton({habit}: {habit: string}){
    return(
        <button onClick={() => deletHabit(habit)}>
                  <Image
                    src="/trash.svg"
                    width={20}
                    height={20}
                    alt="Picture of the author"
                  />
                </button>
    )
}