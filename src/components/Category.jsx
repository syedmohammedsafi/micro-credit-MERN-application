function Categories() {

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore All Categories</h1>
      </div>
      <div className=" flex justify-between gap-4 px-12 mb-8">
        <div className="bg-white sm:w-12 sm:h-12 md:w-48 md:h-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center bg-gradient-to-t from-emerald-400 to-gray-100">
          <img src="/consumer_loan.svg" className="w-36 h-36 mx-auto" />
          <h1 className=" text-white text-lg font-semibold mt-2">Personal Loan</h1>
        </div>
        <div className="bg-white sm:w-24 sm:h-24 md:w-48 md:h-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center bg-gradient-to-t from-rose-500 to-gray-100">
          <img src="/farmer_loan.svg" className="w-36 h-36 mx-auto" />
          <h1 className=" text-white text-lg font-semibold mt-2">Farmer Loan</h1>
        </div>
        <div className="bg-white sm:w-24 sm:h-24 md:w-48 md:h-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center bg-gradient-to-t from-blue-600 to-gray-100">
          <img src="/two_wheeler.svg" className="w-36 h-36 mx-auto" />
          <h1 className=" text-white text-lg font-semibold mt-2">Two Wheeler Loan</h1>
        </div>
        <div className="bg-white sm:w-24 sm:h-24 md:w-48 md:h-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center bg-gradient-to-t from-yellow-600 to-gray-100">
          <img src="/sme_loan.svg" className="w-32 h-32 mx-auto mt-4" />
          <h1 className=" text-white text-lg font-semibold mt-2">SME Loan</h1>
        </div>
        <div className="bg-white sm:w-24 sm:h-24 md:w-48 md:h-60 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center bg-gradient-to-t from-indigo-600 to-gray-100">
          <img src="/women-Icon.webp" className="w-36 h-36 mx-auto"/>
          <h1 className="text-white text-lg font-semibold mt-2">Micro Loan</h1>
        </div>
      </div>
    </>
  );
}
export default Categories;