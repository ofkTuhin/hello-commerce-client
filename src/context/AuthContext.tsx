import useAuth from "@/hook/useAuth";
import { createContext, useContext } from "react";

// Define types for user and authentication context
interface User {
  name: string;
  email: string;
  accessToken?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useAuth(); // Assuming useAuth is your custom hook

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Custom hook to consume AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
