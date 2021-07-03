import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as AuthSession from 'expo-auth-session';

import {
    SCOPE, 
    CLIENT_ID,
    CDN_IMAGE,
    REDIRECT_URI,
    RESPONSE_TYPE
} from '../configs'
import { api } from '../services/api';

type User = {
    id: string;
    username: string;
    firstname: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    singIn: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);

    const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    async function singIn() {
        try {
            setLoading(true);

            const response = await AuthSession.startAsync({ authUrl });

            console.log(response);
            
        } catch{
           throw new Error("Authentication Failed"); 
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            singIn,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    
    return context;
}

export {
    AuthProvider,
    useAuth
}