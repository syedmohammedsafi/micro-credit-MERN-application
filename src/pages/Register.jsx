import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdVerified } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resend, setResend] = useState(0);
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState({
    email: "",
    number: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const change = (e) => {
    const { name, value } = e.target;
    setDatas({ ...datas, [name]: value });
  };

  const submit = async (e) => {
    // if(!verified){
    //   alert("Verify your mobile first");
    //   return
    // }
    e.preventDefault();
    if (datas.password !== datas.cpassword) {
      alert("Password doesn't match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/register", datas);
      login(response.data.token);
      alert("Registered Succesfully")
      navigate("/micro-finance/info");
    } catch (error) {
      alert(error.response?.data?.message || "something went wrong");
    }finally{
      setLoading(false);
    }
  };

  const sendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-sms", { mobile: datas.number});
      if (response.data.success) {
        alert("OTP sent successfully!");
        setOtpSent(true);
        setResend(120);
        const interval = setInterval(() => {
          setResend((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        alert("Failed to send OTP. Try again.");
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { mobile: datas.number, otp });
      if (response.data.success) {
        alert("OTP verified successfully!");
        setVerified(true);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert(error.response?.data?.messagee);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center md:p-24 p-6 mt-12">
      <div className="grid gap-y-2 w-full max-w-md">
        <h1 className="text-center text-2xl font-bold">Create your account</h1>
        <input type="text" name="email" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email Address" value={datas.email} onChange={change} required />
        <div className="flex flex-row gap-2">
          <input type="text" name="number" className="relative block w-2/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mobile Number" value={datas.number} onChange={change} required />
          <input type="text" className="relative block w-1/3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button type="submit" className="py-2 px-4 w-auto border border-transparent text-sm font-medium text-white bg-indigo-500" onClick={otpSent ? verifyOTP : sendOTP}>
            {otpSent ? verified ? <MdVerified /> : "verify" : "Send"}
          </button>
        </div>
        {otpSent && !verified && (
          <button type="button" className="text-right mt-2 text-sm text-indigo-600" onClick={sendOTP} disabled={resend > 0}>
            {resend > 0 ? `Resend OTP in ${resend}s` : "Resend OTP"}
          </button>
        )}
        <input type="password" name="password" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={datas.password} onChange={change} />
        <input type="password" name="cpassword" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" value={datas.cpassword} onChange={change} />
        <button type="submit" className="py-2 px-4 w-full border border-transparent text-sm font-medium text-white bg-indigo-500" onClick={submit}>{loading ? "Registering..." : "Register"}</button>
        <h1 className="text-sm text-center">Already have an account! {" "}
          <Link to={"/auth/login"} className="text-indigo-600">Login</Link>
        </h1>
      </div>
    </div>
  );
}

export default Register;