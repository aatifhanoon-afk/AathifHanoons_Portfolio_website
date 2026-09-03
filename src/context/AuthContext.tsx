import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { usePortfolio } from './PortfolioContext';

const AUTH_TOKEN_KEY = 'portfolio-admin-session';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { state } = usePortfolio();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_TOKEN_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const login = (username: string, password: string): boolean => {
    if (username === state.adminUsername && password === state.adminPassword) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_TOKEN_KEY, 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
