import {create} from 'zustand';

interface LocalUserStoreType {
    isLoggedIn: boolean | undefined,
    setIsLoggedIn: Function
}

export const localUserStore = create<LocalUserStoreType>((set) => ({
    isLoggedIn: undefined,
    setIsLoggedIn: (state: boolean) => {
        set(() => {
            return {isLoggedIn: state}
        })
    }
}))