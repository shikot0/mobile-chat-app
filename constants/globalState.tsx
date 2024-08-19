import {create} from 'zustand';

interface LocalUserStoreType {
    // isLoggedIn: boolean | undefined,
    isLoggedIn: boolean | undefined,
    isLoading: boolean,
    userToken: string | null,
    // isLoggedIn: boolean | null,
    setUserToken: Function,
    setIsLoggedIn: Function,
    setIsLoading: Function
}

export const localUserStore = create<LocalUserStoreType>((set) => ({
    isLoggedIn: false,
    isLoading: true,
    userToken: null,
    // isLoggedIn: null,
    setIsLoggedIn: (state: boolean) => {
        set(() => {
            return {isLoggedIn: state}
        })
    },
    setIsLoading: (state: boolean) => {
        set(() => {
            return {isLoading: state}
        }) 
    },
    setUserToken: (newToken: string) => {
        set(() => {
            return {userToken: newToken}
        })
    }
}))