import React from "react";
import Credit from "../components/Creditinfo";
import Related from "../components/Related";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";

function Home() {
  return (
    <div className="bg-gray-100 max-w-7xl mx-auto p-8 mt-12">
      <Hero/>      
      <Credit />
      <Testimonial />    
      <Related />
      <FAQ/>
    </div>
  );
}

export default Home;
