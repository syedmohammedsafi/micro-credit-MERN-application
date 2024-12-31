import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="flex items-center bg-gradient-to-r from-indigo-600 to-indigo-800 text-white mt-12">
      <div className="text-center max-w-7xl mx-auto px-4 py-14">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Quick and Easy Micro Loans for Salaried Professionals</h1>
        </div>
        <h1 className="text-lg md:text-xl text-indigo-100 mb-8">Get instant loan approval with our AI-powered credit assessment. Nopaperwork, no hassle.</h1>
        <div className="flex justify-center">
          <Link to={"/micro-finance/info"}
            className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition-colors">Apply Now
            <MdOutlineKeyboardDoubleArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
