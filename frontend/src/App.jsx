import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DebateView from "./pages/DebateView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/debate/:id" element={<DebateView />} />
      </Routes>
    </BrowserRouter>
  );
}
