"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    try {
        // Check if user already exists in the database
        const loginUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id
            }
        });

        if (loginUser) {
            return loginUser;
        }

        // Create a new user in the database if not found
        const name = `${user.firstName} ${user.lastName}`;
        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            }
        });

        return newUser;

    } catch (error) {
        console.error("Error checking user:", error);
        return null;
    }
};
