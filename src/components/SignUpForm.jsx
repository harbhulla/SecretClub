import { useState } from "react"

export default function SignUpForm() {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPass: '',
        membership: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
         try {
        const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputField: inputs }),
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Server error: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        console.log(data);
         setInputs({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPass: '',
                membership: false
                });

        } catch (error) {
        console.log("❌ fk it", error);
        }
    }
    return (
<div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
  <div className="w-full max-w-md bg-base-200 rounded-box shadow-lg p-8">
    <div className="mb-6 text-center">
      <h1 className="text-3xl font-bold text-base-content">Create your account</h1>
      <p className="text-sm text-neutral-content mt-1">Start your journey with us today</p>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {[
        { label: "First Name", name: "firstName", placeholder: "John" },
        { label: "Last Name", name: "lastName", placeholder: "Snow" },
        { label: "Email", name: "email", placeholder: "you@example.com", type: "email" },
        { label: "Password", name: "password", placeholder: "••••••••", type: "password" },
        { label: "Confirm Password", name: "confirmPass", placeholder: "••••••••", type: "password" },
      ].map(({ label, name, placeholder, type = "text" }) => (
        <div key={name}>
          <label htmlFor={name} className="block text-sm font-medium text-base-content mb-1">
            {label}
          </label>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={inputs[name] || ""}
            onChange={(e) => setInputs((prev) => ({ ...prev, [name]: e.target.value }))}
            className="input input-bordered w-full text-sm"
          />
        </div>
      ))}
      <button className="btn btn-primary" type="submit">
        Create Account
      </button>
    </form>
  </div>
</div>
    )
}