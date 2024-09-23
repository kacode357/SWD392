import { createContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  auth: {
    isAuthenticated: boolean;
    user: User | null; // Ensure that user can be null initially
  };
  setAuth: React.Dispatch<React.SetStateAction<{
    isAuthenticated: boolean;
    user: User | null;
  }>>;
  appLoading: boolean;
  setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  auth: {
    isAuthenticated: false,
    user: null, // Default is null until a user is authenticated
  },
  setAuth: () => {},
  appLoading: false,
  setAppLoading: () => {},
});

interface AuthWrapperProps {
  children: ReactNode;
}

// Initialize the auth state correctly in AuthWrapper
export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [auth, setAuth] = useState<{
    isAuthenticated: boolean;
    user: User | null; // Ensure that user can be null initially
  }>({
    isAuthenticated: false,
    user: null, // Default user is null
  });

  const [appLoading, setAppLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
