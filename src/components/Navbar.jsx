import { Link } from "react-router-dom";
import { FaCreditCard, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const role = token ? JSON.parse(atob(token.split(".")[1]))?.role  : null; // Decode the Base64 URL-encoded payload
  return (
    <nav className="fixed z-10 w-full bg-white border-b-2 px-4 md:px-12">
      <div className="flex justify-between h-16">  
        {!token && <Link to={"/"} className="font-mono font-semibold mt-5"><div className="flex flex-row items-center gap-2 text-indigo-600"><FaCreditCard size={25} />MicroCredit</div> </Link>}
        {token && <Link to={"/micro-finance/info"} className="font-mono font-semibold mt-5"> <div className="flex flex-row items-center gap-2 text-indigo-600"><FaCreditCard size={25} />MicroCredit</div> </Link>}
        <div className="flex flex-row items-center space-x-4">
          {!token ? (
              <><Link to={"/auth/login"} className="font-serif"> Login </Link>
              <Link to={"/auth/register"} className="font-serif"> Register </Link></>
          ) : (<>{role === "user" && <Link to={'/micro-finance/dashboard'}><FaUserCircle size={25}/></Link>}
                {role === "admin" && <Link to={'/micro-finance/admin'} className="font-serif"> Admin </Link>}
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white text-sm md:text-base font-semibold py-1 px-2 md:py-2 md:px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">Logout</button></>)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;