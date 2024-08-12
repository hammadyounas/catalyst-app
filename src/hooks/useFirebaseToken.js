import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export function useFirebaseToken() {
  const { getToken } = useAuth();
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    async function fetchToken() {
      try {
        const firebaseToken = await getToken("firebase");
        setToken(firebaseToken)
      } catch (error) {
        console.error("Error signing in with Firebase token", error.message);
      }
    }
    fetchToken();
  }, [getToken]);

  return token;
}
