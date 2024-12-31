import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login";
import Application from "./pages/LoanApplication";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="bg-gray-100">
            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route path="/micro-finance/info" element={<PrivateRoute><Home /></PrivateRoute>} />              
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/micro-finance/loan-application-form" element={<PrivateRoute><Application/></PrivateRoute>} />
              <Route path="/micro-finance/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
              <Route path="/micro-finance/admin" element={<PrivateRoute adminOnly={true}><Admin/></PrivateRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;