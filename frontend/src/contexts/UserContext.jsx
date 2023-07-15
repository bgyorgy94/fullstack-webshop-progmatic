import { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ token: localStorage.getItem('access_token') });

  useEffect(() => {
    if (user.token) {
      const decoded = jwtDecode(user.token);
      setUser((prev) => ({ ...prev, ...decoded }));
    }
  }, [user.token]);

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}
