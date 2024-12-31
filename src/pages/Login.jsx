import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Login() {
  const [datas, setDatas] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/login", datas);
      login(response.data.token);
      setLoading(false);
      alert("Logged in successfully")
      navigate('/micro-finance/info')    
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-12 md:p-24 mt-12">
      <form onSubmit={submit} className="grid gap-y-2">
        <h1 className="text-center text-2xl font-bold">Login to your account</h1>
        <input name="email" type="text" value={datas.email} onChange={change} className="relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email Address" />
        <input name="password" type="password" value={datas.password} onChange={change} className="relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
        <button type="submit" className="py-2 px-4 border border-transparent text-sm font-medium text-white bg-indigo-500">{loading ? "Logging in" : "Login"}</button>
        <h1 className="text-sm">Don't have an account!{" "} <Link to={'/auth/register'} className="text-indigo-600">Register</Link></h1>
      </form>
    </div>
  );
}

export default Login;