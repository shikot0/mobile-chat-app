import { localUserStore } from "@/constants/globalState";
import { serverRoute } from "@/constants/routes";
import { conversations } from "@/drizzle/schema";

// export function fetchWithAuth(route: string, token: string | null, params?: RequestInit): Promise<Response> {
//     return fetch(route, params)
// }

type FetchWithAuthProps = {
    route: string,
    token: string | null,
    method?: RequestInit["method"],
} & {
    method: "POST",
    body: JSON
}


export function fetchWithAuth(route: string, token: string | null, method?: RequestInit["method"], body?: BodyInit): Promise<Response> {
// export function fetchWithAuth({route, token, method}: FetchWithAuthProps): Promise<Response> {
    return fetch(route, {
        method: method ?? 'GET',
        headers: {
            'token': `${token}`,
            'Content-Type': 'application/json'
        },
        body: body
    })
}
interface ConversationParticipant {
    id: string,
    username: string,
    email: string,
    phone: string,
    conversationId: string,
    userId: string,
    profilePicture: string,
    createdAt: string,
    joinDate: string,
}


export async function getConversations(token: string | null): Promise<{conversation: any, conversationParticipants: ConversationParticipant[]}[]> {
    try {
        // const {userToken} = localUserStore();
        // console.log({serverRoute})
        const response = await fetch(`${serverRoute}/messages/conversations`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Bearer': `${token}`,
                'token': `${token}`
            }
        })
        const body = await response.json();
        // console.log({apiCallBody: body})

        if(!body.succeeded) return [];
        
        return body.result
    }catch(error) {
        console.log(`Error collecting user conversations: ${error}`);
        return [];
    }
}