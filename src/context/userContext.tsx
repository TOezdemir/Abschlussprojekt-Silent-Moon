import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface UserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  isGuest: boolean
  handleGuestLogin: () => Promise<void>
}

const UserContext = createContext<UserContext>(null!);


export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(true)

  const handleGuestLogin = async () =>{
    const {error, data} = await supabase.auth.signInAnonymously({options: {data: { first_name: "Maxi", last_name: "Muxi" }}})
    if (error) {
      console.error("Error with guest login:", error)
    } else {
      setIsGuest(true)
      setUser(data.user)
    }
  }

  useEffect(() => {
    supabase.auth
    .getUser()
    .then((user) => {
      setUser(user.data.user);
    })
    .finally(() =>{
      setIsLoading(false)
    })
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, isLoading, isGuest, handleGuestLogin }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);
