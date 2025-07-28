import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm"
import Layout from "/Layout";
import MembersStat from "./components/MembersStat"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signup" element={<SignUpForm />} />
          <Route path="membership" element={<MembersStat />} />
        </Route>
      </Routes>
  </StrictMode>
  </BrowserRouter>
)
