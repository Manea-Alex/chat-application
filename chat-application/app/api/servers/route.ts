import { v4 as uuidv4 } from "uuid"

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const {name, imageUrl} = await req.json()
        const profile = await currentProfile()

        if (!profile){
            return new NextResponse("Unauthorized", {status: 401})
        }

     // Creating a server(when we press on create), Thge user who created it  will be the admin of the server
      const server = await db.server.create({
        data: {
            profileId: profile.id,
            name,
            imageUrl,
            inviteCode: uuidv4(),
            channels: {
                create: [
                    {name: "general", profileId: profile.id}
                ]
            },

            members: {
                create: [
                    {profileId: profile.id, role: MemberRole.ADMIN}
                ]
            }
        }
      })

      return  NextResponse.json(server)
    } catch (error)
    {
        console.log("[SERVERS_POST", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}