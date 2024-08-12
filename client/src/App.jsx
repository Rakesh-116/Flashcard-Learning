import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./admin/adminDashboard";
import Insert from "./admin/insertFlashCard";
import Update from "./admin/updateFlashCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}/>
        <Route path="/admin/insert" element={<Insert />}/>
        <Route path="/admin/update/:id" element={<Update />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
