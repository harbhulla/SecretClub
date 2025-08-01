import { useContext, useEffect } from "react"
import { UserContext } from "./UserContext";

export default function useLoadMessages() {
  const { display,setDisplay, refreshTrigger } = useContext(UserContext);
  useEffect(() => {
    async function fetchData() {
      try {
       
        const response = await fetch("http://localhost:3000/api/dashboard", {
            method: "GET",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            }
        }
        )
        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`Server error: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        setDisplay(data); 
        console.log("✅ Received Data!");
        
      } catch (error) {
        console.error("❌ Error loading:", error);
      }
    }

    fetchData();
  }, [refreshTrigger]);
}