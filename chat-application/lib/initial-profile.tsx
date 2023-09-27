import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

import { useClerk } from "@clerk/nextjs";

function LogoutButton() {
  const { signOut } = useClerk();
  
  const handleLogout = () => {
      signOut();
    };
    return (
     <button onClick={handleLogout}>Logout</button>
   );
}

export const initialProfile = async () => {


   
// attempt to get the user using clerk
const user = await currentUser()
    console.log('Current User:', user);

    if (!user)
    {
        return redirectToSignIn()
        // if there s no user go to log in
    }

    // attempt now to find our profile model

    const profile = await db.profile.findUnique( {
        where : {
            userId : user.id
        }
    })

    if (profile){
        return profile
    }

    // create a new one if there s not one

    const newProfile = await db.profile.create ({
     
       data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress
       }
    })
    return newProfile
    
}