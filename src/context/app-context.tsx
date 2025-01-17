import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserProps = {
  id: number;
  name: string;
  token: string;
}

interface AppContextType {
  user: UserProps | null;
  setUser: (data: UserProps | null) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// CREATE CONTEXT PROVIDER
export function AppProvider({ 
  children 
}: AppProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// HOOK TO USE OUR CONTEXT
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
