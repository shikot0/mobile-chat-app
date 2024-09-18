import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { storage } from './mmkv';

export type LocalUser = {
    id: string,
    username: string,
    email: string,
    phoneNumber: string,
    profilePicture: string | null
}

export function addLocalUser(user: LocalUser) {
    const isMobile = Platform.OS !== "windows" && Platform.OS !== "macos";
    if(isMobile) {
        SecureStore.setItem('local-user', JSON.stringify(user));
    }else {
        localStorage.setItem('local-user', JSON.stringify(user))
    }
    // SecureStore.setItem('local-user', JSON.stringify(user));
    // storage.set('local-user', JSON.stringify(user));
}

export function addLocalToken(token: string) {
    const isMobile = Platform.OS !== "windows" && Platform.OS !== "macos";
    if(isMobile) {
        SecureStore.setItem('user-token', JSON.stringify(token));
    }else {
        localStorage.setItem('user-token', JSON.stringify(token))
    }
    // SecureStore.setItem('user-token', token);
    // storage.set('user-token', token);
}

// export async function getLocalValue(key: string) {
export async function getLocalValue(key: string) {
    const isMobile = Platform.OS !== "windows" && Platform.OS !== "macos";
    
    // console.log({isMobile})
    // console.log({testString: JSON.parse("testString")})

    try {
        if(isMobile) {
            const data = SecureStore.getItem(key);
            // console.log({jsonUser: user})
            if(typeof data === 'string') {
                const result = await JSON.parse(data);
                return result;
            }else return null;
            // return typeof user === 'string' ? await JSON.parse(user) : null;
        }else {
            const data = localStorage.getItem(key);
            if(typeof data === 'string') {
                const result = await JSON.parse(data);
                return result
                // return await JSON.parse(data)
            }else return null;
            // return user !== null ? JSON.parse(user) : null;
        }
    }catch(error) {
        console.log(`Error retrieving local data: ${error}`);
    }
}

export function setLocalValue(key: string, value: any) {
    const isMobile = Platform.OS !== "windows" && Platform.OS !== "macos";
    
    if(isMobile) {
        SecureStore.setItem(key, JSON.stringify(value))
    }else {
        localStorage.setItem(key, JSON.stringify(value))
    }
}
// export async function getLocalUser() {
//     const isMobile = Platform.OS !== "windows" && Platform.OS !== "macos";

//     if(isMobile) {
//         const user = SecureStore.getItem('local-user');

//         return user !== null ? JSON.parse(user) : null;
//     }else {
//         const user = localStorage.getItem('local-user')
//         return user !== null ? JSON.parse(user) : null;
//     }
// }

// export async function getLocalUserToken() {
//     const isMobile = Platform.OS !== "windows" && Platform.OS !== "macos";
    
//     if(isMobile) {
//         const user = SecureStore.getItem('user-token');
    
//         return user !== null ? JSON.parse(user) : null;
//     }else {
//         const user = localStorage.getItem('user-token')
//         return user !== null ? JSON.parse(user) : null;
//     }
// }