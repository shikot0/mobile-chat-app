import { LocalUser } from '@/utils/saveToLocal';
import {create} from 'zustand';

interface LocalUserStoreType {
    isLoggedIn: boolean | undefined,
    setIsLoggedIn: Function,

    isLoading: boolean,
    setIsLoading: Function
    userToken: string | null,
    setUserToken: Function,

    localUser: LocalUser | null,
    setLocalUser: Function
}

// interface LocalUserStoreType {
//     isLoggedIn: boolean | undefined,
//     setIsLoggedIn: Function,

//     isLoading: boolean,
//     setIsLoading: Function
//     userToken: string | null,
//     setUserToken: Function,
//     localUser: {
//         id: string,
//         username: string,
//         email: string,
//         phoneNumber: string,
//         profilePicture: string | null
//     },
//     setLocalUser: Function
// }

// type LocalUserStoreType =  {
//     isLoggedIn: true,
//     setIsLoggedIn: Function,

//     isLoading: false,
//     setIsLoading: Function
//     userToken: string,
//     setUserToken: Function,

//     localUser: LocalUser,
//     setLocalUser: Function
// } | {
//     isLoggedIn: false | undefined,
//     setIsLoggedIn: Function,

//     isLoading: boolean,
//     setIsLoading: Function
//     userToken: null,
//     setUserToken: Function,

//     localUser: null,
//     setLocalUser: Function
// }

export const localUserStore = create<LocalUserStoreType>((set) => ({
    isLoggedIn: false,
    isLoading: true,
    userToken: null,
    localUser: null,
    // localUser: {
    //     id: '',
    //     username: '',
    //     email: '',
    //     phoneNumber: '',
    //     profilePicture: null
    // },
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
    setUserToken: (newToken: string | null) => {
        set(() => {
            return {userToken: newToken}
        })
    },
    setLocalUser: (user: LocalUser | null) => {
    // setLocalUser: (user: LocalUser) => {
        set(() => {
            return {localUser: user}
        })
    }
}))