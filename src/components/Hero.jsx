import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12 bg-gradient-to-b from-indigo-700 to-black/70">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4"> Empower Your Dreams with Micro Loans</h1>
        <p className="text-lg md:text-xl mb-6">Easy, fast, and reliable loan solutions for your future goals.</p>
        <Link to={"/micro-finance/loan-application-form"} className="inline-flex items-center px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition">Apply Here</Link>
      </div>
    </div>
  );
}

export default Hero;