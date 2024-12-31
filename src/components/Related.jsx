function Related() {

  return (
    <div className="my-14">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-8">Related to You</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 text-center">
          <img src="/homeloan.png" className="w-full h-40 object-cover rounded-t-lg" />
          <h1 className="font-semibold text-lg mt-4">Home Loan</h1>
          <p className="text-gray-600 text-base mt-2">Secure your dream home with a new Home Loan</p>
        </div>
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 text-center">
          <img src="/sme_loan.png" className="w-full h-40 object-cover rounded-t-lg"/>
          <h1 className="font-semibold text-lg mt-4">SME Loan</h1>
          <p className="text-gray-600 text-base mt-2">Grow your business with an SME loan</p>
        </div>
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 text-center">
          <img src="/2wheelerloan.jpg" className="w-full h-40 object-cover rounded-t-lg"/>
          <h1 className="font-semibold text-lg mt-4">Two-Wheeler Loan</h1>
          <p className="text-gray-600 text-base mt-2">Apply for a Two-Wheeler loan with minimal documentation</p>
        </div>
      </div>
    </div>
  );
}

export default Related;