import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation"
import { InitialModal } from "@/components/modals/initial-modals";

const SetupPage = async() => {

    const profile = await initialProfile()
 
    // Attempt to find any server that this user is a member of
    const server = await db.server.findFirst({
        where: {
            members : {
                some : {
                    profileId: profile.id
                }
            }
        }
    })

    // if we find a server from which the user is a part of he ll be redirected to the server
    if (server){
        return redirect (`/servers/${server.id}`)

    }
    return <InitialModal/>
}
 
export default SetupPage;