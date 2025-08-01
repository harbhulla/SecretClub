import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm"
import Layout from "/Layout";
import MembersStat from "./components/MembersStat"
import { UseProvider } from './components/UserContext';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import DisplayMessages from "./components/DisplayMessages";
createRoot(document.getElementById('root')).render(
  <UseProvider>
  <BrowserRouter>
  <StrictMode>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<LoginForm/>} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="signup/membership" element={<MembersStat />} />
          <Route path="home" element={<Homepage />} />
          <Route path="display" element={<DisplayMessages />} />
        </Route>
      </Routes>
  </StrictMode>
  </BrowserRouter>
  </UseProvider>
)
