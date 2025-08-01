import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

          const formBody = new URLSearchParams({
          email: loginInfo.email,
          password: loginInfo.password,
        });
        
        try {
            const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type":  "application/x-www-form-urlencoded"
            },
            body: formBody,
            credentials: "include", 
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Server error: ${response.status} ${errorText}`);
        }
        navigate("/home");
              
        } catch (error) {
        console.log("❌ fk it", error);
        }
    }
    return (
       <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
  <div className="w-full max-w-md bg-base-200 rounded-box shadow-lg p-8">
    <div className=" p-6 text-center">
      <h1 className="text-3xl font-bold text-base-content mb-5">Login</h1>
      <div className="avatar " >
  <div className="bg-neutral text-neutral-content w-30 rounded-full">
    <img  src="https://media.istockphoto.com/id/619400788/photo/hacker.jpg?s=612x612&w=0&k=20&c=q0jWs7d7-MGGBy-jEz6J317RtyJ3riiYHxDuQJMNRNo=" />
  </div>
</div>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {[
        { label: "Email", name: "email", placeholder: "you@example.com", type: "email" },
        { label: "Password", name: "password", placeholder: "••••••••", type: "password" },
      ].map(({ label, name, placeholder, type = "text" }) => (
        <div key={name}>
          <label htmlFor={name} className="block text-sm font-medium text-base-content mb-1">
            {label}
          </label>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={loginInfo[name] || ""}
            className="input input-bordered w-full text-sm"
            onChange={(e) => setLoginInfo((prev) => ({...prev, [name]: e.target.value}))}
          />
        </div>
      ))}
      <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
        Login
      </button>
      <p className="text-sm text-neutral-content">
  Don’t have an account?{" "}
  <a href="/signup" className="link text-white underline-offset-2 hover:underline">
    Sign up
  </a>
</p>
    </form>
  </div>
</div>
    )
}