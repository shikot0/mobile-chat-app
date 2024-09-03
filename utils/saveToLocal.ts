import * as SecureStore from 'expo-secure-store';

export type LocalUser = {
    id: string,
    username: string,
    email: string,
    phoneNumber: string,
    profilePicture: string | null
}

export function addLocalUser(user: LocalUser) {
    SecureStore.setItem('local-user', JSON.stringify(user));
}

export function addLocalToken(token: string) {
    SecureStore.setItem('user-token', token);
}