import { useEffect } from "react"

export default function LogOut() {
useEffect(() => {
    async function fetchData() {
      try {
       
        const response = await fetch("http://localhost:3000/logout", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        )
        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`Server error: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log("✅ Received Data!", data);
        
      } catch (error) {
        console.error("❌ Error loading:", error);
      }
    }

    fetchData();
  }, []);
}