"use server"

import { MOODS } from "@/lib/mood";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

export async function createJournalEntry(data){
    try {
        const {userId}=await auth();
        if(!userId){
            throw new Error("UnAuthorized!")
        }

        //Arcjet rate limiting...
        const user=await db.user.findUnique({
            where:{
                clerkUserId:userId
            }
        })
        if(!user){
            throw new Error("User Not Found!")
        }

        const mood=MOODS[data.mood.toUpperCase()]
        if(!mood){
            throw new Error("Invalid mood")
        }

        const moodImageUrl= await getPixabayImage(data.moodQuery)

        const entry=await db.entry.create({
            data:{
                title:data.title,
                content:data.content,
                mood:data.id,
                moodScore:data.score,
                moodImageUrl,
                userId:user.id,
                collectionId:data.collectionId || null
            }
        })

        await db.draft.deleteMany({
            where:{userId:user.id}
        });

        revalidatePath('/dashboard')
        return entry;
        
    } catch (error) {
        throw new Error(error.message)
    }
}