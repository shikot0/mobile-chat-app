import { localUserStore } from "@/constants/globalState";
import { serverRoute } from "@/constants/routes";

export function fetchWithAuth(route: string, token: string | null, method?: RequestInit["method"]): Promise<Response> {
    return fetch(route, {
        method: method ?? 'GET',
        headers: {
            'token': `${token}`,
            'Content-Type': 'application/json'
        }
    })
}


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

        if(!body.succeeded) return [];
        
        return body.result
    }catch(error) {
        console.log(`Error collecting user conversations: ${error}`)
    }
}