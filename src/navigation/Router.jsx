import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Dashboard from "../components/Dashboard";

export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}



