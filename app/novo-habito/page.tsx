import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewHabit() {
    async function newHabit(formData: FormData) {
        'use server'

        const habit = formData.get("habit");
        await kv.hset("habits", {[habit as string]: {}});

        revalidatePath("/");
        redirect("/"); //checar sempre se importou do navigate
    }
    return (
        <main className="container relative flex flex-col gap-8 px-12 pt-16">
            <h1 className="text-4xl font-light text-white text-center font-display">
                Novo Hábito
            </h1>
            <form action={newHabit} className="flex flex-col gap-4 mt-4">
                <input type="text" name="habit" id="habit" className="p-2 font-sans text-xl
                 text-white rounded-md bg-neutral-800" />
                <button className="text-2xl mt-8 text-neutral-900
                 bg-[#45EDAD] font-display font-regular rounded-md p-2">
                    Cadastrar
                </button>
                <button type="submit" className="text-2xl  bg-neutral-800
                 text-[#F85858] font-display font-regular rounded-md p-2">
                    Cancelar
                </button>
            </form>
        </main>
    )
}