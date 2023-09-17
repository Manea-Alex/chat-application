import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

// added in order for the hot reload to initialize to many prisma clients
// in development since we have hot reload every time we change a line of code
// in our environment a new prisma client would be initialized
// we  appended to the globalThis variable because its not affected by hot reload 
export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db