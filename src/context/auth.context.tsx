import { createContext, useState, ReactNode } from 'react';

interface User {
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    auth: {
        isAuthenticated: boolean;
        user: User;
    };
    setAuth: React.Dispatch<React.SetStateAction<{
        isAuthenticated: boolean;
        user: User;
    }>>;
    appLoading: boolean;
    setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
    auth: {
        isAuthenticated: false,
        user: {
            email: '',
            name: '',
            role: '',
        }
    },
    setAuth: () => {},
    appLoading: true,
    setAppLoading: () => {},
});

// Define props type for the AuthWrapper
interface AuthWrapperProps {
    children: ReactNode;
}

// AuthWrapper component
export const AuthWrapper = ({ children }: AuthWrapperProps) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            email: '',
            name: '',
            role: '',
        }
    });
    const [appLoading, setAppLoading] = useState(true);

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            appLoading,
            setAppLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};
