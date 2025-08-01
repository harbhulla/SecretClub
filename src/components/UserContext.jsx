import { createContext, useState } from "react";

export const UserContext = createContext();

export function UseProvider({ children }) {
  const [display, setDisplay] = useState([])
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [users, setUsers] = useState({ 
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: '',
        membership: false
    });

  return (
    <UserContext.Provider value={{ display, setDisplay, refreshTrigger,setRefreshTrigger, users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}
