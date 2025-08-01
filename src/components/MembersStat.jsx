import { useState, useContext } from "react";
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";
export default function MembersStat() {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const {users, setUsers} = useContext(UserContext);
    const handleSubmit = async (e) => {
        e.preventDefault();

         try {
        const response = await fetch("http://localhost:3000/api/signup/membership", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: input,
                input: users
             }),
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Server error: ${response.status} ${errorText}`);
        }
        setInput("");
        navigate("/home");
        } catch (error) {
        console.log("❌ fk it", error);
        }
    }
    return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 px-4">
        <div className="card w-96 bg-base-100 shadow-sm">
  <div className="card-body">
    <span className="badge badge-xs badge-warning">Most Popular</span>
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">Membership</h2>
      <span className="text-xl">$0/mo</span>
    </div>
    <ul className="mt-6 flex flex-col gap-2 text-xs">
     <li>
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
  <span>Exclusive Member Dashboard</span>
</li>
<li>
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
  <span>Secret Events & Drops</span>
</li>
<li>
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
  <span>Early Access to New Features</span>
</li>
<li>
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
  <span>Custom Member Badge</span>
</li>
<li>
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
  <span>Invite-Only Spaces</span>
</li>
<li>
  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
  <span>Hidden Settings & Customization</span>
</li>

    </ul>
    <form onSubmit={handleSubmit}>
    <input type="text" placeholder="Enter Code" name = {input} className="input w-full" onChange={(e) => setInput(e.target.value) } />
    <div className="mt-2">
      <button className="btn btn-primary btn-block" type="submit">Join The Club</button>
    </div>
    <p className="text-sm text-neutral-content mt-2">
  Don't know the passcode?{" "}
  <a href="/" className="link text-white underline-offset-2 hover:underline">
    Log in
  </a>
  </p>
  </form>
  </div>
</div>
</div>
    );
}
