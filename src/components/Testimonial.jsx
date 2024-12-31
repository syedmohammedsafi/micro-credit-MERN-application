import React, { useState } from "react";

const testimonials = [
  {
    text: "I got my loan approved within hours! The service is incredibly efficient and user-friendly.",
    name: "Priya M., Mumbai",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    text: "The repayment options are flexible, and the process was smooth throughout.",
    name: "Rajesh K., Bangalore",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    text: "This platform helped me secure a loan for my business in record time!",
    name: "Sunita P., Delhi",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    text: "Amazing customer service and quick disbursal of funds! I recommend this platform to everyone.",
    name: "Anil S., Pune",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    text: "The entire process was transparent and easy to follow. I am truly satisfied with the service.",
    name: "Neha R., Hyderabad",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    text: "I was able to secure a loan without any hassle, and the repayment options suited my needs perfectly.",
    name: "Vikram D., Chennai",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    text: "The team guided me throughout the application process, and I got my loan approved quickly.",
    name: "Asha T., Delhi",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];


function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="p-6 my-8 w-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">What Our Users Say</h2>
      <div className="relative flex items-center justify-center">
        <button onClick={prevSlide} className="absolute left-0 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300 transition">&#8592;</button>
        <div className="p-6 bg-white rounded-lg shadow text-center w-3/4">
          <div className="flex items-center justify-center mb-4">
            <img src={testimonials[currentIndex].image} className="w-16 h-16 rounded-full shadow-md border-2 border-indigo-500"/>
          </div>
          <p className="text-gray-600">{testimonials[currentIndex].text}</p>
          <div className="flex justify-center mt-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 ${
                  i < testimonials[currentIndex].rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.371 1.24.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.974-2.89a1 1 0 00-1.176 0l-3.974 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.982 9.101c-.783-.57-.38-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
              </svg>
            ))}
          </div>
          <p className="mt-2 text-sm font-semibold text-indigo-600">{testimonials[currentIndex].name}</p>
        </div>
        <button onClick={nextSlide} className="absolute right-0 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300 transition">&#8594;</button>
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 mx-1 rounded-full ${
              currentIndex === index
                ? "bg-indigo-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;