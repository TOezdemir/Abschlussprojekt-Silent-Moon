import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  const handleGuestLogin = async () =>{
    const {error, data} = await supabase.auth.signInAnonymously()
    if (error) {
      console.error("Error with guest login:", error)
    } else {
      const {error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user!.id,
        first_name: "Gast",
      })
      if(profileError){
        console.error("Error while saving guest profile:", profileError)
      }
    }
    setIsGuest(true)
    navigate("/home")
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
