import { localUserStore } from "@/constants/globalState";
import { serverRoute } from "@/constants/routes";


export async function getConversations(token: string | null) {
    try {
        // const {userToken} = localUserStore();

        const response = await fetch(`${serverRoute}/messages/conversations`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Bearer': `${token}`,
                'token': `${token}`
            }
        })
        const body = await response.json();
        console.log({apiCallBody: body})
        if(body.succeeded) {
            return body.result
        }else return []
    }catch(error) {
        console.log(`Error collecting user conversations: ${error}`)
    }
}