import { useState, useContext } from "react";
import useLoadMessages from "./useLoadMessages";
import { UserContext } from "./UserContext";
import DisplayMessages from "./DisplayMessages";
import LogOut from "./LogOut";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
    const [text,setText] = useState('');
    const {refreshTrigger, setRefreshTrigger} = useContext(UserContext);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
      setShowLogout(true);
      navigate("/")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
         document.getElementById("my_modal_5").close();
           try {
        const response = await fetch("http://localhost:3000/api/dashboard", {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ messageText: text }),
        });
        
        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Server error: ${response.status} ${errorText}`);
        }

        } catch (error) {
        console.log("❌ fk it", error);
        }
         setText("");
         setRefreshTrigger(prev => prev + 1)
    }
return (
    <>
      <div className="navbar bg-base-100 shadow-sm px-4 h-30">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Secret Club</a>
        </div>

        <div className="navbar-center">
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Create a Post
          </button>
        </div>
        <div className="navbar-end">
          <a className="btn" onClick={handleLogout}>Log Out</a>
        </div>
      </div>
  <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() =>  setText("")}>✕</button>
    </form>

    <h3 className="font-bold text-lg">Create Post</h3>

    <form
      onSubmit={handleSubmit}
      className="mt-5 flex flex-col items-end w-full gap-3"
    >
      <textarea
        placeholder="What's on your mind?"
        className="textarea textarea-ghost w-full max-w-xl min-h-[4rem] resize-none overflow-hidden text-base"
        value={text}
        rows={1}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button className="btn mt-5" disabled={text === ""} onClick={() => {handleSubmit}}>Post</button>
    </form>
  </div>
</dialog>
<DisplayMessages/>
{showLogout && <LogOut />}
    </>
  );
}
