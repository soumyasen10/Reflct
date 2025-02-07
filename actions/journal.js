"use server"

import { MOODS, getMoodById } from "@/lib/mood";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
import { getPixabayImage } from "./public";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";

export async function createJournalEntry(data){
    try {
        const {userId}=await auth();
        if(!userId){
            throw new Error("UnAuthorized!")
        }

        //Arcjet rate limiting...
        const req=await request()
        const decision=await aj.protect(req,{
            userId,
            requested:1
        })

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                const {remaining, reset}=decision.reason;
            console.error({
                code:"RATE_LIMIT_EXCEEDED",
                details:{
                    remaining,
                    resetInSeconds:reset
                }
            })

            throw new Error("Too many requests,please try again later!")
            }

            throw new Error("Request Blocked!")
        }
        
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

export async function getJournalEntries({collectionId}={}){
    try {
        const {userId}=await auth();
        if(!userId){
            throw new Error("UnAuthorized!")
        }

        const user=await db.user.findUnique({
            where:{
                clerkUserId:userId
            }
        })
        if(!user){
            throw new Error("User Not Found!")
        }

        const entries=await db.entry.findMany({
            where:{
                userId:user.id,
                ...(collectionId==='unorganized'?{collectionId:null}:collectionId?{collectionId}:{}),
            },
            include:{
                collection:{
                    select:{
                        id:true,
                        name:true,
                    }
                }
            },
            orderBy:{
                createdAt:'desc'
            }
        })

        const entriesWithMoodData=entries.map((entry)=>(
            {
                ...entry,
                moodData:getMoodById(entry.mood)
            }
        ))

        return {
            success:true,
            data:{
                entries:entriesWithMoodData
            }
        }

    } catch (error) {
        return {success:false,error:error.message}
    }
}

export async function getJournalEntry(id){
    try {
        const {userId}=await auth();
        if(!userId){
            throw new Error("UnAuthorized!")
        }

        const user=await db.user.findUnique({
            where:{
                clerkUserId:userId
            }
        })
        if(!user){
            throw new Error("User Not Found!")
        }

        const entry=await db.entry.findFirst({
            where:{
                id,
                userId:user.id
            },
            include:{
                collection:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })

        if(!entry) throw new Error("Entry not found!")

        return entry;
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function deleteJournalEntry({id}) {
    try {
      const { userId } = await auth();
    if (!userId) {
      throw new Error("UnAuthorized!");
    }
  
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) {
      throw new Error("User Not Found!");
    }
  
    const entry = await db.entry.findUnique({
      where: {
        userId: user.id,
        id
      }
    });
  
    if(!entry) throw new Error("Entry not found!")
  
    await db.entry.delete({
      where:{
        id
      }
    })
    
    revalidatePath('/dashboard')
    return entry;
    } catch (error) {
      throw new Error(error.message)
    }
  }


export async function updateJournalEntry({data}) {
    try {
      const { userId } = await auth();
    if (!userId) {
      throw new Error("UnAuthorized!");
    }
  
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) {
      throw new Error("User Not Found!");
    }
  
    const ExistingEntry = await db.entry.findUnique({
      where: {
        userId: user.id,
        id:data.id
      }
    });
  
    if(!ExistingEntry) throw new Error("Entry not found!")
  
    const mood=MOODS[data.mood.toUpperCase()]
        if(!mood){
            throw new Error("Invalid mood")
        }

        let moodImageUrl=ExistingEntry.moodImageUrl

        if(ExistingEntry.mood !==mood.id){
            moodImageUrl= await getPixabayImage(data.moodQuery)
        }
         

        const entry=await db.entry.update({
            where:{id:data.id},
            data:{
                title:data.title,
                content:data.content,
                mood:data.id,
                moodScore:data.score,
                moodImageUrl,
                collectionId:data.collectionId || null
            }
        })

    
    revalidatePath('/dashboard')
    revalidatePath(`/journal/${data.id}`)
    return entry;
    } catch (error) {
      throw new Error(error.message)
    }
  }



export async function getDraft() {
    try {
      const { userId } = await auth();
    if (!userId) {
      throw new Error("UnAuthorized!");
    }
  
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) {
      throw new Error("User Not Found!");
    }
  
    const draft = await db.draft.findUnique({
      where: {
        userId: user.id
      }
    });
    
    return {success:true,data:draft};
    } catch (error) {
      throw new Error(error.message)
    }
  }



export async function saveDraft({data}) {
    try {
      const { userId } = await auth();
    if (!userId) {
      throw new Error("UnAuthorized!");
    }
  
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) {
      throw new Error("User Not Found!");
    }
  
    const draft = await db.draft.upsert({
      where: {
        userId: user.id
      },
      create:{
        title:data.title,
        content:data.content,
        mood:data.mood,
        userId:user.id
      },
      update:{
        title:data.title,
        content:data.content,
        mood:data.mood,
      }
    });
    
    revalidatePath('/dashboard')
    return {success:true,data:draft};
    } catch (error) {
      throw new Error(error.message)
    }
  }

